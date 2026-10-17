const mongoose = require('mongoose');

const CommitSchema = new mongoose.Schema(
  {
    sha: { type: String, required: true, index: true },
    repositoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Repository', required: true },
    repositoryFullName: { type: String, required: true },
    branch: { type: String, default: 'main' },
    message: { type: String, required: true },
    committerName: { type: String, required: true },
    committerEmail: { type: String, required: true },
    committerUsername: { type: String, index: true },
    committerAvatar: { type: String, default: '' },
    committedAt: { type: Date, required: true, index: true },
    stats: {
      additions: { type: Number, default: 0 },
      deletions: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    filesChanged: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    url: { type: String },
  },
  { timestamps: true }
);

// Compound index for querying developer analytics quickly
CommitSchema.index({ committerUsername: 1, committedAt: -1 });
CommitSchema.index({ repositoryFullName: 1, committedAt: -1 });

module.exports = mongoose.model('Commit', CommitSchema);
