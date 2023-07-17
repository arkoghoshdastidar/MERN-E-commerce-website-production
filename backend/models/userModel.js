const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLenght: [30, 'Cannot exceed 30 characters'],
        minLenght: [5, 'Name should have more than 5 characters'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email address'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLenght: [8, 'Password should be at least 8 characters long']
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String
});

userSchema.pre('save', async function (req, res, next) {
    if (this.modifiedPaths().includes("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.getToken = function () {
    return jwt.sign({
        id: this._id
    },
        process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

userSchema.methods.checkPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetPasswordToken = async function () {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: Date.now() + 15 * 60 * 1000
    });
}

module.exports = mongoose.model('User', userSchema);