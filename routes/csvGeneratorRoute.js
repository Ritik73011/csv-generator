const express = require('express');
const { controllerFunction } = require('../controllers/csvGeneratorController');
const router = express.Router();

router.get('/generate-csv', controllerFunction);

module.exports = router