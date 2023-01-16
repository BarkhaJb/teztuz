import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../../css/main.css';

const Document = () => {
    const [subject, setSubject] = useState([
        {
            Document: 'Grammar'
        },
        {
            Document: 'Punctuation'
        },
        {
            Document: 'Calculus'
        },
        {
            Document: 'Math'
        },
        {
            Document: 'Algebra'
        },
        {
            Document: 'Compounds'
        }
    ]);

    useEffect(() => {}, []);

    return (
        <Row className="pt-4">
            {subject.map((val, index) => {
                return (
                    <Col sm={3} xs={4} className="text-center" key={index}>
                        <div className="doc-card text-white">
                            <div className="filebox"></div>
                            <p>{val.Document}</p>
                        </div>
                    </Col>
                );
            })}
            <Col sm={3} className="text-center">
                <div className="slectbox">
                    <img src="../assets/pluss.png" />
                </div>
            </Col>
        </Row>
    );
};

export default Document;
