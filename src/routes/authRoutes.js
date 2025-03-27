const express = require('express');
const authController = require('../controllers/authController.js');
const passwordController = require('../controllers/passwordController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', passwordController.forgotPassword);
router.post('/reset-password/:token', passwordController.resetPassword);

module.exports = router;