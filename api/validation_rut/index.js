const express = require('express');
const router = express.Router();
const rutController = require('./rutController');

router.post('/', rutController.validationRut)

module.exports = router;