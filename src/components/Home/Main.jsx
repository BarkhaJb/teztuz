import React, { useState } from 'react';
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/main.css';
import ReactPlayer from 'react-player';
const Main = () => {
    const [link, setLinks] = useState();
    const [modalShow, setModalShow] = useState();
    const [userName, setUserName] = useState('James');
    const Tutorial = (props) => {
        return (
            <>
                <Container fluid>
                    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <div className="player-wrapper">
                                <ReactPlayer url="../assets/chemistry.mp4" controls className="react-player" width="100%" height="100%" />
                            </div>
                        </Modal.Body>
                    </Modal>
                </Container>
            </>
        );
    };

    return (
        <div>
            <section id="Mainsection">
                <div className="Signup-section heightvh home-main">
                    <Container>
                        <Row className="hero-row1 home-signup">
                            <Col sm={12} md={7} className="text-left imgblock">
                                <img src="../assets/new/ezgifcom-gif-maker.gif" alt="folder" width="95%" />
                            </Col>
                            <Col sm={12} md={5} className="text-left ">
                                <div className="text-start text-white home-4">
                                    <h4 className="">Lorem ispsum color sit amet</h4>
                                    <div className="border-text my-5">
                                        <p>
                                            <b>Lorem ipsum dolor sit amet consectetur adipisicing</b>
                                        </p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
                                    </div>
                                    <div className="mb-4">
                                        <Link to="signup">
                                            <Button className="signin me-4">SIGN UP</Button>
                                        </Link>
                                        <Link to="signin">
                                            <Button className="signin">SIGN IN</Button>
                                        </Link>
                                    </div>
                                    {/* <Button className="signin lngbtn" onClick={() => setModalShow(true)} style={{ minWidth: '270px' }}>
                                        {link ? `Watch TeztUs Tutorial` : `Study ${userName} Tezt`}
                                    </Button> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
            <Container>
                <Tutorial show={modalShow} onHide={() => setModalShow(false)} />
            </Container>
        </div>
    );
};

export default Main;
