import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADD_REVIEW_FAIL,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    CREATE_NEW_PRODUCT_FAIL,
    CREATE_NEW_PRODUCT_REQUEST,
    CREATE_NEW_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS
} from '../constants/productConstants';

export const allProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload.err,
                products: []
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state };
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.productDetails
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload.err,
                product: {}
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state };
    }
}

export const addReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return {
                reviewLoading: true
            }
        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                reviewLoading: false,
                data: action.payload.data
            }
        case ADD_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload.err,
                reviewLoading: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                reviewLoading: false,
                error: null
            }
        default:
            return state;
    }
}

export const newProductReducer = (state = {}, action) => {
    switch (action.type){
        case CREATE_NEW_PRODUCT_REQUEST:
            return {
                newPdtLoading: true
            }
        case CREATE_NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                newPdtLoading: false,
                newProduct: action.payload.newProduct
            }
        case CREATE_NEW_PRODUCT_FAIL:
            return {
                ...state,
                newPdtLoading: false,
                pdtError: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                newPdtLoading: false,
                pdtError: null
            }
        default:
            return state;
    }
}

export const deleteProductReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
            return {
                loading: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isDeleted: true
            }
        case DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                isDeleted: false,
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