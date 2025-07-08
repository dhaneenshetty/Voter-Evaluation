const express = require('express');
const router = express.Router();
const boothController = require('../controllers/boothController');

// Add booth to station
router.post('/:stationId', boothController.addBooth);

// View booths for a station (optional)
router.get('/:stationId', boothController.getBoothsByStation);
router.get('/:stationId/:boothNumber', boothController.getBoothWithVoters);


module.exports = router;
