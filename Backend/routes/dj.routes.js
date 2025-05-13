const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const uploadMiddleware = require('../middleware/upload');
const djController = require('../controllers/dj.controller');

router.use(authMiddleware);

// DJ Profile Routes
router.get('/:id', djController.getDJProfile);
router.put('/profile', djController.updateDJProfile);

// DJ Post Routes
router.post('/posts', uploadMiddleware.array('media', 5), djController.createPost);

module.exports = router;