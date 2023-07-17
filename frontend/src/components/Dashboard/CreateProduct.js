import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { CATEGORIES } from '../../constants/global';
import Button from '@mui/material/Button';
import { createNewProduct } from '../../actions/productActions';

const Dashboard = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const role = (user === undefined) ? undefined : user.user === undefined ? undefined : user.user.role;
    const alert = useAlert();
    const productID = params.productID;
    const nameRef = useRef();
    const descRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const stockRef = useRef();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated, dispatch]);

    if (role !== 'admin') {
        navigate('/login');
    }

    const formSubmitHandler = () => {
        const name = nameRef.current.value.trim();
        const description = descRef.current.value.trim();
        let images = imageRef.current.value.trim();
        const stock = Number(stockRef.current.value);
        const price = Number(priceRef.current.value);
        const category = categoryRef.current.value;

        if ((stock <= 0) || (name.length <= 0) || (description.length <= 0) || (images.length <= 0) || (category.length <= 0) || (price <= 0)) {
            alert.show('Missing/Incorrect Information');
            return;
        }
        images = images.split('~').map(image => {
            return {
                url: image
            }
        });

        const product = {
            name, price, description, category, images, stock
        }
        if(productID){
            dispatch(createNewProduct(product, productID));
        }else{
            dispatch(createNewProduct(product));
        }
        navigate('/products');

        nameRef.current.value = '';
        descRef.current.value = '';
        imageRef.current.value = '';
        stockRef.current.value = '';
        priceRef.current.value = '';
        categoryRef.current.value = '';
    }

    return (
        <>
            {loading ? <Loader /> : <>
                <div className={styles['dashboard']}>
                    <Sidebar />
                    <div className={styles['details-board']}>
                        <h1>{(productID) ? "Update" : "Create"} Product</h1>
                        <div className={styles['form-container']}>
                            <div>
                                <span>Name</span>
                                <input
                                    ref={nameRef}
                                    type="text"
                                    placeholder="product-name"
                                />
                            </div>
                            <div>
                                <span>Description</span>
                                <input
                                    ref={descRef}
                                    type="text"
                                    placeholder="product-description" />
                            </div>
                            <div>
                                <span>Stock</span>
                                <input
                                    ref={stockRef}
                                    type="number"
                                    placeholder="product-stock" />
                            </div>
                            <div>
                                <span>Price</span>
                                <input
                                    ref={priceRef}
                                    type="number"
                                    placeholder="product-price" />
                            </div>
                            <div>
                                <span>Images</span>
                                <input
                                    ref={imageRef}
                                    type="text"
                                    placeholder="product-image-url" />
                            </div>
                            <div>
                                <span>Category</span>
                                <select ref={categoryRef}>
                                    <option value="">select-product-category</option>
                                    {
                                        CATEGORIES.map((category) => {
                                            return <option value={category}>{category}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            onClick={formSubmitHandler}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Dashboard;