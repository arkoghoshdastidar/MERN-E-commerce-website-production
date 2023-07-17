import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { getAllAdminProducts, clearError } from '../../actions/productActions';
import { useAlert } from 'react-alert';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';

const Dashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const role = (user === undefined) ? undefined : user.user === undefined ? undefined : user.user.role;
    const { pLoading, products, error } = useSelector(state => state.products);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        dispatch(getAllAdminProducts());
    }, [navigate, isAuthenticated, dispatch]);

    if (role !== 'admin') {
        navigate('/login');
    }

    if(error) {
        alert.show(error);
        dispatch(clearError());
    }

    const editProduct = (productID) => {
        navigate('/edit/product/' + productID);
    }
    
    const deleteProduct = (productID) => {
        navigate('/delete/product/'+productID);
    }

    return (
        <>
            {loading || pLoading ? <Loader /> : <>
                <div className={styles['dashboard']}>
                    <Sidebar />
                    <div className={styles['details-board']}>
                        <h1>Products List Component</h1>
                        <div className={styles['all-products-container']}>
                            <div className={styles['products']}>
                                <div>ProductID</div>
                                <div>Name</div>
                                <div>Stock</div>
                                <div>Price</div>
                                <div>Action</div>
                            </div>
                            {
                                products.map(product => {
                                    return (
                                        <div key={product._id} className={`${styles['products']} ${styles['hide-bg']}`}>
                                            <div className={styles['']}>{product._id}</div>
                                            <div>{product.name}</div>
                                            <div>{product.stock}</div>
                                            <div>₹{product.price}</div>
                                            <div>
                                                <span
                                                onClick={() => editProduct(product._id)}
                                                className={styles['edit-btn']}><AiOutlineEdit /></span>
                                                <span className={styles['delete-btn']}
                                                    onClick={() => deleteProduct(product._id)}
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