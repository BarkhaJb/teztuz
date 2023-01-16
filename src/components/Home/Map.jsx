import React, { useState } from 'react';
import { Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/main.css';
const Map = () => {
    const [teztCheck, setTeztCheck] = useState(true);
    return (
        <div className="position-relative">
            <section id="map" className="position-relative" style={teztCheck ? { filter: 'opacity(0.5)' } : null}>
                <div className="Map-section heightvh">
                    <div className="conne">
                        <Container style={{ maxWidth: '1280px' }}></Container>
                        <div className="bot-connect">
                            <Container className="p-0" style={{ width: '90%' }}>
                                <Row className="hero-row1">
                                    <Col sm={3} className="text-left conect-block ps-md-5">
                                        <h2>
                                            <b>Connect</b>
                                        </h2>
                                        <Link to="/signup" className="d1">
                                            <Button className="globelbtn">Find Users</Button>
                                        </Link>
                                    </Col>
                                    <Col sm={9} className="text-left m-auto">
                                        <h6 style={{ lineHeight: '25px', paddingTop: '10px' }}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consectetur adipisicing mollit nsectetur adipisicing elit. Maxime mollitiia, molestiae quas
                                            vel sint commodi repudiandae
                                        </h6>
                                        <Link to="/signup" className="d2">
                                            <Button className="globelbtn">Find Users</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </section>
            {teztCheck ? (
                <div className="checktztmain">
                    <div className="checktezt" style={{ fontWeight: '600' }}>
                        <p className="m-auto">Connect with users to obtain important academic resources. Available soon.</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Map;
