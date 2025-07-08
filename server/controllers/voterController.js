const XLSX = require('xlsx');
const Voter = require('../models/Voter');
const fs = require('fs');

// ✅ Upload Voters via Excel
exports.uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    const { stationId, boothNumber } = req.body;

    if (!file || !stationId || !boothNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const workbook = XLSX.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const voters = jsonData.map((row, i) => ({
      serialNumber: i + 1,
      name: row.name || row.Name,
      voterId: row.voterId || row.VoterID,
      stationId,
      boothNumber,
      hasVoted: false,
    }));

    await Voter.insertMany(voters);
    fs.unlinkSync(file.path); // Cleanup

    res.status(200).json({ message: `✅ ${voters.length} voters uploaded.` });
  } catch (err) {
    console.error('❌ Upload Error:', err);
    res.status(500).json({ error: 'Excel upload failed' });
  }
};

// ✅ Get Voters by Booth Number
// ✅ Get All Voters in a Booth (for polling head)
// ✅ voterController.js
// ✅ voterController.js
exports.getVotersByBooth = async (req, res) => {
  const { stationId, boothNumber } = req.query;

  if (!stationId || !boothNumber) {
    return res.status(400).json({ message: 'Missing stationId or boothNumber' });
  }

  try {
    const voters = await Voter.find({ stationId, boothNumber });
    res.json(voters);
  } catch (err) {
    console.error('Error fetching voters:', err);
    res.status(500).json({ message: 'Server error while fetching voters' });
  }
};
// ✅ Get All Voters for a Station
// controller
// GET /voters/station?stationId=xxx
// ✅ controllers/voterController.js
exports.getVotersByStation = async (req, res) => {
  const { stationId } = req.query;

  if (!stationId) return res.status(400).json({ message: 'Missing stationId' });

  try {
    const voters = await Voter.find({ stationId });
    res.json(voters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// ✅ Mark Voter as Voted
// controllers/voterController.js
// ✅ Mark Voter as Voted
exports.markVoterAsVoted = async (req, res) => {
  try {
    const { stationId, boothNumber, serialNumber } = req.body;

    console.log('🔍 Marking voter', { stationId, boothNumber, serialNumber });

    if (!stationId || !boothNumber || !serialNumber) {
      return res.status(400).json({ message: 'Missing stationId, boothNumber or serialNumber' });
    }

    const voter = await Voter.findOne({
      stationId: String(stationId),
      boothNumber: String(boothNumber),
      serialNumber: Number(serialNumber),
    });

    if (!voter) {
      return res.status(404).json({ message: '❌ Voter not found' });
    }

    if (voter.hasVoted) {
      return res.status(400).json({ message: '⚠️ Voter has already voted' });
    }

    voter.hasVoted = true;
    await voter.save();

    return res.json({ message: '🗳️ Voter marked as voted', voter });
  } catch (err) {
    console.error('❌ Error marking voter:', err.message);
    return res.status(500).json({ message: 'Server error marking voter' });
  }
};



// ✅ Optional: Delete all voters (admin tool)
exports.deleteAllVoters = async (req, res) => {
  try {
    await Voter.deleteMany({});
    res.json({ message: 'All voter records deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
