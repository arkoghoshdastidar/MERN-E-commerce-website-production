import styles from './Footer.module.css';
import { BsLinkedin } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const date = new Date().getFullYear();
    const navigate = useNavigate();
    return (
        <div className={styles['footer']}>
            <div className={styles['address']}>
                B/24 Netajee Nagar Kantatoli Colony Ranchi Jharkhand - 834001
            </div>
            <div className={styles['feedback']}>
                <textarea placeholder='Do you have any feedback?'></textarea>
            <   button onClick={() => navigate('/')} variant="text">Submit</button>
            </div>
            <div>
                All rights reserver <AiOutlineCopyrightCircle /> {date}
            </div>
            <Link to='https://www.linkedin.com/in/arko-ghosh-dastidar-93a792202/' target="_blank">
                < BsLinkedin className={styles['contact-link']} />
            </Link>
            <Link to='mailto:arkoghoshdastidar392000@gmail.com' target="_blank">
                < CgMail className={styles['contact-link']} />
            </Link>
        </div>
    );
}

export default Footer;