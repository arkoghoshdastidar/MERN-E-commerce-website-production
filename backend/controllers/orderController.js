const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/productModel');

const updateStock = async (productId, quantity) => {
    const product = await Product.findById(productId);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

// create a new order
const newOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body.orderDetails;
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id,
            payedAt: Date.now()
        });
        res.status(200).json({
            success: true,
            order
        });
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err.message, 500));
    }
}

// get logged in user orders
const getSingleOrder = async (req, res, next) => {
    try {
        const orders = await Order.findById(req.params.orderId).populate('user', 'name email');
        if (!orders) {
            return next(new ErrorHandler('No such order', 500));
        }
        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// get single order
const myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        });
        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// get all orders 
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        let totalAmount = 0;

        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        })

        res.status(200).json({
            success: true,
            orders,
            totalAmount
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// update order status 
const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if(!order){
            return next(new ErrorHandler('Order not found', 400));
        }
        if (order.orderStatus === 'Delivered') {
            return next(new ErrorHandler('Product already delivered', 400));
        }
        if (order.orderStatus === 'Cancelled') {
            return next(new ErrorHandler('Order cancelled- product out of stock or unavailable', 400));
        }

        const orderItems = order.orderItems;
        orderItems.forEach(async (item) => {
            await updateStock(item.product, item.quantity);
        });
        order.orderStatus = req.body.status;

        if (order.orderStatus === 'Delivered') {
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// delete order 
const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndRemove(req.params.orderId);
        res.status(200).json({
            success: true
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

module.exports = { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder };