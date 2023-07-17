import styles from './center.module.css';

const Contact = () => {
    return (
        <>
            <h1 className={styles['heading']}>About Us</h1>
            <div className={`${styles['center']}`}>
                <p>
                    At E-commerce, we are passionate about delivering a seamless online shopping experience that combines convenience, quality, and exceptional customer service. Whether you're searching for the latest fashion trends, electronics, home decor, or everyday essentials, we've got you covered.
                </p>

                <p>Thank you for choosing E-commerce. We look forward to serving you and providing you with an exceptional online shopping experience. Happy shopping!</p>
            </div></>
    )
}

export default Contact;