import React, { useState } from 'react';
import { Modal, NavDropdown, Row, Col, Form, Button } from 'react-bootstrap';
import '../../css/main.css';
import UserSocial from './UserSocials';
import { Link } from 'react-router-dom';
import MyDate from './Date';

const FeedMain = ({ userName }) => {
    const [modalShow, setModalShow] = useState(false);
    const [messages, setMessage] = useState([{ text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }, { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }]);
    const handleAddition = (ev) => {
        {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                console.log(ev.target.value);
                setMessage([...messages, { text: ev.target.value }]);
            }
        }
    };

    // var today = new Date();
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    function CommentsModel(props) {
        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter " className="playermodel" size="lg" centered>
                <Modal.Header className="text-end justify-content-end">
                    <img src="../assets/x-circlew.svg" onClick={() => setModalShow(false)} />
                </Modal.Header>
                <Modal.Body>
                    <Row className="px-4">
                        <Col xs={12} sm={6}>
                            <div className="grey-box"></div>
                        </Col>
                        <Col xs={12} sm={6} className="">
                            <div className="d-flex position-relative User X-comment">
                                <div className="me-3">
                                    <img src="../assets/teztus-user.png" alt="feed-user" className="feed-user" />
                                </div>
                                <div className="text-white mb-2">
                                    <h3 className="mb-0 ">{userName}</h3>
                                    <MyDate />
                                </div>
                            </div>
                            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima providen</p>
                            <div>
                                <UserSocial />
                            </div>
                            <Form className="comment-form my-4 p-3 py-4">
                                <div class="msgbox">
                                    <div className="chat-lists">
                                        {messages.map((val, index) => {
                                            return (
                                                <li key={index} className="d-flex position-relative justify-content-between mb-5">
                                                    <img src="../../assets/teztus-user.png" alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="40" />
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <p className="" style={{ marginBottom: '3px' }}>
                                                                <b>User X Wao</b>
                                                            </p>
                                                            <p className="mb-0">{val.text}</p>
                                                        </div>
                                                    </div>
                                                    <span className="mb-0 timestamp position-absolute">{time}</span>
                                                </li>
                                            );
                                        })}
                                    </div>
                                    <Form.Group className="mb-2 mt-5 comment" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Write a comment" onKeyPress={(ev) => handleAddition(ev)} />
                                    </Form.Group>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <div className="feed-textblock">
                <div className="d-flex fead-head position-relative">
                    <div className="me-3">
                        <img src="../assets/teztus-user.png" alt="feed-user" className="feed-user" style={{ maxWidth: '140%', minWidth: '40px' }} />
                    </div>
                    <div className="text-white">
                        <h5 className="pt-1">{userName}</h5>
                        <MyDate />
                    </div>
                    <div className="d-flex justify-content-end editdropdown" id="feed-dropdown">
                        <span>
                            <NavDropdown
                                title={
                                    <div className="pull-left">
                                        <img className="thumbnail-image" style={{ maxWidth: '26px' }} src="../assets/dots.png" alt="user pic" />
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                className="useroption"
                            >
                                <NavDropdown.Item as={Link} to="#">
                                    Edit
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="#">
                                    Delete
                                </NavDropdown.Item>
                            </NavDropdown>
                        </span>
                    </div>
                </div>
                <div className="feed-white">
                    <p></p>
                </div>
                <div className="fead-footer p-4">
                    <div className="text-white">
                        <p className="text-black">Does anyone know the answer to question 2 on the functions hm?</p>
                        <UserSocial Pop={setModalShow} />
                    </div>
                </div>
            </div>
            <br />
            <div className="feed-textblock">
                <div className="d-flex fead-head position-relative">
                    <div className="me-3">
                        <img src="../assets/teztus-user.png" alt="feed-user" style={{ maxWidth: '140%', minWidth: '40px' }} />
                    </div>
                    <div className="text-white">
                        <h5>{userName}</h5>
                        <MyDate />
                    </div>
                    <div className="d-flex justify-content-end editdropdown" id="feed-dropdown">
                        <span>
                            <NavDropdown
                                title={
                                    <div className="pull-left">
                                        <img className="thumbnail-image" style={{ maxWidth: '26px' }} src="../assets/dots.png" alt="user pic" />
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                className="useroption"
                            >
                                <NavDropdown.Item as={Link} to="#">
                                    Edit
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="#">
                                    Delete
                                </NavDropdown.Item>
                            </NavDropdown>
                        </span>
                    </div>
                </div>

                <div className="fead-footer p-4">
                    <div className="text-white">
                        <p className="text-black">Does anyone know the answer to question 2 on the functions hm?</p>
                        <UserSocial Pop={setModalShow} />
                    </div>
                </div>
            </div>

            <br />
            <div className="feed-textblock">
                <div className="d-flex fead-head position-relative" style={{ borderBottom: '2px solid #fff' }}>
                    <div className="me-3">
                        <img src="../assets/teztus-user.png" alt="feed-user" style={{ maxWidth: '140%', minWidth: '40px' }} />
                    </div>
                    <div className="text-white">
                        <h5>{userName}</h5>
                        <MyDate />
                    </div>
                    <div className="d-flex justify-content-end editdropdown" id="feed-dropdown">
                        <span>
                            <NavDropdown
                                title={
                                    <div className="pull-left">
                                        <img className="thumbnail-image" style={{ maxWidth: '26px' }} src="../assets/dots.png" alt="user pic" />
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                className="useroption"
                            >
                                <NavDropdown.Item as={Link} to="/contact">
                                    Edit
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/contact">
                                    Delete
                                </NavDropdown.Item>
                            </NavDropdown>
                        </span>
                    </div>
                </div>

                <div className="d-flex fead-head border-0 rounded-0 ">
                    <div className="me-3 ms-4">
                        <img src="../assets/teztus-user.png" alt="feed-user" style={{ maxWidth: '140%', minWidth: '40px' }} />
                    </div>
                    <div className="text-white">
                        <h5>User X </h5>
                        <MyDate />
                    </div>
                </div>
                <div className="feed-white">
                    <p></p>
                </div>
                <div className="fead-footer">
                    <div className="p-4">
                        <p>Does anyone know the answer to question 2 on the function hm</p>
                    </div>
                    <hr className="connecthr" />
                    <div className="text-white p-4">
                        <p className="text-black">Can any one help User X</p>
                        <UserSocial Pop={setModalShow} />
                    </div>
                </div>
            </div>
            <CommentsModel show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default FeedMain;
