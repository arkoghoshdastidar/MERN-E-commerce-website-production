import styles from './Order.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMyOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import NoReview from '../Product/NoReview';
import Pagination from '@mui/material/Pagination';
import OrderItem from './OrderItem';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading } = useSelector(state => state.myOrders);
    const { isAuthenticated } = useSelector(state => state.user);
    let myOrders = [];
    const [currPageNo, setCurrPageNo] = useState(1);
    const ordersPerPage = 10;

    orders.forEach(order => {
        order.orderItems.forEach(item => {
            myOrders = [...myOrders, {
                item: item,
                orderID: order._id,
                status: order.orderStatus,
            }]
        })
    });

    myOrders.sort((a, b) => {
        if((a.status === b.status && a.status === 'Processing') || (a.status === b.status && a.status === 'Delivered')){
            return -1;
        }else if(a.status === 'Processing' && b.status === 'Delivered'){
            return -1;
        }else if(a.status === 'Delivered' && b.status === 'Processing'){
            return +1;
        }
        return -1;
    });

    useEffect(() => {
        if(!isAuthenticated) {
            return navigate('/login');
        }
        dispatch(getMyOrders());
    }, [dispatch, isAuthenticated, navigate]);

    if (myOrders.length === 0) {
        return <NoReview text={"No Order's"} />
    }

    const pageChangeHandler = (e, pageNo) => {
        setCurrPageNo(pageNo);
    }

    const pageItems = [];

    for (let i = ordersPerPage * (currPageNo - 1); i < myOrders.length && i < ordersPerPage * currPageNo; i++) {
        pageItems.push(myOrders[i]);
    }

    const heading = {
        orderID: 'OrderID',
        click: false,
        status: 'Status',
        item: {
            quantity: 'Quantity',

        }
    };

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <div className={styles['items-container']}>
                            <OrderItem item={heading}/>
                            {
                                pageItems.map((i) => {
                                    return <OrderItem key={i.item.productID} item={i} />
                                })
                            }
                        </div>
                        <div className={styles['pagination-container']}>
                            {
                                (Math.ceil(myOrders.length / ordersPerPage) > 1) && 
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(myOrders.length / ordersPerPage)}
                                    page={currPageNo}
                                    onChange={pageChangeHandler}
                                />
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Order;