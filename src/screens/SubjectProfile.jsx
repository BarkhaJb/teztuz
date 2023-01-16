import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Nav, Tab, Tabs, DropdownButton, Dropdown, Modal, Form, InputGroup } from 'react-bootstrap';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TabContent from '../components/subject-detail/tab_conten';
import Folder from '../components/subjects/Options/Folder';
import Tezt from '../components/subjects/Options/Tezt';
import Document from '../components/subjects/Options/Document';
import InviteFriends from '../components/subjects/InviteFriend';
import { Link } from 'react-router-dom';
import MyDate from '../components/feed/Date';

const SubjectProfile = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [searchitem, setSearchvalue] = useState('');
    const [joined, setJoined] = useState('Joined');
    const [Leave, setLeaveGroup] = useState();
    const [connect, setconnect] = useState([
        {
            group: 'Calculus 302'
        },
        {
            group: 'English 420'
        },
        {
            group: 'Maths 56'
        },
        {
            group: 'History 3'
        },
        {
            group: 'Biology 8'
        }
    ]);
    useEffect(() => {
        Freind_invite();
    }, []);
    const Freind_invite = () =>
        toast(CustomToastWithLink, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    function openNav() {
        document.getElementById('myLeftSidenav').style.width = '310px';
    }
    function closeNav() {
        document.getElementById('myLeftSidenav').style.width = '0px';
    }
    const CustomToastWithLink = () => (
        <div className="d-flex toast-notify">
            <div className="user-tost" style={{ width: '15%' }}>
                <img src="../assets/user.png" alt="user" />
            </div>
            <div>
                <p className="mb-0">You've Have been referred by User X</p>
                <MyDate />
                <Link to="/User X" className="toast-link">
                    View
                </Link>
            </div>
        </div>
    );
    const FolderRemove = (props) => {
        return (
            <Modal {...props} size="" backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" className="passwordmodels" centered>
                <Modal.Body>
                    <div className="text-center confirm-model">
                        <p>Are You sure you want to Leave Group</p>
                        <Button className="cancel" onClick={props.onHide}>
                            Cancel
                        </Button>
                        <Button className="delete">Yes</Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    };
    const InviteModel = (props) => {
        return (
            <>
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="invitemyfriend group-invite" centered>
                    <Modal.Header className="subprofile-invite">
                        <img src="../assets/x-circlew.svg" alt="invitefriend to group" onClick={() => setModalShow(false)} />
                    </Modal.Header>
                    <Modal.Body>
                        <InviteFriends />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide} className="cancel">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };
    return (
        <>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>

            <img className="openbtn groups-view" src="../assets/-right.svg" onClick={openNav} />

            <div id="myLeftSidenav" className="sidebar-groups sidebar">
                <div className="feed-sidebar  pt-1">
                    <span className="addgroup">
                        <img src="../assets/plus-add.svg" alt="add" />
                    </span>
                    <h5 className="ps-3 mb-3">
                        <b>Groups</b>
                    </h5>
                    <a className="closebtn" onClick={closeNav}>
                        <img src="../assets/-left.svg" alt="close" />
                    </a>
                    <div className="active-connects ">
                        <div className="text-center">
                            <Form.Group className="mb-4 search-friend px-2" controlId="firendsearch">
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <img src="../assets/search-w.svg" />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Search" onChange={(e) => setSearchvalue(e.target.value)} />
                                </InputGroup>
                            </Form.Group>
                        </div>

                        {connect
                            .filter((val) => {
                                if (searchitem == '') {
                                    return val;
                                } else if (val.group.toLowerCase().includes(searchitem.toLowerCase())) {
                                    return val;
                                }
                            })
                            .map((val, index) => {
                                return (
                                    <div className="mb-2 d-flex ps-3" key={index}>
                                        <div className="me-3">
                                            <p className="subject-white"></p>
                                        </div>
                                        <div className="my-auto">
                                            <h6 className="pt-1 text-black">
                                                <strong>{val.group} </strong>
                                            </h6>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

            <div className="subprofile">
                <Container fluid className="m-0 p-0">
                    <div className="subprofile-main-compoenet">
                        <Row className="subject-content">
                            <Col xs={6}>
                                <div className="mb-2 d-flex">
                                    <div className="me-3">
                                        <p className="subject-white"></p>
                                    </div>
                                    <div>
                                        <h5 className="pt-2 mb-1" style={{ minWidth: '100px' }}>
                                            <strong>Calculus 2 </strong>
                                        </h5>
                                        <p className="">
                                            <img style={{ maxWidth: '20px', fontSize: '14px' }} src="../assets/lock.svg" className="me-2 grouppng" />
                                            <strong>15 members</strong>
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} className="text-end mute-bell">
                                <p className="mb-0">
                                    <Link to="#">
                                        <img src="../assets/setting.svg" alt="settings" />
                                    </Link>
                                </p>
                                <Button className="subview open" variant="primary" onClick={() => setModalShow(true)}>
                                    Invite <span className="inplus">+</span>
                                </Button>
                                <Button className="subview open ms-3">Edit Page</Button>
                                <div>
                                    <DropdownButton id="dropdown-basic-button" title={joined} className="Joined">
                                        <Dropdown.Item name="Joined" onClick={() => setJoined('Joined')}>
                                            Joined
                                        </Dropdown.Item>
                                        <Dropdown.Item name="Mute" onClick={() => setJoined('Mute')}>
                                            Mute
                                        </Dropdown.Item>
                                        <Dropdown.Item name="UnMute" onClick={() => setJoined('UnMute')}>
                                            UnMute
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setLeaveGroup(true)}>Leave Group</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <ToastContainer />
                </Container>
            </div>
            <div className="sub-tabs-block">
                <Container fluid style={{ position: 'relative' }}>
                    <Row className="sub-profile-col">
                        <Col xs={12} md={8} className="subject-tabs py-5">
                            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3 ">
                                <Tab eventKey="home" title="Home">
                                    <TabContent />
                                </Tab>
                                <Tab eventKey="folders" title="Folders">
                                    <Folder />
                                </Tab>
                                <Tab eventKey="tezts" className="profile-tezt" title="Tezts">
                                    <Tezt />
                                </Tab>
                                {/* <Tab eventKey="planner" title="Planner">
                                    <TabContent />
                                </Tab> */}

                                <Tab eventKey="documents" title="Documents">
                                    <Document />
                                </Tab>
                            </Tabs>
                        </Col>
                        <Col xs={12} md={4} className="text-white sub-about">
                            <h4 className="py-5">About Us</h4>
                            <p className="py-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ea ipsa quae quos, voluptates magni ratione iste, hic aliquid itaque magnam rem nobis, impedit alias vero
                            </p>
                            <p>
                                <span className="mt-1">
                                    <img src="../assets/briefcase.svg" className="me-2 subprofile-group" />
                                    Private
                                </span>
                            </p>
                            <p>
                                <span>
                                    <img src="../assets/group.png" className="me-2 subprofile-group" style={{ maxWidth: '25px' }} />
                                    15 members
                                </span>
                            </p>
                            <p>
                                <span>
                                    <img src="../assets/map-pin.svg" className="me-2 subprofile-group" />
                                    Montreal, qubec
                                </span>
                            </p>
                            <p>
                                <span>
                                    <img src="../assets/home.svg" className="me-2 subprofile-group" />
                                    Concordia University
                                </span>
                            </p>
                            <div className="py-4">
                                <p>Recently Added</p>
                                <Row className="aboutfolder">
                                    <Col xs={4} sm={6} className="text-white text-center ">
                                        <div>
                                            <img src="../assets/folder1.png" alt="file-folder" />
                                            <h6 className="pt-3">SAT</h6>
                                            <Button className="open">Open</Button>
                                        </div>
                                    </Col>
                                    <Col xs={4} sm={6} className="text-white text-center">
                                        <div>
                                            <img src="../assets/folder1.png" alt="file-folder" />
                                            <h6 className="pt-3">Calculus</h6>
                                            <Button className="open">Open</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div>
                    <InviteModel show={modalShow} onHide={() => setModalShow(false)} />
                    <FolderRemove show={Leave} onHide={() => setLeaveGroup(false)} />
                </div>
                <Footer />{' '}
            </div>
        </>
    );
};

export default SubjectProfile;
