import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import SignupForm from '../components/Signup/SignupForm';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
const Signup = () => {
    return (
        <>
            <div>
                <div className="Header" id="SignuP">
                    <Container>
                        <Header />
                    </Container>
                </div>

                <div>
                    <Container fluid className="signup-content">
                        <Row className="rowss">
                            <Col xs={12} md={7} className="form-col">
                                <div className="form-block">
                                    <h1 className="text-white text-center my-5 pt-md-2 mb-2">SIGN UP</h1>
                                    <SignupForm />
                                </div>
                            </Col>
                            <Col xs={12} md={5} className="signup-text-block">
                                <div className="content-block">
                                    <div>
                                        <p className="text-center">
                                            <img src="../assets/new/signintarget.png" style={{ maxWidth: '200px' }} className="" alt="teztus" />
                                        </p>
                                        <h3 className="mb-4">
                                            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                                        </h3>
                                        <p className="border-block">Lorem ipsum dolor sit amet consectetur adipisi s cum aliquid doloribus, accusantiu</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Signup;
