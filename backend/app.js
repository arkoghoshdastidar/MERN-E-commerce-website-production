const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const errorMiddleware = require('./middlewares/error');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');
const cors = require('cors');
const path = require('path');

const corsOptions = {
    origin: true,
    credentials: true
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Import routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', paymentRoute);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
})

// Error middleware
app.use(errorMiddleware);

module.exports = app;