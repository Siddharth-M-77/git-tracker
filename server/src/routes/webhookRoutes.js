const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.post('/github', webhookController.handleGitHubWebhook);

module.exports = router;
