const express = require('express');
const router = express.Router();
const previsionsController = require('./previsionsController');

router.get('/', previsionsController.getAllPrevisions)

module.exports = router;