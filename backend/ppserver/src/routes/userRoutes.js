const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require("multer");
const upload = multer({ dest: "/tmp/uploads/", limits: { fileSize: 50000000 } });

const router = express.Router();

// GET /api/users/profile
router.get('/dashboard', userController.dashboard);
router.post('/upload', upload.array("files"), userController.upload);

module.exports = router;
