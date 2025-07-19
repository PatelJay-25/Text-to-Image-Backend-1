const usermodel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Razorpay = require('razorpay');
const transactionModel = require('../models/TransactionModel');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.json({ success: false, message: 'Missing details' });
    }

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'Email already registered' });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const UserData = { name, email, password: hashPass, creditBalance: 5 }; // Explicitly set creditBalance

    const newUser = new usermodel(UserData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET || "hellojikehosare");

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        creditBalance: user.creditBalance, // Added creditBalance
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid user' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET || "hellojikehosare");
      res.json({ 
        success: true, 
        token,
        user: {
          name: user.name,
          email: user.email,
          creditBalance: user.creditBalance, // Added creditBalance
        }
      });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await usermodel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      credits: user.creditBalance,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;
    const userData = await usermodel.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: 'Missing details' });
    }

    let credits, amount, plan;
    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 10;
        break;
      case 'Advanced':
        plan = 'Advanced';
        credits = 500;
        amount = 50;
        break;
      case 'Business':
        plan = 'Business';
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: 'Plan not found' });
    }

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    };

    const newTransaction = await transactionModel.create(transactionData);

    // 🔥 Razorpay initialized inside the function
    const razorpayInstance = new Razorpay({
      key_id: "rzp_test_jIKqm1ysgxZrOC",
      key_secret:"6y2WwPu1CxrKH5i8I1c4512R",
    });

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || 'INR',
      receipt: newTransaction._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }

      return res.json({
        success: true,
        order,
        transaction: newTransaction,
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  userLogin,
  registerUser,
  userCredits,
  paymentRazorpay,
};
