const express = require('express');
const router = express.Router();
const {
  getBeats,
  getBeatById,
  createBeat,
  updateBeat,
  deleteBeat,
} = require('../controllers/beatController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getBeats).post(protect, admin, createBeat);
router
  .route('/:id')
  .get(getBeatById)
  .put(protect, admin, updateBeat)
  .delete(protect, admin, deleteBeat);

module.exports = router;
