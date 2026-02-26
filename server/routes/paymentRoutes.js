const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Note: Using protect middleware if we want only logged in users to buy. 
// If guest checkouts are allowed, remove `protect`.
router.post('/order', createOrder);
router.post('/verify', verifyPayment);

module.exports = router;
