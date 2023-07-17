import styles from './search.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setKeyword(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim().length > 0){
            navigate('/products/' + keyword);
        }else{
            navigate('/products');
        }
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className={styles['form']}>
                <input onChange={onChangeHandler} className={styles['input']} type='text' placeholder='Search here...' ></input>
                <div>
                    <button className={styles['button']} type="submit">Search</button>
                </div>
            </form>
        </>
    )
}

export default Search;