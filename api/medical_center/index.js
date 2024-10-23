const express = require('express');
const router = express.Router();
const medicalController = require('./medicalController');

router.get('/', medicalController.getAllMedicalCenter)

module.exports = router;