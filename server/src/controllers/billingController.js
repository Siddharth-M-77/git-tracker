const razorpayService = require('../services/razorpayService');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

// Get available subscription tiers
exports.getPlans = (req, res) => {
  const plans = razorpayService.getPlans();
  res.json({ success: true, plans });
};

// Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { planId, billingCycle } = req.body;
    if (!planId) {
      return res.status(400).json({ success: false, message: 'Plan ID is required' });
    }

    const orderData = await razorpayService.createOrder(planId, billingCycle);

    // If free plan, update user plan directly
    if (orderData.isFree && req.user) {
      await User.findByIdAndUpdate(req.user.id, { currentPlan: 'starter' });
      return res.json({
        success: true,
        isFree: true,
        message: 'Activated Starter Free Plan successfully',
      });
    }

    // Save pending subscription record in MongoDB
    if (req.user) {
      await Subscription.create({
        userId: req.user.id,
        planId: orderData.plan.id,
        planName: orderData.plan.name,
        amount: orderData.amount,
        currency: orderData.currency,
        razorpayOrderId: orderData.orderId,
        billingCycle: billingCycle || 'monthly',
        status: 'created',
      });
    }

    res.json({
      success: true,
      order: orderData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay Payment Signature
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, planId } = req.body;

    const isValid = razorpayService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature. Payment verification failed.',
      });
    }

    // Update subscription in DB
    const sub = await Subscription.findOne({ razorpayOrderId });
    const validityDays = sub?.billingCycle === 'yearly' ? 365 : 30;
    const validUntil = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);

    if (sub) {
      sub.razorpayPaymentId = razorpayPaymentId;
      sub.razorpaySignature = razorpaySignature;
      sub.status = 'active';
      sub.validUntil = validUntil;
      await sub.save();
    }

    // Update user's current plan
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        currentPlan: planId || sub?.planId || 'pro',
        subscriptionId: sub?._id,
      });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully! Your SaaS workspace has been upgraded.',
      plan: planId || sub?.planId || 'pro',
      validUntil,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Razorpay Webhook listener (for recurring payment, failed charge, cancellation)
exports.handleWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    // In production, verify crypto.createHmac with webhookSecret
    const event = req.body.event;
    console.log(`🔔 Razorpay Webhook Event: ${event}`);

    res.json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
