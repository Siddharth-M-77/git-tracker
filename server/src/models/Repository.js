const mongoose = require('mongoose');

const RepositorySchema = new mongoose.Schema(
  {
    githubRepoId: { type: Number, required: true },
    name: { type: String, required: true },
    fullName: { type: String, required: true, unique: true }, // e.g. 'owner/repo'
    owner: { type: String, required: true },
    description: { type: String, default: '' },
    isPrivate: { type: Boolean, default: true },
    defaultBranch: { type: String, default: 'main' },
    htmlUrl: { type: String },
    openIssuesCount: { type: Number, default: 0 },
    forksCount: { type: Number, default: 0 },
    stargazersCount: { type: Number, default: 0 },
    lastPushAt: { type: Date, default: Date.now },
    collaborators: [
      {
        username: { type: String, required: true },
        avatar: { type: String },
        permission: {
          type: String,
          enum: ['admin', 'maintain', 'push', 'triage', 'pull'],
          default: 'push',
        },
        roleName: { type: String },
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Repository', RepositorySchema);
