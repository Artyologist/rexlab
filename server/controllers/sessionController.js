const asyncHandler = require('express-async-handler');
const Session = require('../models/Session');

// @desc    Book a new session
// @route   POST /api/sessions
// @access  Public
const createSession = asyncHandler(async (req, res) => {
  const {
    clientName,
    clientEmail,
    clientPhone,
    date,
    timeSlot,
    sessionType,
    notes,
  } = req.body;

  const session = new Session({
    clientName,
    clientEmail,
    clientPhone,
    date,
    timeSlot,
    sessionType,
    notes,
  });

  const createdSession = await session.save();
  res.status(201).json(createdSession);
});

// @desc    Get all sessions
// @route   GET /api/sessions
// @access  Private/Admin
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({}).sort({ date: 1 });
  res.json(sessions);
});

// @desc    Get session by ID
// @route   GET /api/sessions/:id
// @access  Private/Admin
const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (session) {
    res.json(session);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

// @desc    Update session status
// @route   PUT /api/sessions/:id
// @access  Private/Admin
const updateSessionStatus = asyncHandler(async (req, res) => {
  const { status, paymentStatus } = req.body;

  const session = await Session.findById(req.params.id);

  if (session) {
    session.status = status || session.status;
    session.paymentStatus = paymentStatus || session.paymentStatus;

    const updatedSession = await session.save();
    res.json(updatedSession);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

// @desc    Delete a session
// @route   DELETE /api/sessions/:id
// @access  Private/Admin
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (session) {
    await session.deleteOne();
    res.json({ message: 'Session removed' });
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  updateSessionStatus,
  deleteSession,
};
