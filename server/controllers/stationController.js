const Station = require('../models/Station');

// Create Station
exports.createStation = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const station = await Station.create({
      name,
      email: email.trim().toLowerCase(),   // ✅ important
      password: password.trim(),           // ✅ optional, good practice
    });

    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get All Stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find().populate('booths');
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate('booths');
    if (!station) return res.status(404).json({ message: 'Not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Secure Polling Head Login
// ✅ loginPollingHead with trimmed and lowercased email
exports.loginPollingHead = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase(); // ✅ sanitize input
  const password = req.body.password?.trim();

  try {
    const station = await Station.findOne({ email, password }).populate('booths');

    if (!station) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ stationId: station._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ Delete Station
exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Polling station deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
