import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ProductsPage from './pages/ProductsPage';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CheckoutPage from './components/CheckoutPage';
import Login from './pages/Login';
import Predict from './pages/Predict';
import SignUp from './pages/SignUp';
import { CartContext } from './CartContext';
import { useEffect, useState } from 'react';
import { getCart, storeCart } from './helpers';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(`pk_test_51NfOrPSFb4QFkH2teCorgOsYSfgpMHdTwfAW70hDrnShClmWN7ulLWGN8PH7kDnK1AvwvkZhT7Lc35Z7Dhu3OQ1A00hEzfjQQ8`);

const App = () => {
const [ cart, setCart ] = useState({});
// Fetch cart from local storage
useEffect(() => {
  getCart().then(cart => {
    setCart(JSON.parse(cart));
  });
}, []);

useEffect(() => {
    storeCart(JSON.stringify(cart));
}, [cart]);

    return (
        <>
            <Router>
                <CartContext.Provider value={{ cart, setCart }}>
                    <Navigation />
                    <Switch>
                            <Route path="/" component={Home} exact></Route>
                            <Route path="/about" component={About}></Route>
                            <Route path="/products" exact component={ProductsPage}></Route>
                            <Route path="/login"  component={Login}></Route>
                            <Route path="/signup"  component={SignUp}></Route>
                            <Route path="/products/:_id" component={SingleProduct}></Route>
                            <Route path="/cart" component={Cart}></Route>
                            <Route path="/predict" component={Predict}></Route>

                            <Elements stripe={stripePromise}>
                            <Route path="/checkout"  component={CheckoutPage}></Route>
                              
                                </Elements>

                    </Switch>

               
                    <Footer/>
               </CartContext.Provider>
            </Router>
        </>
    )
}

export default App;