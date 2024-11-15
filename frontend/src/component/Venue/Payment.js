import React from 'react';
import "./Payment.css";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Typography } from "@material-ui/core";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useAlert } from "react-alert"
import { useEffect } from 'react';
import { clearErrors, newEvent } from '../../actions/eventAction';

const Payment = ({ history }) => {
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const alert = useAlert();
    const dispatch = useDispatch();

    const { timeInfo, cartItems } = useSelector((state) => state.cart);
    const { catItems } = useSelector((state) => state.cat);
    const { decoItems } = useSelector((state) => state.deco);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newEvent);

    const paymentData = {
        amount: Math.round((timeInfo.total + timeInfo.tax) *100 ),
    }
    const event = {
        numOfGuest: timeInfo.guest,
        totalPrice:timeInfo.total,
        taxPrices:timeInfo.tax,
        funcType:timeInfo.decoType,
        eventAt:timeInfo.selectedDate,
        timeSlot:timeInfo.selectedTime,
        venueAddedBy:cartItems[0].user,
        venue:cartItems[0].venue,
        venuePrice:cartItems[0].price,
        venueName:cartItems[0].name,
        venueAddress:cartItems[0].address,
        decoType:decoItems[0].type,
        decoPrice:decoItems[0].price,
        catType:catItems[0].type,
        catPrice:catItems[0].price
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            )

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    event.paymentInfo= {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(newEvent(event));

                    history.push("/login?redirect=success");
                }
                else{
                    alert.error("There's some issue while processing payment");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }


    },[dispatch,error,alert])

    return (
        <div className='paymentContainer'>
            <form className="paymentForm" onSubmit={submitHandler}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className="paymentInput" />
                </div>
                <div>
                    <EventIcon />
                    <CardExpiryElement className="paymentInput" />
                </div>
                <div>
                    <VpnKeyIcon />
                    <CardCvcElement className="paymentInput" />
                </div>
                <button className="paymentFormBtn" type="submit" ref={payBtn} disabled={!stripe || !elements}>
                    {`pay - ${timeInfo && timeInfo.total + timeInfo.tax}`}
                </button>
            </form>
        </div>
    );
};


export default Payment;
