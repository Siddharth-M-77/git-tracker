const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');
const { protect } = require('../middleware/authMiddleware');

router.get('/repos', accessController.getRepositories);
router.get('/repos/:repoId/collaborators', accessController.getRepoCollaborators);
router.post('/grant', accessController.grantOrUpdateAccess);
router.post('/revoke', accessController.revokeAccess);
router.get('/audit-logs', accessController.getAuditLogs);
router.post('/sync-github', accessController.syncFromGitHub);

module.exports = router;
