import styles from './center.module.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <h1 className={styles['heading']}>Contact Us</h1>
            <div className={`${styles['contact']}`}>
                <input type="email" placeholder='your email id'></input>
                <textarea placeholder="what problem are you facing?"></textarea>
                <Button onClick={() => navigate('/')} variant="contained">Submit</Button>
            </div>
        </>
    )
}

export default Contact;