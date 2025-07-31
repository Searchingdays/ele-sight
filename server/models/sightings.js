const mongoose = require('mongoose');

const SightingSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  description: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sighting', SightingSchema);
