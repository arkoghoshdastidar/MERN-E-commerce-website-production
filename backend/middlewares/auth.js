const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const isUserAuthenticated = async function (req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(new ErrorHandler('Please login to use this resource.', 401));
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken.id);
        req.user = user;
        next();
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const authorizeRole = (...parameters) => {
    return (req, res, next) => {
        if (parameters.includes(req.user.role)) {
            return next();
        } else {
            return next(new ErrorHandler('User not authorized to access this resource.', 401));
        }
    }
}

module.exports = { isUserAuthenticated, authorizeRole };