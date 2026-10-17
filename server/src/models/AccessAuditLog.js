const mongoose = require('mongoose');

const AccessAuditLogSchema = new mongoose.Schema(
  {
    repositoryFullName: { type: String, required: true },
    targetUsername: { type: String, required: true },
    action: {
      type: String,
      enum: ['INVITED', 'REMOVED', 'ROLE_CHANGED', 'SYNCED'],
      required: true,
    },
    permissionLevel: {
      type: String,
      enum: ['admin', 'maintain', 'push', 'triage', 'pull', 'none'],
      required: true,
    },
    performedBy: { type: String, required: true }, // username or email of admin
    status: { type: String, enum: ['SUCCESS', 'FAILED'], default: 'SUCCESS' },
    details: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AccessAuditLog', AccessAuditLogSchema);
