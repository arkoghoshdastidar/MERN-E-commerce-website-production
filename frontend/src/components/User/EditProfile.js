import styles from './editProfile.module.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { clearError, editProfile, loadUser, resetProfile } from '../../actions/userActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const EditProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const { isAuthenticated } = useSelector(state => state.user);
    const { error, isUpdated, loading, updatedUser } = useSelector(state => state.profile);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (error) {
        alert.show(error.message);
        dispatch(clearError());
    }

    if (isUpdated) {
        alert.info(`Updated user name : ${updatedUser.user.name} and email : ${updatedUser.user.email}`);
        dispatch(loadUser());
        dispatch(resetProfile());
    }

    const formSubmitHandler = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        if (!name.trim().length || !email.trim().length) {
            alert.info('Enter name/email to update');
        } else {
            dispatch(editProfile(name, email));
        }
        nameRef.current.value = '';
        emailRef.current.value = '';
    }

    return (
        <>
            {loading ? <Loader /> : <div className={styles['edit-profile-container']}>
                <form>
                    <div>
                        <label>Name</label>
                        <input ref={nameRef} type="text" name="name" placeholder="example" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input ref={emailRef} type="email" name="email" placeholder="example@example.com" />
                    </div>
                </form>
                <ButtonGroup variant="contained">
                    <Button onClick={formSubmitHandler}>Update Profile</Button>
                </ButtonGroup></div>}
        </>
    )
}

export default EditProfile;