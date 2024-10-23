const express = require('express');
const router = express.Router();
const appointmentController = require('./appointmentController');

router.post('/', appointmentController.createAppointment)
router.post('/get-appointment', appointmentController.getAppointmentByNumberAppointment)
router.put('/update-appointment', appointmentController.changeStatusAppointment)
router.get('/appointment-by-user', appointmentController.getAppointmentByUserId)

module.exports = router;