const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/users/profile
router.get('/dashboard', userController.dashboard);
router.post('/upload', userController.upload);

module.exports = router;
