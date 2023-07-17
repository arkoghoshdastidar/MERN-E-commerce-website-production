const nodemailer = require('nodemailer');

const sendEmail = async function (email, link) {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "Password reset for ecommerce website. Click on the given link.",
        text: link,
    });
    return info;

}

module.exports = sendEmail;