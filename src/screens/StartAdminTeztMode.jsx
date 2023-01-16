import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import TeztMode from '../components/Study/TeztMode';
import TeztAdminMode from '../components/Study/TeztAdminMode';
const StartAdminTeztMode = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const dataAdminTezt = location.state;

    console.log('data admintezt', dataAdminTezt);

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
                        <TeztAdminMode dataAdminTezt={dataAdminTezt} />
                    </div>
                </Container>
            </div>
            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default StartAdminTeztMode;
