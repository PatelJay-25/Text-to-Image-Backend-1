const express=require('express');
const route=express.Router();

const {userAuth}=require('../middleware/auth');
const {userLogin,registerUser,userCredits,paymentRazorpay}=require('../controllers/userControllers');

route.post('/register',registerUser);
route.post('/login',userLogin);
route.get('/userCredits',userAuth,userCredits);
route.get('/razorpay-payment',userAuth,paymentRazorpay);
module.exports=route;