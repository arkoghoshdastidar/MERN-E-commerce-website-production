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
    ALL_ORDER_SUCCESS,
    ALL_ORDER_REQUEST,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAIL,
    UPDATE_ORDER_STATUS_FAIL,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_REQUEST
} from '../constants/orderConstants';

export const orderReducer = (state = { orders: {} }, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.order
            }
        case CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.err
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const myOrderReducer = (state = {orders: []}, action) => {
    switch (action.type){
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders
            }
        case MY_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                orders: [],
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export const allOrders = (state = { orders: []}, action) => {
    switch (action.type){
        case ALL_ORDER_REQUEST:
            return {
                oLoading: true
            }
        case ALL_ORDER_SUCCESS:
            return {
                ...state,
                oLoading: false,
                orderDetails: action.payload.orderDetails
            }
        case ALL_ORDER_FAIL:
            return {
                ...state,
                oLoading: false,
                orderDetails: {},
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: 
            return state;
    }
}

export const orderDetailsReducer = (state = {orderDetails: {}}, action) => {
    switch (action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderDetails: action.payload.orderDetails
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const paritcularOrderReducer = (state={}, action) => {
    switch(action.type){
        case GET_ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload.data
            }
        case GET_ORDER_DETAILS_FAIL:
            return {
                loading: false,
                orderDetails: {},
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const updateOrderStatusReducer = (state={}, action) => {
    switch(action.type){
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                loading: true
            }
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                loading: false
            }
        case UPDATE_ORDER_STATUS_FAIL:
            return {
                loading: false,
                error: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}