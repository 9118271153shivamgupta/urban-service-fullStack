const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. Token Verify karne ke liye (Sabhi Logged-in Users ke liye)
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Token nikalna
            const decoded = jwt.verify(token, "YOUR_SECRET_KEY"); // Token verify karna

            // Database se user nikalna bina password ke
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

// 2. Role Check karne ke liye (Hierarchy ke liye)
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `User role '${req.user.role}' is not authorized to access this route` 
            });
        }
        next();
    };
};

module.exports = { protect, authorize };