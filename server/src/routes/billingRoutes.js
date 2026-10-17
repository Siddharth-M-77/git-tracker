const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/plans', billingController.getPlans);
router.post('/create-order', protect, billingController.createOrder);
router.post('/verify-payment', protect, billingController.verifyPayment);
router.post('/webhook', billingController.handleWebhook);

module.exports = router;
