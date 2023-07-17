const sendToken = function (res, statusCode, user) {
    const token = user.getToken();
    res.status(statusCode).json({
        success: true,
        token,
        user: user
    });
}

module.exports = sendToken;