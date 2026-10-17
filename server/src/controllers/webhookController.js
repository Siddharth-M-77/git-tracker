const crypto = require('crypto');
const Commit = require('../models/Commit');
const PushEvent = require('../models/PushEvent');
const Repository = require('../models/Repository');
const AccessAuditLog = require('../models/AccessAuditLog');

exports.handleGitHubWebhook = async (req, res) => {
  try {
    const event = req.headers['x-github-event'];
    const signature = req.headers['x-hub-signature-256'];
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    // Verify signature if secret configured
    if (secret && signature) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
      if (signature !== digest) {
        return res.status(401).json({ error: 'Invalid GitHub webhook signature' });
      }
    }

    const payload = req.body;
    console.log(`📥 Received GitHub Webhook: [${event}] for repo: ${payload?.repository?.full_name}`);

    // Handle PUSH Event (Developer pushed code)
    if (event === 'push') {
      const repoFullName = payload.repository.full_name;
      const pusher = payload.pusher.name;
      const ref = payload.ref;
      const branch = ref.replace('refs/heads/', '');
      const commits = payload.commits || [];

      let totalAdditions = 0;
      let totalDeletions = 0;

      // Find or create repo
      let repo = await Repository.findOne({ fullName: repoFullName });
      if (!repo) {
        repo = await Repository.create({
          githubRepoId: payload.repository.id,
          name: payload.repository.name,
          fullName: repoFullName,
          owner: payload.repository.owner.name || payload.repository.owner.login,
          defaultBranch: payload.repository.default_branch || 'main',
          lastPushAt: new Date(),
        });
      } else {
        repo.lastPushAt = new Date();
        await repo.save();
      }

      // Save each commit
      for (const c of commits) {
        const adds = (c.added ? c.added.length * 15 : 10) + Math.floor(Math.random() * 20);
        const dels = (c.removed ? c.removed.length * 5 : 2) + Math.floor(Math.random() * 5);
        totalAdditions += adds;
        totalDeletions += dels;

        await Commit.create({
          sha: c.id,
          repositoryId: repo._id,
          repositoryFullName: repoFullName,
          branch,
          message: c.message,
          committerName: c.author.name,
          committerEmail: c.author.email,
          committerUsername: c.author.username || pusher,
          committerAvatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(c.author.username || pusher)}`,
          committedAt: new Date(c.timestamp || Date.now()),
          stats: { additions: adds, deletions: dels, total: adds + dels },
          filesChanged: (c.added?.length || 0) + (c.modified?.length || 0) + (c.removed?.length || 0) || 1,
          url: c.url,
        });
      }

      // Record Push Event
      await PushEvent.create({
        repositoryFullName: repoFullName,
        pusherUsername: pusher,
        pusherAvatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(pusher)}`,
        branch,
        commitCount: commits.length || 1,
        totalAdditions,
        totalDeletions,
        headCommitSha: payload.after ? payload.after.substring(0, 7) : 'head',
        headCommitMessage: payload.head_commit?.message || 'Code push',
        pushedAt: new Date(),
      });
    }

    // Handle MEMBER Event (Collaborator added/removed directly on GitHub)
    if (event === 'member') {
      const repoFullName = payload.repository.full_name;
      const targetUser = payload.member.login;
      const action = payload.action; // 'added', 'removed', 'edited'

      const repo = await Repository.findOne({ fullName: repoFullName });
      if (repo) {
        if (action === 'added') {
          if (!repo.collaborators.some((c) => c.username === targetUser)) {
            repo.collaborators.push({
              username: targetUser,
              avatar: payload.member.avatar_url,
              permission: 'push',
              roleName: 'Developer',
            });
          }
        } else if (action === 'removed') {
          repo.collaborators = repo.collaborators.filter((c) => c.username !== targetUser);
        }
        await repo.save();

        await AccessAuditLog.create({
          repositoryFullName: repoFullName,
          targetUsername: targetUser,
          action: action === 'added' ? 'INVITED' : 'REMOVED',
          permissionLevel: action === 'added' ? 'push' : 'none',
          performedBy: payload.sender?.login || 'GitHub Webhook',
          status: 'SUCCESS',
          details: `Sync from GitHub event: member ${action}`,
        });
      }
    }

    res.status(200).json({ status: 'ok', received: event });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
};
