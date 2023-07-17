import { useSelector, useDispatch } from 'react-redux';
import { getParticularOrderDetails, clearErrors, updateOrderStatus } from '../../actions/orderAction';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';

const ShipOrder = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { data, loading, error } = useSelector(state => state.particularOrder);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getParticularOrderDetails(params.orderID));
    }, [dispatch, params]);

    if(data !== undefined){
        const orderDetails = data.orderDetails;
        const productDetails = data.productDetails;

        for(let i=0; i<orderDetails.orderItems.length; i++){
            let index = -1;
            for(let j=0; j<productDetails.length; j++){
                if(orderDetails.orderItems[i].product == productDetails[j]._id){
                    index = j;
                    break;
                }
            }
            if((index === -1) || (index !== -1 && orderDetails.orderItems[i].quantity > productDetails[index].stock)){
                // cancel order
                dispatch(updateOrderStatus(params.orderID, {
                    status: "Cancelled"
                }));
                navigate('/dashboard');
            }
        }
        // ship order
        dispatch(updateOrderStatus(params.orderID, {
            status: "Delivered"
        }));
        navigate('/dashboard');
    }

    if(error){
        alert.show('Unable to ship order');
        navigate('/dashboard');
        dispatch(clearErrors());
    }

    return (
        <>
            {(loading) ? <Loader /> : <div>ShippingOrder</div>}
        </>
    )
}

export default ShipOrder;