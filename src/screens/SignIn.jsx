import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignInForm from '../components/Signup/SignInform';
import '../css/main.css';
import Header from '../Layouts/Header';
const SignIn = () => {
    return (
        <>
            <div>
                <div className="">
                    <div className="Header" id="SignuP">
                        <Container>
                            <Header />
                        </Container>
                    </div>
                    <Container fluid className="signup-content">
                        <Row className="rowss">
                            <Col xs={12} md={7} className="form-col">
                                <div className="form-block">
                                    <h1 className="text-white text-center my-4">SIGN IN</h1>
                                    <SignInForm />
                                </div>
                            </Col>
                            <Col xs={12} md={5} className="signup-text-block">
                                <div className="content-block">
                                    <div>
                                        <p className="text-center">
                                            <img src="../assets/new/signintarget.png" style={{ maxWidth: '200px' }} alt="teztus" />
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
            {/* <div className="bg-dark">
                <Footer />
            </div> */}
        </>
    );
};

export default SignIn;
