const crypto = require('crypto');
const Order = require('../models/Order');

// Lazily initialize Razorpay so server starts even if package is missing
let razorpay;
try {
  const Razorpay = require('razorpay');
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} catch (e) {
  console.warn('⚠️  Razorpay package not found. Run: npm install razorpay');
}

// @desc    Create a new Razorpay order
// @route   POST /api/payment/order
// @access  Public (no auth required for test mode)
const createOrder = async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({
      message: 'Razorpay not configured. Run "npm install razorpay" in the server folder.',
    });
  }

  const { amount, items } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Invalid amount provided.' });
  }

  try {
    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ message: 'Error creating Razorpay order' });
    }

    // Save pending order to DB
    await Order.create({
      items,
      totalAmount: Number(amount),
      razorpayOrderId: razorpayOrder.id,
      status: 'pending',
    });

    console.log(`✅ Razorpay order created: ${razorpayOrder.id} — ₹${amount}`);

    res.status(201).json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('createOrder error:', error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payment/verify
// @access  Public
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing payment verification fields.' });
  }

  try {
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'paid',
        },
        { new: true }
      );

      console.log(`💰 Payment verified: ${razorpay_payment_id}`);
      return res.status(200).json({ message: 'Payment verified successfully', order });
    } else {
      console.warn(`❌ Signature mismatch for order: ${razorpay_order_id}`);
      return res.status(400).json({ message: 'Invalid signature, payment failed' });
    }
  } catch (error) {
    console.error('verifyPayment error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createOrder, verifyPayment };
