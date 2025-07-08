// models/Booth.js
const mongoose = require('mongoose');

const boothSchema = new mongoose.Schema({
  boothNumber: {
    type: Number,
    required: true,
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
});

module.exports = mongoose.model('Booth', boothSchema);
