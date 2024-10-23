const express = require('express');
const router = express.Router();
const emailController = require('./emailController');

router.post('/send-email', emailController.sendEmail)

module.exports = router;