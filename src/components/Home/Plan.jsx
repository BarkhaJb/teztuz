import React from 'react';
import { Button, Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import '../../css/main.css';
const Plan = () => {
    return (
        <div>
            <section id="plan">
                <div className="plan-section heightvh">
                    <div className="signup-form">
                        <Container>
                            <Row className="hero-row1 plan">
                                <h4 className="text-white mb-5">
                                    <b>Plan</b>
                                </h4>
                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                    <Row>
                                        <Col sm={4} md={4}>
                                            <p className="text-white">Lorem ipsum, dolor sit amet Impedit totam mollitia debitis nam quae cum earum tempora beatae.</p>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">Set Tasks and Reminders</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Plan Your Grades</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="third">Track Your Graduation status</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={8} md={8} className>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <p className="text-white tabp">
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi qui possimus eveniet animi, mollitia at similique recusandae amet consectetur
                                                        adipisicing elit. Nisi qui possimus eveniet animi, mollitia at similique minus molestias id fuga labor
                                                    </p>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <p className="text-white tabp">
                                                        Lorem ipsum dolor, sit amet r adipisicing elit. Nisi qui possimus eveniet animi, mollitia at similique recusandae minus molestias id Nisi qui
                                                        possimus eveniet animi, mollitia at similiquefuga labor
                                                    </p>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="third">
                                                    <p className="text-white tabp">
                                                        Lorem ipsum dolomet Nisi qui possimus eveniet animi, mollitia at similique recusandae minus molestias id fuga consectetur adipisicing elit. Nisi
                                                        qui possimus eveniet animi, mollitia at similique recusandae minus molestias id fuga labor
                                                    </p>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Plan;
