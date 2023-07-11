const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// GET /api/users/profile
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
