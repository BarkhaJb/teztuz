import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import '../css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSteps from '../components/payment/PaymentForm';

const Payments = () => {
    useEffect(() => {}, []);

    return (
        <>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>

            <div className="gradient pd-50 payments">
                <Container>
                    <PaymentSteps />
                </Container>
                <div className="footer-home">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Payments;
