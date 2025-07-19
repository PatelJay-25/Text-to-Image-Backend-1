const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({
            success: false,
            message: 'Not authorized. Please login again.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, "hellojikehosare");
        if (decoded.id) {
            req.user = { id: decoded.id }; // Attach user info to req.user
            next();
        } else {
            return res.json({
                success: false,
                message: 'Not authorized. Please login again.'
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: 'Invalid token',
        });
    }
};