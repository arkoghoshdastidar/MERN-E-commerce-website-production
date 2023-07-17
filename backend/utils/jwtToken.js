const sendToken = function (res, statusCode, user) {
    const token = user.getToken();
    res.status(statusCode).cookie("token", token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ), 
        httpOnly: false
    }).json({
        success: true,
        token,
        user: user
    });
}

module.exports = sendToken;