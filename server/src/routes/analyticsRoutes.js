const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/metrics', analyticsController.getOverviewMetrics);
router.get('/top-committers', analyticsController.getTopCommitters);
router.get('/activity-timeline', analyticsController.getActivityTimeline);
router.get('/live-pushes', analyticsController.getLivePushFeed);
router.get('/developer/:username', analyticsController.getDeveloperProfile);
router.post('/seed-demo', analyticsController.seedDemoData);

module.exports = router;
