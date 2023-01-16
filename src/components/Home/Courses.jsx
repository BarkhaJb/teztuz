import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/main.css';
import ReactPlayer from 'react-player';

const Courses = () => {
    return (
        <div>
            <section id="courses">
                <div className="cube-section heightvh">
                    <div className="signup-form">
                        <Container>
                            <Row className="hero-row1">
                                <Col sm={12} md={6} className="text-left conect-block m-auto">
                                    <div className="text-start text-white px-md-1">
                                        <h4>
                                            <b>Courses</b>
                                        </h4>
                                        <div className="border-text my-5 ">
                                            <p style={{ fontSize: '18px', lineHeight: '28px' }}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quasi, modi quae voluptates labore iure vero culpa ab dolor maiores consectetur
                                                repellendus officia, non rep explicabo m explic alias illum?
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={8} md={6} className="text-left conect-block">
                                    <div className="videos">
                                        <div className="">
                                            {/* <video width="80%" controls="controls" autoplay loop>
                                                <source src="../assets/new/Cube_cut_2.MOV" type="video/mp4" />
                                            </video> */}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Courses;
