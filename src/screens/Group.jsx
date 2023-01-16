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
import { Link, useNavigate, useParams } from 'react-router-dom';
import MyDate from '../components/feed/Date';
import axios from 'axios';
import { getLoggedUser } from '../helpers/utils';
import AddFriends from '../components/group/AddFriends';

const Group = () => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    const [userId, setUserId] = useState();
    const [userGroups, setUserGroups] = useState();
    const [modalShow, setModalShow] = React.useState(false);
    const [searchitem, setSearchvalue] = useState('');
    const { groupId } = useParams();
    const [groupName, setGroupName] = useState();
    const [noOfMembers, setNoOfMembers] = useState();
    const [description, setDescription] = useState();
    const [visibility, setVisibility] = useState();
    const [location, setLocation] = useState();
    const [school, setSchool] = useState();

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
        const fetchUserId = async (email) => {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
                const id = await axios.get(url);
                setUserId(id.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserId(user.email);
    }, [navigate, user.email]);

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/groups/${userId}`);
                setUserGroups(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId !== undefined) {
            fetchUserGroups();
        }
    }, [userId]);

    // Get group info
    useEffect(() => {
        const fetchGroupInfo = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/groups/${groupId}`);
                setGroupName(res.data.name);
                setNoOfMembers(res.data.members.length);
                setDescription(res.data.description);
                setVisibility(res.data.visibility);
                setLocation(res.data.location);
                setSchool(res.data.school);
            } catch (err) {
                console.log(err);
            }
        };
        fetchGroupInfo();
    }, [groupId]);

    useEffect(() => {
        // Freind_invite();
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
    const InviteModel = (props) => {
        return (
            <>
                <Modal {...props} size="" aria-labelledby="contained-modal-title-vcenter" className="invitemyfriend group-invite" centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <AddFriends userId={userId} groupId={groupId} />
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
            <div className="Header" id="subjects">
                <Header />
            </div>
            <img className="openbtn groups-view" src="../assets/-right.svg" onClick={openNav} />

            <div id="myLeftSidenav" className="sidebar-groups sidebar">
                <div className="feed-sidebar">
                    <h5 className="ps-3">
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

                        {userGroups &&
                            userGroups
                                .filter((val) => {
                                    if (searchitem == '') {
                                        return val;
                                    } else if (val.name.toLowerCase().includes(searchitem.toLowerCase())) {
                                        return val;
                                    }
                                })
                                .map((val, index) => {
                                    return (
                                        <div className="mb-2 d-flex ps-3" key={index}>
                                            <div className="me-3">
                                                <p className="subject-white" onClick={() => navigate(`/group/${val._id}`)}></p>
                                            </div>
                                            <div className="my-auto">
                                                <h6 className="pt-1 text-black">
                                                    <strong>{val.name} </strong>
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
                                        <h6 className="pt-1">
                                            <strong>{groupName}</strong>
                                        </h6>
                                        <p className="">
                                            <img style={{ maxWidth: '20px', fontSize: '14px' }} src="../assets/user.png" className="me-2 grouppng" />
                                            <span>{noOfMembers} members</span>
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
                                    <DropdownButton id="dropdown-basic-button" title="Joined" className="Joined">
                                        <Dropdown.Item href="#/subject">Joined</Dropdown.Item>
                                        <Dropdown.Item href="#/subject">Mute</Dropdown.Item>
                                        <Dropdown.Item href="#/graph">Leave Group</Dropdown.Item>
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
                    <Row>
                        <Col xs={12} md={8} className="subject-tabs py-5">
                            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3 ">
                                <Tab eventKey="home" title="Home">
                                    <TabContent />
                                </Tab>
                                <Tab eventKey="planner" title="Planner">
                                    <TabContent />
                                </Tab>
                                <Tab eventKey="folders" title="Folders">
                                    <Folder />
                                </Tab>
                                <Tab eventKey="documents" title="Documents">
                                    <Document />
                                </Tab>
                                <Tab eventKey="tezts" className="profile-tezt" title="Tezts">
                                    <Tezt />
                                </Tab>
                            </Tabs>
                        </Col>
                        <Col xs={12} md={4} className="text-white sub-about">
                            <h4 className="py-5">About Us</h4>
                            <p className="py-3">{description}</p>
                            <p>
                                <span className="mt-1">
                                    <img src="../assets/briefcase.svg" className="me-2 subprofile-group" />
                                    {visibility}
                                </span>
                            </p>
                            <p>
                                <span>
                                    <img src="../assets/group.png" className="me-2 subprofile-group" style={{ maxWidth: '25px' }} />
                                    {noOfMembers} members
                                </span>
                            </p>
                            <p>
                                <span>
                                    <img src="../assets/map-pin.svg" className="me-2 subprofile-group" />
                                    {location ? location : 'n/a'}
                                </span>
                            </p>
                            <p>
                                <span>
                                    <img src="../assets/home.svg" className="me-2 subprofile-group" />
                                    {school ? school : 'n/a'}
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
                </div>
                <Footer />{' '}
            </div>
        </>
    );
};

export default Group;
