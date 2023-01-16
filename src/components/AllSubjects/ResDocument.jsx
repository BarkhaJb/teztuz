import React, { useState } from 'react';
import { Container, Button, Col, Row, Form } from 'react-bootstrap';
import '../../css/main.css';
const ResDocument = () => {
    const [tezt, setTezt] = useState([
        {
            id: 1,
            icons: '',
            name: ''
        },
        {
            id: 2,
            icons: '',
            name: ''
        },
        {
            id: 3,
            icons: '',
            name: ''
        },
        {
            id: 4,
            icons: '',
            name: ''
        }
    ]);

    return (
        <>
            <div className="Document mt-4 resourse-doc">
                <Container>
                    <div>
                        <Row>
                            {tezt.map((val, index) => {
                                return (
                                    <Col xs={6} md={3} className="my-3 docment p-4 resr" key={val.id}>
                                        <div>
                                            <div className="resource-gradid">
                                                <img src="../assets/new/Document.png" alt="ddd" />
                                            </div>
                                            <p className="text-center">Add Title</p>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default ResDocument;
