import styles from './LoginSignup.module.css';
import { useState, useRef } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { login, clearError, signup, logoutUser } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from "react-router-dom"

const LoginSignup = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const nameRef = useRef();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isAuthenticated, loading, user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success('Logout successful');
    }

    const formSubmitHandler = () => {
        // extracting values from the input fields
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = (isLoggingIn === false) ? confirmPasswordRef.current.value : null;
        const name = (isLoggingIn === false) ? nameRef.current.value : null;

        if (isLoggingIn) {
            // submit to login
            dispatch(login(email, password));
        } else {
            // submit to signup
            if (password === confirmPassword) {
                dispatch(signup(name, email, password));
            } else {
                alert.show('Password and confirm passwor do not match.');
            }
        }

        // clearing the input fields
        emailRef.current.value = "";
        passwordRef.current.value = "";
        if (isLoggingIn === false) {
            confirmPasswordRef.current.value = "";
            nameRef.current.value = "";
        }
    }

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }

    if (isAuthenticated === true) {
        return (
            <div className={styles['loggedin-btn-group']}>
                {
                    user.user.role === 'admin' && <Button size="large" variant="contained" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                }
                <Button size="large" variant="contained" onClick={() => navigate('/account')}>Profile</Button>
                <Button size="large" variant="contained" onClick={() => navigate('/orders')}>Orders</Button>
                <Button size="large" variant="contained" onClick={() => navigate('/cart')}>Cart</Button>
                <Button size="large" variant="contained" onClick={() => logoutHandler()}>Logout</Button>
            </div>
        )
    }

    return (
        <div className={styles['login-signup-container']}>
            {loading ? <Loader /> : <><ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => setIsLoggingIn(true)}>Login</Button>
                <Button onClick={() => setIsLoggingIn(false)}>SignUp</Button>
            </ButtonGroup>
                <form>
                    {!isLoggingIn && <div>
                        <label>Name</label>
                        <input ref={nameRef} required type="text" name="name" placeholder="example" />
                    </div>}
                    <div>
                        <label>Email</label>
                        <input ref={emailRef} required type="email" name="email" placeholder="example@example.com" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input ref={passwordRef} required type="password" name="password" placeholder='password' />
                    </div>
                    {!isLoggingIn && <div>
                        <label>Confirm Password</label>
                        <input ref={confirmPasswordRef} required type="password" name="confirm_password" placeholder='confirm password' />
                    </div>}
                </form>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={formSubmitHandler}>{isLoggingIn ? "Login" : "SignUp"}</Button>
                </ButtonGroup></>}
        </div>
    )
}

export default LoginSignup;