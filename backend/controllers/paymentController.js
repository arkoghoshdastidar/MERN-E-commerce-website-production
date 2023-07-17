const ErrorHandler = require('../utils/errorHandler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res, next) => {
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currenty: 'inr'
        });

        res.status(200).json({
            success: true,
            client_secret_key: myPayment.client_secret
        })
    } catch (e) {
        next(new ErrorHandler(e.message, 500));
    }
}

module.exports = { processPayment };