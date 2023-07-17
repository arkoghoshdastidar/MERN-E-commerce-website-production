import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
    return (
        <div className={styles['header']}>
            <div className={styles['container']}>
                <Link className={styles['navlink']} to='/'>Home</Link>
                <Link className={styles['navlink']} to='products'>Products</Link>
                <Link className={styles['navlink']} to='contact'>Contact</Link>
                <Link className={styles['navlink']} to='about'>About</Link>
            </div>

            <div className={styles['container']}>
                <Link className={styles['navlink']} to='search'><BsSearch /></Link>
                <Link className={styles['navlink']} to='cart'><AiOutlineShoppingCart /></Link>
                <Link className={styles['navlink']} to='login'><VscAccount /></Link>
            </div>
        </div>
    );
}

export default Header;