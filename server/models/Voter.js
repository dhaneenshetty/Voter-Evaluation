const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  serialNumber: Number,
  name: String,
  voterId: String,
  stationId: String,     // or mongoose.Schema.Types.ObjectId if ref
  boothNumber: String,
  hasVoted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Voter', voterSchema);
