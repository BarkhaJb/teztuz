import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ success }) => {
    const stripe = useStripe();
    const elements = useElements();

    localStorage.setItem('key', 'kkk');
    useEffect(() => {}, []);

    return (
        <>
            <CardElement options={{ hidePostalCode: true }} />
        </>
    );
};

const stripePromise = loadStripe('pk_test_51JiNWfDOBhMmR48rP4XHaOMjkusiKRuenK3B55irX0TCHOkW6mAwBNsxG186uIQOLnVCz8qC5qmxFRC1GatZYVf100y95KV74z');

const PaymentOption = () => {
    const [status, setStatus] = React.useState('ready');

    if (status === 'success') {
        return <div>Congrats on your Payment!</div>;
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm
                success={() => {
                    setStatus('success');
                }}
            />
        </Elements>
    );
};

export default PaymentOption;
