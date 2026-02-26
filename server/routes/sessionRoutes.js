const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  updateSessionStatus,
  deleteSession,
} = require('../controllers/sessionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(createSession).get(protect, admin, getSessions);
router
  .route('/:id')
  .get(protect, admin, getSessionById)
  .put(protect, admin, updateSessionStatus)
  .delete(protect, admin, deleteSession);

module.exports = router;
