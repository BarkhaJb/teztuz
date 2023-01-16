import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/main.css';

const ResTezt = ({ adminTezt }) => {
    const rezTest = adminTezt;
    console.log('reztezt', rezTest);
    // const [tezt, setTezt] = useState([
    //     {
    //         id: 1,
    //         icons: '',
    //         name: ''
    //     },
    //     {
    //         id: 2,
    //         icons: '',
    //         name: ''
    //     },
    //     {
    //         id: 3,
    //         icons: ''
    //     },
    //     {
    //         id: 4,
    //         icons: '',
    //         name: ''
    //     }
    // ]);

    return (
        <>
            <div className="Tezts mt-4">
                <Container>
                    <div className="mt-4">
                        <Row>
                            {rezTest?.map((val, index) => {
                                return (
                                    <Col xs={6} md={3} className="my-3 docmenttt p-4 resr" key={val.id}>
                                        <Link to="/study-Admin-session" state={val}>
                                            <div>
                                                <p>
                                                    <img src="../assets/22.png" alt="puzle" className="rounded-pill p-3" width="100%" />
                                                </p>
<<<<<<< HEAD
                                                <p className="tezt-center">{val?.Subject}</p>
=======
                                                <p className="tezt-center">{val?.Topic}</p>
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
                                            </div>
                                        </Link>
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

export default ResTezt;
