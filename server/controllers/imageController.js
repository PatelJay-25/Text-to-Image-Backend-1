const usermodel = require('../models/userModel');
const FormData = require('form-data');
const axios = require('axios');
require('dotenv').config();

exports.generateImage = async (req, res) => {

  
  try {
    const { prompt } = req.body;
    const userId=req.user.id;
    // Validate input
    if (!userId || !prompt) {
      return res.json({
        success: false,
        message:"user is not find",
      });
    }

    // Find user by ID
    const user = await usermodel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No credit balance',
        
      });
    }

    // Prepare form data for ClipDrop API
    const formData = new FormData();
    formData.append('prompt', prompt);

    // Call ClipDrop API
    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': '038100f9cd19d37083a3e3a0d31f9ce0c708203b725c163af3e108a52bc439dfbbe2d0666dae7e0fad00866349d76c32', // Hardcoded API key
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert binary to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct 1 credit
    const newBalance = user.creditBalance - 1;
    await usermodel.findByIdAndUpdate(user._id, {
      creditBalance: newBalance,
    });

    // Return success response
    res.json({
      success: true,
      message: 'Image Generated',
      creditBalance: newBalance,
      resultImage,
    });
    
  } 
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
