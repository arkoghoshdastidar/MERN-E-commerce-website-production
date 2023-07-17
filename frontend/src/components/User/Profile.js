import styles from './Profile.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/layout/Loader/Loader';
import Button from '@mui/material/Button';

const Profile = () => {
    const navigate = useNavigate();
    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <h2>My Profile</h2>
                    <div className={styles['my-profile-container']}>
                        <div className={styles['my-profile-details']}>
                            <div>
                                <strong>Name : </strong><span>{user.user.name}</span>
                            </div>
                            <div>
                                <strong>Email : </strong><span>{user.user.email}</span>
                            </div>
                            <div>
                                <strong>Joined At : </strong><span>{(user.user.createdAt).substr(0, 10)}</span>
                            </div>
                        </div>
                        <div className={styles['button-container']}>
                            <Button onClick={() => navigate('/me/update')} variant="contained">Edit Profile</Button>
                            <Button onClick={() => navigate('/orders')} variant="contained">My Orders</Button>
                            <Button onClick={() => navigate('/password/update')} variant="contained">Update Password</Button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Profile;