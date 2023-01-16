import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../css/main.css';

const Folder = () => {
    const [subject, setSubject] = useState([
        {
            Document: 'SAT'
        },
        {
            Document: 'Punctuation'
        },
        {
            Document: 'Calculus'
        },
        {
            Document: 'Chemistry'
        },
        {
            Document: 'Algebra'
        },
        {
            Document: 'English'
        }
    ]);

    useEffect(() => {}, []);

    return (
        <Row className="pt-4">
            {subject.map((val, index) => {
                return (
                    <Col sm={3} xs={4} className="text-center mb-4" key={index}>
                        <div className="doc-card text-white">
                            <Link to="/folders">
                                <img src="../assets/folder1.png" />
                            </Link>
                            <p className="mt-2">{val.Document}</p>
                        </div>
                    </Col>
                );
            })}
            <Col sm={3} className="text-center">
                <Form.Group className="mb-3">
                    <a to="/subjects#resources-sub">
                        <div className="filselctboc">
                            <Form.Label>
                                <img src="../assets/pluss.png" />
                            </Form.Label>
                            <Form.Control type="file" placeholder="" />
                        </div>
                    </a>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default Folder;
