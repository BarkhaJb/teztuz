import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import '../../css/main.css';

const Summaryprogress = ({ noww, name, variantcolor, progresscolor }) => {
    return (
        <>
            <Row>
                <Col sm={12} md={3}>
                    <p>
                        <img src="../assets/user.png" className="pe-2 usertesticon" />
                        <span className="text-white pt-1 d-inline-block">{name}</span>
                    </p>
                </Col>
                <Col sm={12} md={9}>
                    <ProgressBar now={noww} variant={variantcolor} className={progresscolor} />
                </Col>
            </Row>
        </>
    );
};

export default Summaryprogress;
