import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import webFont from 'webfontloader';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import { getProducts } from './actions/productActions.js';
import { useDispatch } from 'react-redux';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Search/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { loadUser } from './actions/userActions';
import Profile from './components/User/Profile';
import EditProfile from './components/User/EditProfile';
import UpdatePassword from './components/User/UpdatePassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import Order from './components/Order/Order';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/Dashboard/ProductList';
import CreateProduct from './components/Dashboard/CreateProduct';
import DeleteProduct from './components/Dashboard/DeleteProduct';
import DeleteUser from './components/Dashboard/DeleteUser';
import UserList from './components/Dashboard/UserList';
import OrderList from './components/Dashboard/OrderList';
import ShipOrder from './components/Dashboard/ShipOrder';
import About from './components/layout/About';
import Contact from './components/layout/Contact';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6119e6',
    }
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    webFont.load({
      google: {
        'families': ['Roboto',]
      }
    });
    
    dispatch(loadUser());
    dispatch(getProducts());
  }, [dispatch]);
    
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="view-port">
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/About' element={<About />}></Route>
            <Route path='/Contact' element={<Contact />}></Route>
            <Route path='/product/:id' element={<ProductDetails />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/products/:keyword' element={<Products />}></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/login' element={<LoginSignup />}></Route>
            <Route path='/account' element={<Profile />}></Route>
            <Route path='/me/update' element={<EditProfile />}></Route>
            <Route path='/password/update' element={<UpdatePassword />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/shipping' element={<Shipping />}></Route>
            <Route path='/order/confirm' element={<ConfirmOrder />}></Route>
            <Route path='/process/checkout' element={<Payment />}></Route>
            <Route path='/orders' element={<Order />}></Route>
            <Route path='/orders/:orderID' element={<OrderDetails />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/admin/all/products' element={<ProductList />}></Route>
            <Route path='/admin/create/product' element={<CreateProduct />}></Route>
            <Route path='/delete/product/:productID' element={<DeleteProduct />}></Route>
            <Route path='/edit/product/:productID' element={<CreateProduct />}></Route>
            <Route path='/admin/users' element={<UserList />}></Route>
            <Route path='/admin/orders' element={<OrderList />}></Route>
            <Route path='/delete/user/:userID' element={<DeleteUser />}></Route>
            <Route path='/admin/shipOrder/:orderID' element={<ShipOrder />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;