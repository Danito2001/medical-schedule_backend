const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/login', userController.login)

module.exports = router;