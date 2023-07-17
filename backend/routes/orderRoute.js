const express = require('express');
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { isUserAuthenticated, authorizeRole } = require('../middlewares/auth');

// create a new order
router.post('/order/new', isUserAuthenticated, newOrder);

// get details of an order with provided order id
router.get('/order/:orderId', isUserAuthenticated, getSingleOrder);

// get all the orders of logged in user
router.get('/orders/me', isUserAuthenticated, myOrders);

// get all orders -- admin only
router.get('/admin/orders', isUserAuthenticated, authorizeRole("admin"), getAllOrders);

// update order status -- admin only
router.put('/admin/order/:orderId', isUserAuthenticated, authorizeRole("admin"), updateOrderStatus);

// delete order -- admin only
router.delete('/admin/order/:orderId', isUserAuthenticated, authorizeRole("admin"), deleteOrder);

module.exports = router;