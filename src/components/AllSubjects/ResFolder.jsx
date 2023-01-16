import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../../css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';

const ResFolders = () => {
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
            <div className="resourses">
                <Container>
                    <div>
                        <Row>
                            {tezt.map((val, index) => {
                                return (
                                    <Col xs={6} md={3} className="my-3 docment p-4 resr" key={val.id}>
                                        <div>
                                            <div className="resource-gradi">
                                                <p className="">
                                                    <Link to="/folders">
                                                        <img src="../assets/new/Folders.png" alt="Folder" />
                                                    </Link>
                                                </p>
                                            </div>
                                            <p>Folder</p>
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

export default ResFolders;
