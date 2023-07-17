import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstants';
import { BACKEND_HOSTNAME } from '../constants/global';
import axios from 'axios';

export const addItemToCart = (productID, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(BACKEND_HOSTNAME + `/api/v1/product/${productID}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            productID,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productID) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            productID
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: {
            shippingInfo: data
        }
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}