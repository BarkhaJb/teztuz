import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
const Notifications = () => {
    const [mute, setMute] = useState(true);
    const [notify, setNotify] = useState([
        {
            refername: 'M_',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 2,
            img: '../assets/user.png'
        },
        {
            refername: 'M_GG',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 2,
            img: '../assets/user.png'
        },
        {
            refername: 'M_WWW',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 4,
            img: '../assets/user.png'
        },
        {
            refername: 'M_QQQ',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 5,
            img: '../assets/user.png'
        },
        {
            refername: 'M_KKK',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 1,

            img: '../assets/user.png'
        },
        {
            refername: 'M_QQQ',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 5,
            img: '../assets/user.png'
        },
        {
            refername: 'M_KKK',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 1,

            img: '../assets/user.png'
        }
    ]);

    const navigate = useNavigate();
    const Deletefields = (index) => {
        const values = [...notify];
        values.splice(index, 1);
        setNotify(values);
    };
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
    }, []);
    return (
        <>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>
            <div className="referals">
                <Container style={{ minHeight: '100vh', overflow: 'hidden' }} className=" p-0">
                    <div className="refer-main-compoenet">
                        <Row className="refers-cols">
                            <Col xs={9}>
                                <h2>NOTIFICATIONS</h2>
                                <p>3 new notifications</p>
                            </Col>
                            <Col xs={3} className="text-end mute-bell">
                                {mute ? (
                                    <img src="../assets/bell.svg" onClick={() => setMute(!mute)} alt="bell" />
                                ) : (
                                    <img src="../assets/new/bell-off.svg" style={{ maxWidth: '38px' }} onClick={() => setMute(!mute)} alt="mute" />
                                )}
                                <p className="pointer" onClick={() => setMute(!mute)}>
                                    {mute ? 'mute' : 'Unmute'}
                                </p>
                            </Col>
                        </Row>
                        <div className="gredient-line mb-5"></div>
                        {notify.map((val, index) => {
                            return (
                                <Row className="refers-cols" key={index}>
                                    <Col xs={6}>
                                        <div className="mb-2 d-flex">
                                            <div className="me-4 ">
                                                <img src={val.img} className="me-2 userpng" alt="user image" />
                                            </div>
                                            <div>
                                                <h6 className="text-white">
                                                    You have referred <strong>{val.refername}</strong>
                                                </h6>
                                                <p className="text-white">{val.Date}</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="text-end" xs={6}>
                                        {/* <Button className="viewnotify">View</Button> */}
                                        <span className="deletenotifi" onClick={() => Deletefields(index)}>
                                            <img src="../assets/x.png" alt="delete notification" />
                                        </span>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                </Container>
                <Footer />
            </div>
        </>
    );
};

export default Notifications;
