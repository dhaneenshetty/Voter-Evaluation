const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  booths: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booth' }],
  
});

module.exports = mongoose.model('Station', stationSchema);
