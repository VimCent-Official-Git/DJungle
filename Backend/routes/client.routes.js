const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const clientController = require('../controllers/client.controller');

router.use(authMiddleware);

// Client Profile Routes
router.get('/:id', clientController.getClientProfile);

// Client Event Routes
router.post('/events', clientController.createEvent);

module.exports = router;