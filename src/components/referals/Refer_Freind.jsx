import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const Refer_Freind = () => {
    const [refers, setRefers] = useState([
        {
            refername: 'M_',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 2,
            image: '../assets/teztus-user.png'
        },
        {
            refername: 'M_GG',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 2,
            image: '../assets/teztus-user.png'
        },
        {
            refername: 'M_WWW',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 4,
            image: '../assets/teztus-user.png'
        },
        {
            refername: 'M_QQQ',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 5,
            image: '../assets/trophy.png'
        },
        {
            refername: 'M_KKK',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 1,
            image: '../assets/teztus-user.png'
        }
    ]);
    const username = 'M_ ';
    return (
        <div className="refer-main-compoenet">
            <div>
                <h3 className="fs-4">REFER A FREIND</h3>
                <p>
                    To refer a freind have them sign up with your username <b>{username}</b>
                </p>
            </div>
            <div className="gredient-line mb-5"></div>
            <div className="refer-div">
                {refers.map((val, index) => {
                    return (
                        <Row className="refers-cols" key={index}>
                            <Col xs={6}>
                                <div className="mb-2 d-flex">
                                    <div className="me-4">
                                        <img src={val.image} style={{ maxWidth: '36px' }} className="me-2 userpng" />
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
                                <h6>You have {val.total_refers} referrals</h6>
                                <p>{val.time_passed} days ago</p>
                            </Col>
                        </Row>
                    );
                })}
            </div>
        </div>
    );
};

export default Refer_Freind;
