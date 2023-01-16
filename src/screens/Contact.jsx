import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import ContactForm from '../components/Contact/ContactForm';
const Contact = () => {
    return (
        <>
            <div>
                <div className="">
                    <div className="Header" id="SignuP">
                        <Container>
                            <Header />
                        </Container>
                    </div>
                    <div className="gradient contactpage">
                        <Container style={{ maxWidth: '1000px' }} className="contact">
                            <div className="">
                                <h1 className="text-white text-center my-4 pt-3">Contact</h1>
                                <ContactForm />
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
