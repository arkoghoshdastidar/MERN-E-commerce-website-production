import styles from './Shipping.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { saveShippingInfo } from '../../actions/cartAction';
import { Country, State, City } from 'country-state-city';
import { AiFillHome, AiFillPhone } from 'react-icons/ai';
import { BiMapPin } from 'react-icons/bi';
import { FaRoad } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im';
import { GrLocationPin } from 'react-icons/gr';
import Button from '@mui/material/Button';
import StepperCmp from './StepperCmp';

const Shipping = () => {
    const { isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { shippingInfo } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            alert.info('You must login to use to place order.');
        }
    }, [isAuthenticated, alert, navigate]);

    const formSubmitHandler = () => {
        if (!address || !address.trim().length ||
            !city || !city.trim().length ||
            !pinCode || !pinCode.trim().length ||
            !phoneNo || phoneNo.trim().length < 10 || phoneNo.trim().length > 10 || !state || !state.trim().length ||
            !country || !country.trim().length
        ) {
            alert.show('Invalid credentials, please fill the form correctly');
            return;
        } else {
            dispatch(saveShippingInfo({ address, city, state, country, phoneNo, pinCode }));
            navigate('/order/confirm');
        }
    }

    return (
        <div className={styles['order-container']}>
            <StepperCmp activeIndex={0} />
            <div>
                <AiFillHome />
                <input
                    type="text"
                    value={address}
                    placeholder='Address'
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <FaRoad />
                <input
                    type="number"
                    value={pinCode}
                    placeholder='Pincode'
                    onChange={(e) => setPinCode(e.target.value)}
                />
            </div>
            <div>
                <AiFillPhone />
                <input
                    type="number"
                    placeholder='Phone Number'
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                />
            </div>
            <div>
                <BiMapPin />
                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="">Country</option>
                    {
                        Country.getAllCountries().map((c) => {
                            return <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                        })
                    }
                </select>
            </div>
            {country && <div>
                <ImLocation2 />
                <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="">State</option>
                    {
                        State.getStatesOfCountry(country).map((c) => {
                            return <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                        })
                    }
                </select>
            </div>}
            {state && <div>
                <GrLocationPin />
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    <option value="">City</option>
                    {
                        City.getCitiesOfState(country, state).map((c) => {
                            return <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                        })
                    }
                </select>
            </div>}
            <div>
                <Button variant="contained" size={window.innerWidth < 600 ? "small" : "medium"} onClick={formSubmitHandler}>Continue</Button>
            </div>
        </div>
    )
}

export default Shipping;