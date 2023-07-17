import {
    LOGIN_SIGNUP_FAIL,
    LOGIN_SIGNUP_REQUEST,
    LOGIN_SIGNUP_SUCCESS,
    CLEAR_ERROR,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_REQUEST,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_SIGNUP_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGOUT_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SIGNUP_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        case LOGOUT_USER_SUCCESS:
            return {
                user: null,
                loading: false,
                isAuthenticated: false
            }
        case LOGIN_SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.err,
                user: null,
                isAuthenticated: false
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                error: action.payload.err,
                user: null,
                isAuthenticated: false
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                error: action.payload.err
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return { ...state };
    }
}

export const profileReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                updatedUser: action.payload.user
            }
        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
            }
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                isUpdated: false,
                error: action.payload.err
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return {
                ...state
            }
    }
}

export const allUsers = (state = { userDetails: []}, action) => {
    switch(action.type){
        case ALL_USER_REQUEST:
            return {
                uLoading: true,
            }
        case ALL_USER_SUCCESS:
            return {
                ...state,
                uLoading: false,
                userDetails: action.payload.userDetails
            }
        case ALL_USER_FAIL:
            return {
                ...state,
                uLoading: false,
                userDetails: {},
                uError: action.payload.error
            }
        case CLEAR_ERROR:
            return {
                ...state,
                uError: null
            }
        default: 
            return state
    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch(action.type){
        case DELETE_USER_REQUEST:
            return {
                loading: true
            }
        case DELETE_USER_SUCCESS:
            return {
                isDeleted: true,
                loading: false
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                isDeleted: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}