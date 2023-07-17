import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { getAllOrders, clearErrors } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import { AiOutlineEdit } from 'react-icons/ai';

const Dashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const role = (user === undefined) ? undefined : user.user === undefined ? undefined : user.user.role;
    const {oLoading, orderDetails, error } = useSelector(state => state.allOrders);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        dispatch(getAllOrders());
    }, [navigate, isAuthenticated, dispatch]);

    if (role !== 'admin') {
        navigate('/login');
    }

    if(error) {
        alert.show(error);
        dispatch(clearErrors());
    }

    const shipOrder = (orderID) => {
        navigate('/admin/shipOrder/'+orderID);
    }

    return (
        <>
            {loading || oLoading ? <Loader /> : <>
                <div className={styles['dashboard']}>
                    <Sidebar />
                    <div className={styles['details-board']}>
                        <h1>Products List Component</h1>
                        <div className={styles['all-products-container']}>
                            <div className={styles['products']}>
                                <div>OrderID</div>
                                <div>Amount</div>
                                <div>Status</div>
                                <div>Order Date</div>
                                <div>Ship Order</div>
                            </div>
                            {
                                orderDetails.orders.map(order => {
                                    return (
                                        <div key={order._id} className={`${styles['products']} ${styles['hide-bg']}`}>
                                            <div className={styles['']}>{order._id}</div>
                                            <div>₹{order.totalPrice}</div>
                                            <div>{order.orderStatus}</div>
                                            <div>{
                                                ((order.createdAt).slice(0,19)).replace('T', '::')
                                            }</div>
                                            <div>
                                                <span
                                                onClick={() => shipOrder(order._id)}
                                                className={styles['edit-btn']}><AiOutlineEdit /></span>
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