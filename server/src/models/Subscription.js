const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: {
      type: String,
      enum: ['starter', 'pro', 'enterprise'],
      required: true,
    },
    planName: { type: String, required: true },
    amount: { type: Number, required: true }, // amount in INR paise or rupees
    currency: { type: String, default: 'INR' },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    status: {
      type: String,
      enum: ['created', 'authorized', 'captured', 'active', 'failed', 'cancelled'],
      default: 'created',
    },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    validUntil: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', SubscriptionSchema);
