const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  clientPhone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String, // e.g., "14:00 - 18:00"
    required: true
  },
  sessionType: {
    type: String,
    enum: ['Full Recording', 'Audio / Instrumental', 'Vocals Recording', 'Mixing & Mastering', 'Custom'],
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['booked', 'completed', 'cancelled', 'pending'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'advance_paid', 'full_paid'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Session', sessionSchema);
