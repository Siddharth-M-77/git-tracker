const Repository = require('../models/Repository');
const AccessAuditLog = require('../models/AccessAuditLog');
const githubService = require('../services/githubService');
const User = require('../models/User');

// Get all tracked repositories
exports.getRepositories = async (req, res) => {
  try {
    const repos = await Repository.find().sort({ lastPushAt: -1 });
    res.json({ success: true, count: repos.length, repositories: repos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single repo and its collaborators
exports.getRepoCollaborators = async (req, res) => {
  try {
    const { repoId } = req.params;
    const repo = await Repository.findById(repoId);
    if (!repo) {
      return res.status(404).json({ success: false, message: 'Repository not found' });
    }

    res.json({
      success: true,
      repository: {
        id: repo._id,
        name: repo.name,
        fullName: repo.fullName,
        owner: repo.owner,
        isPrivate: repo.isPrivate,
        collaborators: repo.collaborators,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Grant or change repository access
exports.grantOrUpdateAccess = async (req, res) => {
  try {
    const { repoId, username, permission, roleName } = req.body;
    if (!repoId || !username || !permission) {
      return res.status(400).json({ success: false, message: 'Missing repoId, username or permission' });
    }

    const repo = await Repository.findById(repoId);
    if (!repo) {
      return res.status(404).json({ success: false, message: 'Repository not found' });
    }

    const adminUser = req.user ? `${req.user.email} (${req.user.name})` : 'System Admin';

    // If GitHub Token configured, call GitHub API
    let githubApiInvoked = false;
    const user = req.user ? await User.findById(req.user.id) : null;
    const token = user?.githubAccessToken || process.env.GITHUB_TOKEN;

    if (token) {
      try {
        await githubService.addOrUpdateCollaborator(repo.owner, repo.name, username, permission, token);
        githubApiInvoked = true;
      } catch (err) {
        console.warn('GitHub API collaborator update warning:', err.message);
      }
    }

    // Update in MongoDB
    const existingIndex = repo.collaborators.findIndex(
      (c) => c.username.toLowerCase() === username.toLowerCase()
    );

    let actionType = 'INVITED';
    if (existingIndex > -1) {
      actionType = 'ROLE_CHANGED';
      repo.collaborators[existingIndex].permission = permission;
      repo.collaborators[existingIndex].roleName = roleName || permission.toUpperCase();
    } else {
      repo.collaborators.push({
        username,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(username)}`,
        permission,
        roleName: roleName || permission.toUpperCase(),
      });
    }

    await repo.save();

    // Create Audit Log
    const audit = await AccessAuditLog.create({
      repositoryFullName: repo.fullName,
      targetUsername: username,
      action: actionType,
      permissionLevel: permission,
      performedBy: adminUser,
      status: 'SUCCESS',
      details: githubApiInvoked
        ? `Permission set to ${permission} and synchronized with GitHub Organization.`
        : `Permission set to ${permission} in tracker workspace (GitHub sync pending token).`,
    });

    res.json({
      success: true,
      message: `Access successfully granted to @${username} with role [${permission}]!`,
      collaborators: repo.collaborators,
      audit,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Revoke repository access
exports.revokeAccess = async (req, res) => {
  try {
    const { repoId, username } = req.body;
    if (!repoId || !username) {
      return res.status(400).json({ success: false, message: 'Missing repoId or username' });
    }

    const repo = await Repository.findById(repoId);
    if (!repo) {
      return res.status(404).json({ success: false, message: 'Repository not found' });
    }

    const adminUser = req.user ? `${req.user.email} (${req.user.name})` : 'System Admin';

    // If GitHub Token configured, call GitHub API
    let githubApiInvoked = false;
    const user = req.user ? await User.findById(req.user.id) : null;
    const token = user?.githubAccessToken || process.env.GITHUB_TOKEN;

    if (token) {
      try {
        await githubService.removeCollaborator(repo.owner, repo.name, username, token);
        githubApiInvoked = true;
      } catch (err) {
        console.warn('GitHub API remove collaborator warning:', err.message);
      }
    }

    // Remove from MongoDB
    repo.collaborators = repo.collaborators.filter(
      (c) => c.username.toLowerCase() !== username.toLowerCase()
    );
    await repo.save();

    // Create Audit Log
    const audit = await AccessAuditLog.create({
      repositoryFullName: repo.fullName,
      targetUsername: username,
      action: 'REMOVED',
      permissionLevel: 'none',
      performedBy: adminUser,
      status: 'SUCCESS',
      details: githubApiInvoked
        ? `Access revoked and collaborator removed from GitHub repository.`
        : `Access revoked in tracker workspace.`,
    });

    res.json({
      success: true,
      message: `Access revoked for @${username} from ${repo.fullName}`,
      collaborators: repo.collaborators,
      audit,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Audit Logs
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AccessAuditLog.find().sort({ timestamp: -1 }).limit(50);
    res.json({ success: true, count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Sync live Repositories from GitHub account
exports.syncFromGitHub = async (req, res) => {
  try {
    const user = req.user ? await User.findById(req.user.id) : null;
    const token = req.body.token || user?.githubAccessToken || process.env.GITHUB_TOKEN;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid GitHub Personal Access Token or configure GitHub App',
      });
    }

    const liveRepos = await githubService.listUserRepos(token);
    let syncedCount = 0;

    for (const r of liveRepos) {
      const existing = await Repository.findOne({ fullName: r.fullName });
      if (!existing) {
        await Repository.create({
          githubRepoId: r.id,
          name: r.name,
          fullName: r.fullName,
          owner: r.owner,
          description: r.description,
          isPrivate: r.isPrivate,
          defaultBranch: r.defaultBranch,
          htmlUrl: r.htmlUrl,
          stargazersCount: r.stargazersCount,
          forksCount: r.forksCount,
          openIssuesCount: r.openIssuesCount,
          lastPushAt: r.pushedAt ? new Date(r.pushedAt) : new Date(),
          collaborators: [
            { username: r.owner, permission: 'admin', roleName: 'Owner' },
          ],
        });
        syncedCount++;
      }
    }

    res.json({
      success: true,
      message: `Synchronized ${liveRepos.length} GitHub repositories (${syncedCount} newly tracked)`,
      totalRepos: liveRepos.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
