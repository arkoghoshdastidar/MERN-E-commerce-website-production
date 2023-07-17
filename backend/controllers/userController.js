const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password
        });

        sendToken(res, 201, user);
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // check if user did not provide an email or password
        if (!email || !password) {
            return next(new ErrorHandler(err.message, 401));
        }

        // check if email is a valid email or not
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found", 401));
        }

        // check if password is a valid password of not
        const isPasswordCorrect = await user.checkPassword(password);

        if (!isPasswordCorrect) {
            return next(new ErrorHandler("User not found", 401));
        }

        // return the user token with status code 200 
        sendToken(res, 200, user);
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const logoutUser = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.status(200).json({
        success: true,
        message: "User logged out."
    });
}

const resetPassword = async function (req, res, next) {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
        return next(new Error('User not found!', 400));
    }
    try {
        const resetPasswordToken = await user.getResetPasswordToken();
        user.resetPasswordToken = resetPasswordToken;
        await user.save();
        const link = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + resetPasswordToken;

        // sending email
        const result = await sendEmail(user.email, link);

        res.status(200).json({
            success: true,
            result,
            link
        });

    } catch (err) {
        user.resetPasswordToken = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message, 401));
    }
}

const changePassword = async (req, res, next) => {
    try {
        const resetPasswordToken = req.params.resetPasswordToken;
        const email = jwt.verify(resetPasswordToken, process.env.JWT_SECRET_KEY).email;

        if (!email) {
            return next(new ErrorHandler('Token expired', 400));
        }
        const user = await User.findOne({ email: email });

        if (!user) {
            return next(new ErrorHandler('Email not found', 400));
        }

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if (password !== confirmPassword) {
            return next(new ErrorHandler('Password do not match', 400));
        }

        user.password = password;
        await user.save();

        sendToken(res, 200, user);

    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

const getUserDetails = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        res.status(200).json({
            user
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const user = req.user;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        const isPasswordCorrect = await user.checkPassword(oldPassword);

        if (!isPasswordCorrect) {
            return next(new ErrorHandler('Old password is incorrect.', 400));
        }

        if (newPassword !== confirmPassword) {
            return next(new ErrorHandler('New password does not match confirm password', 400));
        }

        user.password = newPassword;
        await user.save();

        sendToken(res, 200, user);
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const newProfile = await User.findByIdAndUpdate(userId, {
            name: req.body.name,
            email: req.body.email
        }, {
            new: true,
            runValidation: true
        });

        res.status(200).json({
            success: true,
            user: newProfile
        });
    } catch (err) {
        next(new ErrorHandler('Could not update profile', 500));
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler('User not found', 400));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const updateUserRole = async (req, res, next) => {
    try {
        const newUser = await User.findByIdAndUpdate(req.params.id, {
            email: req.body.email,
            name: req.body.name,
            role: req.body.role
        }, {
            new: true,
            runValidation: true
        });

        res.status(200).json({
            success: true,
            newUser
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const deleteUserProfile = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'User profile deleted successfully'
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

module.exports = {
    registerUser, loginUser, logoutUser, resetPassword, changePassword,
    getUserDetails, updatePassword, updateProfile, getAllUsers, getUser, updateUserRole, deleteUserProfile
};