const User = require("../models/user.model");
const asyncHandle = require("../middlewares/async");
const ErrorResponse = require("../utils/ErrorResponse");
const uuid = require("uuid");

// @desc Post register
// @route POST /api/v1/auth/register
// @access Private
exports.Register = asyncHandle(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(new ErrorResponse('Invalid credentials', 400));
    }

    let isAdmin = false;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        isAdmin = true;
    }

    const apiKey = uuid.v4();
    const user = await User.create({ username, email, password, apiKey, isAdmin });
    const token = user.getJWT();

    res.status(201).json({
        success: true,
        data: user,
        token,
    });
});

// @desc Post login
// @route POST /api/v1/auth/login
// @access Private
exports.Login = asyncHandle(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const token = user.getJWT();
    res.status(200).json({
        success: true,
        data: user,
        token,
    });
});

// @desc Get user list
// @route GET /api/v1/auth/userLists
// @access Private
exports.userLists = asyncHandle(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});

// @desc Post logout
// @route POST /api/v1/auth/logout
// @access Private
exports.Logout = asyncHandle(async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return next(new ErrorResponse('No token provided', 400));
    }

    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
});
