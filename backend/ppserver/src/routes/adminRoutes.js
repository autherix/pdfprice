const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

// GET /api/admin/users
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);

module.exports = router;
