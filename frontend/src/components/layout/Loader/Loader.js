import styles from './loader.module.css';

const Loader = () => {
    return (
        <div className={styles['loader']}>
            <div className={styles['spinner']}></div>
            <span>Loading...</span>
        </div>
    )
}

export default Loader;