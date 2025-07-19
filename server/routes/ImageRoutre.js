const express = require('express');
const router = express.Router();
const { generateImage } = require('../controllers/imageController');
const { userAuth } = require('../middleware/auth');

router.post('/generateImage', userAuth, generateImage);

module.exports = router;
