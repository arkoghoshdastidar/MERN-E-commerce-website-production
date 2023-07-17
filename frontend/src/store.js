import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { allProductsReducer, productDetailsReducer, addReviewReducer, newProductReducer, deleteProductReducer } from './reducers/productReducer';
import { userReducer, profileReducer, allUsers, deleteUserReducer } from './reducers/userReducer';
import { cartReducer } from "./reducers/cartReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { orderReducer, myOrderReducer, updateOrderStatusReducer, orderDetailsReducer, allOrders, paritcularOrderReducer } from './reducers/orderReducer';

const initialState = {
    cart: {
        cartItems: (localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: (localStorage.getItem('shippingInfo')) ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
};

const reducers = combineReducers({
    products: allProductsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    order: orderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: addReviewReducer,
    allOrders: allOrders,
    allUsers: allUsers,
    newProduct: newProductReducer,
    productDeleted: deleteProductReducer,
    userDeleted: deleteUserReducer,
    particularOrder: paritcularOrderReducer,
    updateOrderStatus: updateOrderStatusReducer
});

export const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;