import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { deleteProduct, clearError } from '../../actions/productActions';

const DeleteProduct = () => {
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isDeleted, error} = useSelector(state => state.productDeleted);
    const productID = params.productID;

    useEffect(() => {
        dispatch(deleteProduct(productID));
    }, [dispatch, productID]);

    if(isDeleted === true){
        alert.success('Product deleted successfully');
        navigate('/admin/all/products');
    }

    if(error){
        alert.show(error);
        dispatch(clearError());
        navigate('/admin/all/products');
    }

    return (
        <>
            {
                loading?<Loader /> : <div>Deleting...</div>
            }
        </>
    )
}

export default DeleteProduct;