//// cart sayfasından checkout sayfasına ulaşıp, checkout detaylarını girip, proceed to checkout a bastığımızda karşımıza çıkan iki card a sahip check out componenti. checkoutsummary componenti de ayrı bir dosyada oluşturulmuştur.
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss"
import { toast } from "react-toastify";
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from "../../assets/spinner.gif"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID)
  const userEmail = useSelector(selectEmail)
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const shippingAddress = useSelector(selectShippingAddress)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    

    if(!stripe || !elements) {
      return;
    }

    setIsLoading(true)

    const confirmPayment = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })
      .then((result) => {
        if(result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if(result.paymentIntent) {
          if(result.paymentIntent.status === "succeeded") {
            setIsLoading(false)
            toast.success("Payment successful")
            saveOrder();
          }
        }
      })
      setIsLoading(false)
  }

  const saveOrder = () => {
    // toast.success("Successfully save order")
    const today = new Date();
    // tarih bilgisi
    const date = today.toDateString()
    //saat bilgisini içeriyor
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate()
    };
    try {
      addDoc(collection(db,"orders"), orderConfig);
      toast.success("Order saved")
      dispatch(CLEAR_CART())
      navigate("/checkout-success")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary/>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id={styles["payment-element"]} options={paymentElementOptions}/>
                <button disabled={isLoading || !stripe || !elements} type="submit" className={styles.button}>
                  <span>
                    {isLoading ? (
                      <img src={spinnerImg} alt="Loading..." style={{width: "20px"}}/>
                    ) : "Pay Now" }
                  </span>
                </button>
                {message && <div id={styles["payment-message"]}>{message}</div>}
              
            </Card>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CheckoutForm