import { Container, Row, Col } from 'react-bootstrap';
import React, { useEffect } from 'react';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import Refer_Freind from '../components/referals/Refer_Freind';
import Progress from '../components/referals/Progress';
import { useNavigate } from 'react-router-dom';
const Referals = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
    }, []);
    return (
        <div>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>
            <div className="referals">
                <Container fluid style={{ minHeight: '100vh' }} className="m-0 p-0">
                    <Row>
                        <Col xs={12} md={4} style={{ zIndex: '10' }}>
                            <Progress />
                        </Col>
                        <Col xs={12} md={8} className="px-sm-2">
                            <Refer_Freind />
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* <div className="bg-dark">
                <Footer />
            </div> */}
        </div>
    );
};

export default Referals;
