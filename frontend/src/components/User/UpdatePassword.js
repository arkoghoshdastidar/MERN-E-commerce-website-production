import styles from './editProfile.module.css';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { updatePassword, resetProfile, clearError } from '../../actions/userActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const { error, loading, isUpdated } = useSelector(state => state.profile);

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }

    if (isUpdated) {
        alert.info('Password updated successfully');
        dispatch(resetProfile());
        navigate('/account');
    }

    const formSubmitHandler = () => {
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
        oldPasswordRef.current.value = '';
        newPasswordRef.current.value = '';
        confirmPasswordRef.current.value = '';
    }

    return (
        <>
            {
                loading ? <Loader /> : <div className={styles['edit-profile-container']}>
                    <form>
                        <div>
                            <label>Old Password</label>
                            <input ref={oldPasswordRef} type="password" name="name" placeholder="example" />
                        </div>
                        <div>
                            <label>New Password</label>
                            <input ref={newPasswordRef} type="password" name="name" placeholder="example" />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input ref={confirmPasswordRef} type="password" name="email" placeholder="example@example.com" />
                        </div>
                    </form>
                    <ButtonGroup variant="contained">
                        <Button onClick={formSubmitHandler}>Update Password</Button>
                    </ButtonGroup></div>}
        </>
    )
}

export default UpdatePassword;