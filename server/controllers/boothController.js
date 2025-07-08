const mongoose = require('mongoose');
const Booth = require('../models/Booth');
const Station = require('../models/Station');
const Voter = require('../models/Voter');

// ✅ Add Booth
exports.addBooth = async (req, res) => {
  try {
    const { boothNumber } = req.body;
    const station = await Station.findById(req.params.stationId);

    if (!station) return res.status(404).json({ message: 'Station not found' });

    const existingBooth = await Booth.findOne({
      boothNumber: Number(boothNumber),
      station: station._id,
    });

    if (existingBooth) return res.status(400).json({ message: 'Booth already exists' });

    const booth = await Booth.create({ boothNumber: Number(boothNumber), station: station._id });
    station.booths.push(booth._id);
    await station.save();

    res.status(201).json(booth);
  } catch (err) {
    console.error('❌ Error adding booth:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Booths for a Station
exports.getBoothsByStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.stationId).populate('booths');
    if (!station) return res.status(404).json({ message: 'Station not found' });

    res.json(station.booths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Booth with its Voters
exports.getBoothWithVoters = async (req, res) => {
  const { stationId, boothNumber } = req.params;
  try {
    const booth = await Booth.findOne({
      boothNumber: Number(boothNumber), // ✅ Fix: cast to number
      station: mongoose.Types.ObjectId(stationId), // ✅ Fix: cast to ObjectId
    });

    if (!booth) return res.status(404).json({ message: 'Booth not found' });

    const voters = await Voter.find({
      boothNumber: Number(boothNumber),
      stationId,
    });

    res.json({
      boothNumber: booth.boothNumber,
      stationId: booth.station,
      voters,
    });
  } catch (err) {
    console.error('❌ Failed to fetch booth:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
