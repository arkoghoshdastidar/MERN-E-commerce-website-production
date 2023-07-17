import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { getAllUsers, clearError } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { AiOutlineDelete } from 'react-icons/ai';

const Dashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const role = (user === undefined) ? undefined : user.user === undefined ? undefined : user.user.role;
    const { uLoading, userDetails, uError } = useSelector(state => state.allUsers);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        dispatch(getAllUsers());
    }, [navigate, isAuthenticated, dispatch]);

    if (role !== 'admin') {
        navigate('/login');
    }

    if(uError) {
        alert.show(uError);
        dispatch(clearError());
    }
    
    const deleteUser = (userID) => {
        navigate('/delete/user/'+userID);
    }

    return (
        <>
            {loading || uLoading || (uLoading === undefined) ? <Loader /> : <>
                <div className={styles['dashboard']}>
                    <Sidebar />
                    <div className={styles['details-board']}>
                        <h1>Products List Component</h1>
                        <div className={styles['all-products-container']}>
                            <div className={styles['products']}>
                                <div>UserID</div>
                                <div>Name</div>
                                <div>Email</div>
                                <div>Role</div>
                                <div>Action</div>
                            </div>
                            {
                                userDetails.users.map(user => {
                                    return (
                                        <div key={user._id} className={`${styles['products']} ${styles['hide-bg']}`}>
                                            <div className={styles['']}>{user._id}</div>
                                            <div>{user.name}</div>
                                            <div>{user.email}</div>
                                            <div>{user.role}</div>
                                            <div>
                                                <span className={styles['delete-btn']}
                                                    onClick={() => deleteUser(user._id)}
                                                ><AiOutlineDelete/></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Dashboard;