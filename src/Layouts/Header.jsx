import React from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/main.css';
import { ObjectID } from 'bson';
import axios from 'axios';
import { getLoggedUser } from '../helpers/utils';
import { SocketContext } from '../context/SocketContext';
import logo from '../images/Logo with Beta.png';
import profile from '../images/Profile icon.png';

const Header = ({ userId }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    const { socketIO, dispatch } = useContext(SocketContext);

    const createFolder = async () => {
        const newObjectId = new ObjectID();
        try {
            const newFolder = {
                _id: newObjectId,
                userId: userId
            };
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/folders`, newFolder);
        } catch (err) {
            console.log(err);
        }
        navigate('/folders/' + newObjectId);
    };

    return (
        <div>
            <Navbar bg="" expand="lg">
                <Container className="p-0" fluid>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="teztus" className="header-logos " />
                        {/* <img src="../assets/new/Teztus.png" alt="teztus" className="header-logos mobile-logo" /> */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 d-flex justify-content-center" style={{ maxHeight: '100px', minHeight: '31px' }} navbarScroll>
                            {/*  <NavDropdown title="CREATE" id="basic-nav-dropdown" style={{ minHeight: '31px' }}>
                               <NavDropdown.Item href="#" onClick={() => createFolder()}>
                                    Folder
                                </NavDropdown.Item> 
                                <NavDropdown.Item as={Link} to="/create-studySet">
                                    Tezt
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item href="/subjects">Document</NavDropdown.Item> 
                            </NavDropdown>*/}
                            <Nav.Link as={Link} to="/create-studySet">
                                CREATE
                            </Nav.Link>
                            <Nav.Link as={Link} to="/courses">
                                COURSES
                            </Nav.Link>
                            <Nav.Link href="/feed">CONNECT</Nav.Link>
                            <p className="mobile-profile">
                                <Nav.Link as={Link} to="/contact">
                                    Contact
                                </Nav.Link>
                                <Nav.Link as={Link} to="/referal">
                                    Refer a Friend
                                </Nav.Link>
                                <Nav.Link to="/terms-services" as={Link}>
                                    Terms & Services
                                </Nav.Link>
                                {token && (
                                    <Nav.Link
                                        href="/"
                                        onClick={() => {
                                            socketIO.disconnect();
                                            localStorage.removeItem('jwt');
                                            localStorage.removeItem('user');
                                        }}
                                    >
                                        Logout
                                    </Nav.Link>
                                )}
                            </p>
                            {/* <Nav.Link as={Link} to="/notifications" className="mobile-noti">
                                <span>
                                    <img src="../assets/new/Bell notification.png" alt="notification" width="100%" />
                                </span>
                            </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                    <div className="notification">
                        {/* <Nav.Link as={Link} to="/notifications" className="pt-0 desktop-noti">
                            <span>
                                <img src="../assets/new/Bell notification.png" alt="notification" />
                            </span>
                        </Nav.Link> */}
                        <span>
                            <NavDropdown
                                title={
                                    <div className="pull-left">
                                        <img className="thumbnail-image" src={profile} alt="user pic" />
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                className="useroption"
                            >
                                <NavDropdown.Item as={Link} to="/contact">
                                    Contact
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/referal">
                                    Refer a Friend
                                </NavDropdown.Item>
                                <NavDropdown.Item to="/terms-services" as={Link}>
                                    Terms & Services
                                </NavDropdown.Item>
                                {token && (
                                    <NavDropdown.Item
                                        href="/"
                                        onClick={() => {
                                            console.log('logging out');
                                            localStorage.removeItem('jwt');
                                            localStorage.removeItem('user');
                                        }}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                )}
                            </NavDropdown>
                        </span>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
