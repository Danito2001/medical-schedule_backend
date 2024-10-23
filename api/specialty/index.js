const express = require('express');
const router = express.Router();
const specialtyController = require('./specialtyController');

router.get('/', specialtyController.getAllSpecialty)

module.exports = router;