import React, { useState } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../css/chat.css';
import MyDate from '../feed/Date';
let userimahe = '../../assets/user.png';
const ChatBox = () => {
    const [searchitem, setSearchvalue] = useState('');
    const [Users, setUsers] = useState([
        { name: 'User X', Course: 'Are You Going to class', usericon: '../../assets/user.png' },
        { name: 'Jackson', Course: 'Are You Going to class', usericon: '../../assets/user.png' },
        { name: 'Wali', Course: 'Are You Going to class', usericon: '../../assets/user.png' },
        { name: 'Kacson', Course: 'Are You Going to class', usericon: '../../assets/user.png' },
        { name: 'Simon', Course: 'Are You Going to class', usericon: '../../assets/user.png' },
        { name: 'Simon', Course: 'Are You Going to class', usericon: '../../assets/user.png' },
        { name: 'Simon', Course: 'Are You Going to class', usericon: '../../assets/user.png' }
    ]);
    const [Messages, setMessage] = useState([
        { text: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipisicing elit.' },
        { text: 'Lorem ipsum do' },
        { text: 'Lorem ipsumr sitr adipisicing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit,.' }
    ]);
    function openNav() {
        document.getElementById('myLeftSidenav').style.width = '270px';
    }
    function closeNav() {
        document.getElementById('myLeftSidenav').style.width = '0';
    }
    const handleAddition = (ev) => {
        {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                console.log(ev.target.value);
                setMessage([...Messages, { text: ev.target.value }]);
            }
        }
    };
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <>
            {/* ########user List ###### */}
            <section style={{ backgroundColor: '#95b6d9', minHeight: '100vh', paddingTop: '0px' }}>
                <div className="row" style={{ minHeight: '100vh' }}>
                    <div className="mb-4 mb-md-0 sidebar-groupss" id="myLeftSidenav">
                        <div className="card userboxes pt-2">
                            <a className="closebtn msgclose" onClick={closeNav}>
                                <img src="../assets/-left.svg" alt="close" />
                            </a>
                            <div className="card-body px-0 pt-0">
                                <div className="addconnection">
                                    <h5 className="font-weight-bold py-3 text-lg-start">Messages</h5>
                                    <img src="../assets/add.svg" className="d-block" alt="newconnection" style={{ width: '20px' }} />
                                </div>
                                <Form>
                                    <Form.Group className="mb-5 search-friend px-5" controlId="firendsearch">
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <img src="../assets/bsearch.svg" />
                                            </InputGroup.Text>
                                            <Form.Control type="text" placeholder="Search for friends" onChange={(e) => setSearchvalue(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                                <ul className="list-unstyled mb-0">
                                    {Users.filter((val) => {
                                        if (searchitem == '') {
                                            return val;
                                        } else if (val.name.toLowerCase().includes(searchitem.toLowerCase())) {
                                            return val;
                                        } else if (val.Course.toLowerCase().includes(searchitem.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((val, index) => {
                                        return (
                                            <li className="activeuserlist border-bottom" style={{ backgroundColor: ' #00000026;' }}>
                                                <a href="#!" className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row">
                                                        <img src={userimahe} alt="avatar" className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                                                        <div className="pt-1">
                                                            <p className="fw-bold mb-0">{val.name}</p>
                                                            <p className="small text-muted">{val.Course}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* ##################  Chat Section  */}
                    <div className="position-relative pt-5" id="main-chatbox">
                        <img className="openbtn groups-view mb-5 chatopenarrow" src="../assets/-right.svg" onClick={openNav} />

                        {/* <div className="py-1 bg-white">
                            <h4 className="m-0">User X</h4>
                        </div> */}
                        <ul className="list-unstyled pe-4">
                            <div className="text-end mb-3 text-white">
                                <MyDate />
                            </div>
                            {Messages.map((val, index) => {
                                return (
                                    <li key={index} className="d-flex justify-content-between position-relative mb-4">
                                        <img src="../../assets/user.png" alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" style={{ minWidth: '50px' }} />
                                        <div className="card mesgtext-box">
                                            <div className="card-body">
                                                <p className="mb-0">{val.text}</p>
                                            </div>
                                        </div>
                                        {/* <span className="chat-time mb-0 timestamp position-absolute">{time}</span> */}
                                    </li>
                                );
                            })}

                            <li className=" mb-3">
                                <div className="form-outline">
                                    <Form className="msgtypefield mychatbox">
                                        <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Col xs="1">
                                                <Form.Group controlId="formFileLg" className="mb-3">
                                                    <Form.Label>
                                                        <img className="middle p-2" src="../assets/stack.png" style={{ maxWidth: '50px' }} alt="gallery" width="100%" />
                                                    </Form.Label>
                                                    <Form.Control type="file" name="description" rows={5} placeholder="Write a description about the group" />
                                                </Form.Group>
                                            </Col>
                                            <Col xs="10">
                                                <Form.Control sm="8" className="msgsend" type="email" placeholder="Aa" onKeyPress={(ev) => handleAddition(ev)} />
                                            </Col>
                                            <Col xs="1">
                                                <img src="../assets/voice.png" className="p-2" alt="mike" style={{ maxWidth: '50px' }} />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChatBox;
