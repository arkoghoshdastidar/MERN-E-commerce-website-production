import styles from './Carousel.module.css';

const Carousel = ( {images, index} ) => {
    return (
        <div className={styles['carousel']}>
            <img src={images[index].url} alt="product" />
        </div>
    )
}

export default Carousel;