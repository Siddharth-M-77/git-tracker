const Commit = require('../models/Commit');
const PushEvent = require('../models/PushEvent');
const Repository = require('../models/Repository');
const AccessAuditLog = require('../models/AccessAuditLog');

// Get Overall System Metrics
exports.getOverviewMetrics = async (req, res) => {
  try {
    const totalRepos = await Repository.countDocuments();
    const totalCommits = await Commit.countDocuments();
    const totalPushes = await PushEvent.countDocuments();

    // Sum total additions and deletions
    const codeStats = await Commit.aggregate([
      {
        $group: {
          _id: null,
          totalAdditions: { $sum: '$stats.additions' },
          totalDeletions: { $sum: '$stats.deletions' },
        },
      },
    ]);

    const additions = codeStats[0]?.totalAdditions || 0;
    const deletions = codeStats[0]?.totalDeletions || 0;

    // Distinct active developers
    const activeDevelopers = await Commit.distinct('committerUsername');

    // Recent push
    const lastPush = await PushEvent.findOne().sort({ pushedAt: -1 });

    res.json({
      success: true,
      metrics: {
        totalRepos,
        totalCommits,
        totalPushes,
        totalLinesAdded: additions,
        totalLinesDeleted: deletions,
        activeDevelopersCount: activeDevelopers.length,
        lastPush: lastPush || null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Top Committers Leaderboard
exports.getTopCommitters = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    let startDate = new Date();
    if (timeRange === '7d') startDate.setDate(startDate.getDate() - 7);
    else if (timeRange === '90d') startDate.setDate(startDate.getDate() - 90);
    else startDate.setDate(startDate.getDate() - 30);

    const leaderboard = await Commit.aggregate([
      {
        $match: {
          committedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$committerUsername',
          name: { $first: '$committerName' },
          email: { $first: '$committerEmail' },
          avatar: { $first: '$committerAvatar' },
          totalCommits: { $sum: 1 },
          linesAdded: { $sum: '$stats.additions' },
          linesDeleted: { $sum: '$stats.deletions' },
          lastCommitAt: { $max: '$committedAt' },
          repositories: { $addToSet: '$repositoryFullName' },
        },
      },
      { $sort: { totalCommits: -1 } },
      { $limit: 20 },
    ]);

    res.json({
      success: true,
      leaderboard: leaderboard.map((dev, index) => ({
        rank: index + 1,
        username: dev._id || dev.name || 'Anonymous',
        name: dev.name,
        email: dev.email,
        avatar: dev.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(dev.name || 'dev')}`,
        commits: dev.totalCommits,
        linesAdded: dev.linesAdded,
        linesDeleted: dev.linesDeleted,
        netCode: dev.linesAdded - dev.linesDeleted,
        lastCommitAt: dev.lastCommitAt,
        reposCount: dev.repositories.length,
        repos: dev.repositories,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Activity Timeline (Daily commits & lines changed for chart)
exports.getActivityTimeline = async (req, res) => {
  try {
    const days = parseInt(req.query.days || '14', 10);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const timeline = await Commit.aggregate([
      {
        $match: {
          committedAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$committedAt' },
          },
          commits: { $sum: 1 },
          additions: { $sum: '$stats.additions' },
          deletions: { $sum: '$stats.deletions' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      timeline: timeline.map((t) => ({
        date: t._id,
        commits: t.commits,
        additions: t.additions,
        deletions: t.deletions,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Live Push Feed (Who pushed when, how many commits, lines +/-)
exports.getLivePushFeed = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '20', 10);
    const pushes = await PushEvent.find().sort({ pushedAt: -1 }).limit(limit);

    res.json({ success: true, pushes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Developer Deep-Dive Profile
exports.getDeveloperProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const commits = await Commit.find({ committerUsername: username }).sort({ committedAt: -1 }).limit(50);
    const pushes = await PushEvent.find({ pusherUsername: username }).sort({ pushedAt: -1 }).limit(20);

    const stats = await Commit.aggregate([
      { $match: { committerUsername: username } },
      {
        $group: {
          _id: null,
          totalCommits: { $sum: 1 },
          totalAdditions: { $sum: '$stats.additions' },
          totalDeletions: { $sum: '$stats.deletions' },
          repositories: { $addToSet: '$repositoryFullName' },
        },
      },
    ]);

    res.json({
      success: true,
      username,
      stats: stats[0] || { totalCommits: 0, totalAdditions: 0, totalDeletions: 0, repositories: [] },
      recentCommits: commits,
      recentPushes: pushes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seed Realistic Demo Data (Instant SaaS Experience)
exports.seedDemoData = async (req, res) => {
  try {
    // Clear old data
    await Repository.deleteMany({});
    await Commit.deleteMany({});
    await PushEvent.deleteMany({});
    await AccessAuditLog.deleteMany({});

    // 1. Create Repositories
    const sampleRepos = [
      {
        githubRepoId: 10101,
        name: 'payment-gateway-service',
        fullName: 'acme-corp/payment-gateway-service',
        owner: 'acme-corp',
        description: 'PCI-DSS Compliant Payment Ingestion & Settlement Engine (Node.js & Go)',
        isPrivate: true,
        defaultBranch: 'main',
        openIssuesCount: 4,
        collaborators: [
          { username: 'rahul-sharma', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', permission: 'admin', roleName: 'Admin' },
          { username: 'priya-patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', permission: 'maintain', roleName: 'Maintainer' },
          { username: 'arjun-verma', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', permission: 'push', roleName: 'Developer' },
          { username: 'rohit-intern', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', permission: 'pull', roleName: 'Intern' },
        ],
      },
      {
        githubRepoId: 10102,
        name: 'client-dashboard-frontend',
        fullName: 'acme-corp/client-dashboard-frontend',
        owner: 'acme-corp',
        description: 'Next.js 15 Client Facing SaaS Dashboard with Tailwind & GraphQL',
        isPrivate: true,
        defaultBranch: 'main',
        openIssuesCount: 7,
        collaborators: [
          { username: 'priya-patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', permission: 'admin', roleName: 'Admin' },
          { username: 'sneha-deshmukh', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', permission: 'push', roleName: 'Frontend Engineer' },
          { username: 'amit-singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', permission: 'push', roleName: 'UI Specialist' },
        ],
      },
      {
        githubRepoId: 10103,
        name: 'ai-recommendation-engine',
        fullName: 'acme-corp/ai-recommendation-engine',
        owner: 'acme-corp',
        description: 'Vector Embedding Search & Real-time LLM Routing Microservice',
        isPrivate: true,
        defaultBranch: 'production',
        openIssuesCount: 2,
        collaborators: [
          { username: 'arjun-verma', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', permission: 'admin', roleName: 'Tech Lead' },
          { username: 'rahul-sharma', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', permission: 'push', roleName: 'Core Contributor' },
        ],
      },
      {
        githubRepoId: 10104,
        name: 'infrastructure-k8s-terraform',
        fullName: 'acme-corp/infrastructure-k8s-terraform',
        owner: 'acme-corp',
        description: 'Production AWS EKS cluster, Vault & Helm deployments',
        isPrivate: true,
        defaultBranch: 'main',
        openIssuesCount: 1,
        collaborators: [
          { username: 'rahul-sharma', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', permission: 'admin', roleName: 'DevOps Lead' },
        ],
      },
    ];

    const createdRepos = await Repository.insertMany(sampleRepos);

    // 2. Sample Developers
    const developers = [
      { username: 'rahul-sharma', name: 'Rahul Sharma', email: 'rahul@acme.dev', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
      { username: 'priya-patel', name: 'Priya Patel', email: 'priya@acme.dev', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { username: 'arjun-verma', name: 'Arjun Verma', email: 'arjun@acme.dev', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150' },
      { username: 'sneha-deshmukh', name: 'Sneha Deshmukh', email: 'sneha@acme.dev', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
      { username: 'amit-singh', name: 'Amit Singh', email: 'amit@acme.dev', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
      { username: 'rohit-intern', name: 'Rohit Gupta (Intern)', email: 'rohit@acme.dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    ];

    const commitMessages = [
      'feat(auth): integrate Razorpay subscription webhook handling',
      'fix(core): prevent race condition during high-throughput push sync',
      'refactor(db): optimize MongoDB compound index for committer stats',
      'feat(ui): add dark-mode glassy dashboard widgets with Lucide icons',
      'perf(api): reduce Octokit latency with Redis caching layer',
      'test(access): add unit tests for repository collaborator revocation',
      'docs: update developer onboarding guide and GitHub App setup instructions',
      'feat(analytics): add top committers velocity and lines changed breakdown',
      'fix(security): sanitize repo input to prevent privilege escalation',
      'chore(deps): upgrade Next.js and Mongoose dependencies',
    ];

    const branches = ['main', 'feature/razorpay-v2', 'hotfix/webhook-retry', 'develop', 'feat/rbac-matrix'];

    const commitsData = [];
    const pushData = [];

    // Generate 60 realistic commits over the last 14 days
    const now = new Date();
    for (let i = 0; i < 60; i++) {
      const dev = developers[Math.floor(Math.random() * developers.length)];
      const repo = createdRepos[Math.floor(Math.random() * createdRepos.length)];
      const msg = commitMessages[Math.floor(Math.random() * commitMessages.length)];
      const branch = branches[Math.floor(Math.random() * branches.length)];

      const daysAgo = Math.floor(Math.random() * 14);
      const hoursAgo = Math.floor(Math.random() * 24);
      const commitDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000 + hoursAgo * 60 * 60 * 1000));

      const adds = Math.floor(Math.random() * 280) + 12;
      const dels = Math.floor(Math.random() * 85) + 2;
      const sha = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);

      commitsData.push({
        sha,
        repositoryId: repo._id,
        repositoryFullName: repo.fullName,
        branch,
        message: msg,
        committerName: dev.name,
        committerEmail: dev.email,
        committerUsername: dev.username,
        committerAvatar: dev.avatar,
        committedAt: commitDate,
        stats: { additions: adds, deletions: dels, total: adds + dels },
        filesChanged: Math.floor(Math.random() * 8) + 1,
        url: `https://github.com/${repo.fullName}/commit/${sha}`,
      });

      // Group every few commits into a Push Event
      if (i % 2 === 0) {
        pushData.push({
          repositoryFullName: repo.fullName,
          pusherUsername: dev.username,
          pusherAvatar: dev.avatar,
          branch,
          commitCount: Math.floor(Math.random() * 3) + 1,
          totalAdditions: adds * 2,
          totalDeletions: dels * 2,
          headCommitSha: sha.substring(0, 7),
          headCommitMessage: msg,
          pushedAt: commitDate,
        });
      }
    }

    await Commit.insertMany(commitsData);
    await PushEvent.insertMany(pushData);

    // 3. Create Sample Access Audit Logs
    const auditLogsData = [
      {
        repositoryFullName: 'acme-corp/payment-gateway-service',
        targetUsername: 'rohit-intern',
        action: 'INVITED',
        permissionLevel: 'pull',
        performedBy: 'admin@acmecorp.dev (Siddharth)',
        status: 'SUCCESS',
        details: 'Granted read-only access for internship onboarding',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        repositoryFullName: 'acme-corp/ai-recommendation-engine',
        targetUsername: 'arjun-verma',
        action: 'ROLE_CHANGED',
        permissionLevel: 'admin',
        performedBy: 'admin@acmecorp.dev (Siddharth)',
        status: 'SUCCESS',
        details: 'Promoted to repository Tech Lead with Admin privileges',
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        repositoryFullName: 'acme-corp/infrastructure-k8s-terraform',
        targetUsername: 'ex-contractor',
        action: 'REMOVED',
        permissionLevel: 'none',
        performedBy: 'admin@acmecorp.dev (Siddharth)',
        status: 'SUCCESS',
        details: 'Revoked access upon contract completion',
        timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
      },
    ];

    await AccessAuditLog.insertMany(auditLogsData);

    res.json({
      success: true,
      message: 'Demo dataset seeded successfully with realistic activity and access controls!',
      counts: {
        repositories: createdRepos.length,
        commits: commitsData.length,
        pushes: pushData.length,
        auditLogs: auditLogsData.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
