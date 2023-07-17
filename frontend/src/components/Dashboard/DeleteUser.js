import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { deleteUser, clearError } from '../../actions/userActions';

const DeleteUser = () => {
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isDeleted, error} = useSelector(state => state.userDeleted);
    const userID = params.userID;

    useEffect(() => {
        dispatch(deleteUser(userID));
    }, [dispatch, userID]);

    if(isDeleted === true){
        alert.success('User deleted successfully');
        navigate('/admin/users');
    }

    if(error){
        alert.show(error);
        dispatch(clearError());
        navigate('/admin/users');
    }

    return (
        <>
            {
                loading?<Loader /> : <div>Deleting...</div>
            }
        </>
    )
}

export default DeleteUser;