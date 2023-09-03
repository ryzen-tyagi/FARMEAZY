import '../pages/PaymentForm.css';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
   useStripe, 
   useElements
  } from "@stripe/react-stripe-js";
  
  import React,{ useContext,useState, useEffect } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faCreditCard, faCalendar, faLock } from '@fortawesome/free-solid-svg-icons'; // Correct import
  import { CartContext } from '../CartContext';
  import axios from 'axios';
  import { useHistory, Link } from "react-router-dom"




  const CheckoutPage=()=>{
    const history=useHistory();
    const [paymentResult, setPaymentResult] = useState('');
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);
  console.log(cart.amount);
  const stripe = useStripe();
  const elements = useElements();
  const handlePayment= async(e)=>{
  e.preventDefault();
  const response = await axios.post(
          `/create-payment-intent`,
          {
            amount: cart.amount*100,

            currency: 'inr',
          },
        );
  if (response.status === 200){
    console.log("yes");
    try{
  const confirmPayment = await stripe.confirmCardPayment(
            response.data.clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardNumberElement),
              },
            }
          );
          
          console.log(confirmPayment); 
  if(confirmPayment.paymentIntent.status === "succeeded"){
    setPaymentResult('Payment confirmed');
    setCart({});
    elements.getElement(CardNumberElement).clear();
    elements.getElement(CardExpiryElement).clear();
    elements.getElement(CardCvcElement).clear();
   console.log('payment confirmed');
   alert("Order Successful");
   history.push('/');
  }
  }
  catch
  {
    alert("ADD Details");
  }
  }}
  return (
  
<div className="payment-container">
<div className="payment-form">
  <h2><FontAwesomeIcon icon={faCreditCard} /> Secure Payment</h2>
  <form onSubmit={handlePayment}>
    <div className="card-element">
      <label className="card-label"><FontAwesomeIcon icon={faCreditCard} /> Card Number</label>
      <CardNumberElement className="card-input" />
    </div>
    <div className="card-row">
      <div className="card-element">
        <label className="card-label"><FontAwesomeIcon icon={faCalendar} /> Expiration Date</label>
        <CardExpiryElement className="card-input" />
      </div>
      <div className="card-element">
        <label className="card-label"><FontAwesomeIcon icon={faLock} /> CVC</label>
        <CardCvcElement className="card-input" />
      </div>
    </div>
    <button className="card-button">Confirm Payment</button>
  </form>
</div>
<div className="payment-result">{paymentResult}</div>
</div>




  )}
 
  export default CheckoutPage;

