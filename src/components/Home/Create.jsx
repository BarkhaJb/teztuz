import React from 'react';
import { Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import '../../css/main.css';
const Create = () => {
    return (
        <div>
            <section id="create">
                <div className="Hero-section heightvh">
                    <Container>
                        <Row className="hero-row1 createblock">
                            <Col sm={12} xs={12} md={7} className="hero-col-1 pe-md-5">
                                <Row className="">
                                    <Col xs={6} md={6} className="create-mid1">
                                        <ProgressBar now={60} />
                                        <ProgressBar now={60} className="mt-4 two-progress" />
                                    </Col>
                                    <Col xs={6} md={6} className="leftspacing">
                                        <ProgressBar now={60} className="three-progress" />
                                        <ProgressBar now={60} className="mt-4 four-progress" />
                                    </Col>
                                    <Row>
                                        <Col xs={6} md={6} className="create-mid">
                                            <div className="text-white py-4 mt-4 questions-1">
                                                <h6>Questions:</h6>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae</p>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={6} className="leftbdr">
                                            <div className="text-white py-4 mt-4 questions">
                                                <h6>Answer:</h6>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                            <Col sm={12} xs={12} md={5} className="hero-col-2 my-2">
                                <div className="createtxt">
                                    <h3>
                                        <b>Create</b>
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, onsectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
                                        repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eiu
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </div>
    );
};

export default Create;
