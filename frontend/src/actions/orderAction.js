import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAIL,
    UPDATE_ORDER_STATUS_FAIL,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_REQUEST
} from '../constants/orderConstants';
import { BACKEND_HOSTNAME } from '../constants/global';
import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const createOrder = (orderDetails) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const { data } = await axios.post(BACKEND_HOSTNAME + '/api/v1/order/new', {
            orderDetails,
            config
        });


        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: {
                order: data
            }
        });
    } catch (err) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: {
                err: err.response.data.message
            }
        })
    }
}

export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        });

        const { data } = await axios.get(BACKEND_HOSTNAME + '/api/v1/orders/me');

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: {
                orders: data.orders
            }
        });
    } catch (err) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const getOrderDetails = (orderID) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { data } = await axios.get(BACKEND_HOSTNAME + '/api/v1/order/' + orderID);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: {
                orderDetails: data
            }
        });
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ORDER_REQUEST
        });

        const { data } = await axios.get(BACKEND_HOSTNAME + '/api/v1/admin/orders');
        console.log(data);

        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: {
                orderDetails: data
            }
        })
    } catch (err) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const getParticularOrderDetails = (orderID) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST
        })

        let orderDetails = {};
        let productDetails = [];

        const { data } = await axios.get(BACKEND_HOSTNAME + '/api/v1/order/' + orderID);
        orderDetails.orderItems = data.orders.orderItems;

        orderDetails.orderItems.forEach(async (item) => {
            const itemID = item.product;
            try {
                const { data } = await axios.get(BACKEND_HOSTNAME + '/api/v1/product/' + itemID);
                productDetails.push(data.product);
            } catch (e) {
                productDetails.push(undefined);
            }
        });

        dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload: {
                data: {
                    orderDetails,
                    productDetails
                }
            }
        })
    } catch (err) {
        dispatch({
            type: GET_ORDER_DETAILS_FAIL,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const updateOrderStatus = (orderID, status) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ORDER_STATUS_REQUEST
        })

        await axios.put(BACKEND_HOSTNAME+'/api/v1/admin/order/'+orderID, status);

        dispatch({
            type: UPDATE_ORDER_STATUS_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: UPDATE_ORDER_STATUS_FAIL,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}