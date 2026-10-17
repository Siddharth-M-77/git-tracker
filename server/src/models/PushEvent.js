const mongoose = require('mongoose');

const PushEventSchema = new mongoose.Schema(
  {
    repositoryFullName: { type: String, required: true },
    pusherUsername: { type: String, required: true, index: true },
    pusherAvatar: { type: String },
    branch: { type: String, required: true },
    commitCount: { type: Number, default: 1 },
    totalAdditions: { type: Number, default: 0 },
    totalDeletions: { type: Number, default: 0 },
    headCommitSha: { type: String },
    headCommitMessage: { type: String },
    pushedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PushEvent', PushEventSchema);
