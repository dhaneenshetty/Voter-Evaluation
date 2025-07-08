const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  uploadExcel,
  getVotersByBooth,
  markVoterAsVoted,
  deleteAllVoters,
  getVotersByStation, // ✅ exists in controller
} = require('../controllers/voterController');

// ✅ Upload Excel
router.post('/upload-excel', upload.single('file'), uploadExcel);

// ✅ Get all voters by station (MUST be above booth route!)
router.get('/by-station', getVotersByStation);

// ✅ Mark voter as voted
router.put('/mark-voted', markVoterAsVoted);

// ✅ Delete all voters
router.delete('/clear-all', deleteAllVoters);

// ✅ Get voters by booth number (KEEP THIS LAST)
router.get('/:boothNumber', getVotersByBooth);

module.exports = router;
