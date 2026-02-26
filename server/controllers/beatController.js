const asyncHandler = require('express-async-handler');
const Beat = require('../models/Beat');

// @desc    Get all beats
// @route   GET /api/beats
// @access  Public
const getBeats = asyncHandler(async (req, res) => {
  const beats = await Beat.find({}); 
  res.json(beats);
});

// @desc    Get single beat
// @route   GET /api/beats/:id
// @access  Public
const getBeatById = asyncHandler(async (req, res) => {
  const beat = await Beat.findById(req.params.id);

  if (beat) {
    res.json(beat);
  } else {
    res.status(404);
    throw new Error('Beat not found');
  }
});

// @desc    Create a beat
// @route   POST /api/beats
// @access  Private/Admin
const createBeat = asyncHandler(async (req, res) => {
  const { title, audioUrl, coverArtUrl, price, genre, mood, bpm, duration } = req.body;

  const beat = new Beat({
    title,
    audioUrl,
    coverArtUrl,
    price,
    genre,
    mood,
    bpm,
    duration,
  });

  const createdBeat = await beat.save();
  res.status(201).json(createdBeat);
});

// @desc    Update a beat
// @route   PUT /api/beats/:id
// @access  Private/Admin
const updateBeat = asyncHandler(async (req, res) => {
  const {
    title,
    audioUrl,
    coverArtUrl,
    price,
    genre,
    mood,
    bpm,
    duration,
    isSold
  } = req.body;

  const beat = await Beat.findById(req.params.id);

  if (beat) {
    beat.title = title || beat.title;
    beat.audioUrl = audioUrl || beat.audioUrl;
    beat.coverArtUrl = coverArtUrl || beat.coverArtUrl;
    beat.price = price || beat.price;
    beat.genre = genre || beat.genre;
    beat.mood = mood || beat.mood;
    beat.bpm = bpm || beat.bpm;
    beat.duration = duration || beat.duration;
    beat.isSold = isSold !== undefined ? isSold : beat.isSold;

    const updatedBeat = await beat.save();
    res.json(updatedBeat);
  } else {
    res.status(404);
    throw new Error('Beat not found');
  }
});

// @desc    Delete a beat
// @route   DELETE /api/beats/:id
// @access  Private/Admin
const deleteBeat = asyncHandler(async (req, res) => {
  const beat = await Beat.findById(req.params.id);

  if (beat) {
    await beat.deleteOne();
    res.json({ message: 'Beat removed' });
  } else {
    res.status(404);
    throw new Error('Beat not found');
  }
});

module.exports = {
  getBeats,
  getBeatById,
  createBeat,
  updateBeat,
  deleteBeat,
};
