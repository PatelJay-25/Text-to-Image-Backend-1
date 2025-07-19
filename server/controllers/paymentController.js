require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const usermodel = require('../models/userModel');


// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_jIKqm1ysgxZrOC",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "6y2WwPu1CxrKH5i8I1c4512R",
});

// Create Razorpay Order
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount, // amount in paise
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json({
            success: true,
            id: order.id,
            amount: order.amount,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Could not create order' });
    }
};

// Verify Payment and Add Credits
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, credits } = req.body;
        const userId = req.user.id;

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || "6y2WwPu1CxrKH5i8I1c4512R")
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment is verified, add credits to the user
            const user = await usermodel.findById(userId);
            if (user) {
                user.creditBalance += credits;
                await user.save();
                res.json({ success: true, message: 'Payment verified and credits added' });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}; 