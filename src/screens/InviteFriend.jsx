import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { useNavigate } from 'react-router-dom';
import Invite from '../components/Study/Invite';
const InviteFriend = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="">
                <div className="Header" id="SignuP">
                    <Container>
                        <Header />
                    </Container>
                </div>
            </div>
            <div className="questionsection " style={{ minHeight: '100vh' }}>
                <Container className="pt-5">
                    <p className="backbtn" onClick={() => navigate(-1)}>
                        <img src="../assets/leftt.svg" alt="go back" />
                    </p>
                    <p>
                        <Invite />
                    </p>
                </Container>
            </div>
            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default InviteFriend;
