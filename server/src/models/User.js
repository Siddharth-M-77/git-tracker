const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // optional if logged in via Google/GitHub
    avatar: { type: String, default: '' },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'tech_lead', 'developer', 'viewer'],
      default: 'admin',
    },
    googleId: { type: String },
    githubUsername: { type: String },
    githubAccessToken: { type: String },
    companyName: { type: String, default: 'Acme Corp' },
    currentPlan: {
      type: String,
      enum: ['starter', 'pro', 'enterprise'],
      default: 'starter',
    },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
