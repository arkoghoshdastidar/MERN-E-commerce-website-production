import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { getAllAdminProducts } from '../../actions/productActions';
import { getAllOrders, clearErrors } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userActions';
import { useAlert } from 'react-alert';

const Dashboard = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const role = (user === undefined) ? undefined : user.user === undefined ? undefined : user.user.role;
    const { products } = useSelector(state => state.products);
    const { orderDetails, oLoading, oError } = useSelector(state => state.allOrders);
    const { userDetails, uLoading, uError } = useSelector(state => state.allUsers);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        dispatch(getAllAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [navigate, isAuthenticated, dispatch]);

    if (role !== 'admin') {
        navigate('/login');
    }

    if(oError){
        alert.show(oError);
        dispatch(clearErrors());
    }

    if(uError){
        alert.show(uError);
        dispatch(clearErrors());
    }

    return (
        <>
            {loading || uLoading || uLoading === undefined || oLoading || loading===undefined || oLoading===undefined ? <Loader /> : <>
                <div className={styles['dashboard']}>
                    <Sidebar />
                    <div className={styles['details-board']}>
                        <h1>Welcome Back To The Dashboard</h1>
                        <div className={styles['total-amount']}>Total ₹{Math.round(orderDetails.totalAmount)}</div>
                        <div className={styles['summary']}>
                            <div>Products <br/> <span>{products.length}</span></div>
                            <div>Users <br/> <span>{userDetails.users.length}</span></div>
                            <div>Orders <br/> <span>{orderDetails.orders.length}</span></div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Dashboard;