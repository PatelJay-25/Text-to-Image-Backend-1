const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { userAuth } = require('../middleware/auth');

// Protect routes with auth middleware
router.post('/razorpay-order', userAuth, createOrder);
router.post('/verify', userAuth, verifyPayment);

module.exports = router; 