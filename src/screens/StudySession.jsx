import React from 'react';
import { Container, Button } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { useNavigate, useParams } from 'react-router-dom';
import StudyMode from '../components/Signup/StudyMode';
const StudySession = () => {
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
                    <Container>
                        <p className="backbtn" onClick={() => navigate(-1)}>
                            <Button type="submit" className="exit">
                                Exit
                            </Button>
                        </p>
                        <StudyMode />
                    </Container>
                </Container>
            </div>
            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default StudySession;
