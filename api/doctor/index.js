const express = require('express');
const router = express.Router();
const doctorController = require('./doctorController');

const { authenticateToken } = require('../../middleware/auth')

router.get('/filtered', doctorController.getFilteredDoctors)
router.get('/get-availability', doctorController.getDoctorAvailabilityById)
router.get('/get-patients', doctorController.getPatientByDoctorId)
router.post('/set-availability', doctorController.setAvailabilityByDoctorId)

module.exports = router;