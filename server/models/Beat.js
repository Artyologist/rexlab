const mongoose = require('mongoose');

const beatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  coverArtUrl: {
    type: String,
    default: '' // Placeholder or default image
  },
  price: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  mood: {
    type: String
  },
  bpm: {
    type: Number
  },
  duration: {
    type: String // e.g., "3:45"
  },
  isSold: {
    type: Boolean,
    default: false
  },
  plays: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Beat', beatSchema);
