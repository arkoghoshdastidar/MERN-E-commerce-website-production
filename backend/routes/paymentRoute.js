const express = require('express');
const router = express.Router();
const { isUserAuthenticated } = require('../middlewares/auth');
const { processPayment } = require('../controllers/paymentController');

router.post('/process/payment', isUserAuthenticated, processPayment);

module.exports = router;