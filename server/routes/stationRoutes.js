const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

// Create new polling station
router.post('/', stationController.createStation);

// Get all polling stations
router.get('/', stationController.getAllStations);

// Get polling station by ID
router.get('/:id', stationController.getStationById);
router.delete('/:id', stationController.deleteStation);
// ✅ New: Polling head login route
router.post('/login-polling', stationController.loginPollingHead);


module.exports = router;
