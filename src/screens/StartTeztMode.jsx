import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { useNavigate } from 'react-router-dom';
import TeztMode from '../components/Study/TeztMode';
const StartTeztMode = () => {
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
                        <Button type="submit" className="exit">
                            Exit
                        </Button>
                    </p>
                    <div>
                        <TeztMode />
                    </div>
                </Container>
            </div>
            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default StartTeztMode;
