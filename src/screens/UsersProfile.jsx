import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, Form, Tab, Tabs, NavDropdown } from 'react-bootstrap';
import Header from '../Layouts/Header';
import 'react-toastify/dist/ReactToastify.css';
import TabContent from '../components/subject-detail/tab_conten';
import { Link, useNavigate } from 'react-router-dom';
import Education from '../components/Profile/Education';
import TeztusScore from '../components/Profile/TeztusScore';
import { useParams } from 'react-router-dom';
import { getLoggedUser } from '../helpers/utils';
import axios from 'axios';
import Footer from '../Layouts/Footer';

const UsersProfile = () => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    // Profile Id is the id of the user that this profile belongs to
    const { profileId } = useParams();
    // userId is the user that currently using the website
    const [userId, setUserId] = useState();
    // current user's connections
    const [currentUserConnections, setCurrentUserConnections] = useState([]);
    const [sentRequests, setSentRequests] = useState();
    const [receivedRequests, setReceivedRequests] = useState();
    // If profileId == userId, then the user can edit this profile
    const [canEdit, setCanEdit] = useState(false);
    // Set which button to show (follow, unsend request, accept, decline, remove connection)
    const [showFollow, setShowFollow] = useState(false);
    const [showUnsend, setShowUnsend] = useState(false);
    const [showAccept, setShowAccept] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    // Information of the user that this profile belongs to
    const [profile, setProfile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }

        const fetchUserId = async (email) => {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
                const id = await axios.get(url);
                setUserId(id.data);
                if (id.data === profileId) {
                    setCanEdit(true);
                }
            } catch (err) {
                console.log(err);
            }
        };

        const fetchProfileUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/` + profileId);
                setProfile(res.data);
            } catch (err) {
                alert('This user does not exist');
                navigate('/feed');
                console.log(err);
            }
        };

        fetchProfileUser();
        fetchUserId(user.email);
    }, [navigate, user.email, profileId]);

    useEffect(() => {
        const fetchCurrentUserConnections = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/` + userId);
                setCurrentUserConnections(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchSentRequests = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/sent/` + userId);
                setSentRequests(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchReceivedRequests = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/received/` + userId);
                setReceivedRequests(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (userId !== undefined) {
            fetchCurrentUserConnections();
            fetchSentRequests();
            fetchReceivedRequests();
        }
    }, [userId]);

    useEffect(() => {
        if (!canEdit && sentRequests !== undefined && receivedRequests !== undefined) {
            // By default, show follow button
            setShowFollow(true);
            setShowUnsend(false);
            setShowAccept(false);
            setShowRemove(false);

            // Check if the user is already a connection
            for (var i = 0; i < currentUserConnections.length; i++) {
                if (currentUserConnections[i]._id === profileId) {
                    setShowFollow(false);
                    setShowUnsend(false);
                    setShowAccept(false);
                    setShowRemove(true);
                }
            }

            // if the user has already sent a request, show unsend button
            for (var x = 0; x < sentRequests.length; x++) {
                if (profileId === sentRequests[i].receiver) {
                    setShowFollow(false);
                    setShowUnsend(true);
                    setShowAccept(false);
                    setShowRemove(false);
                }
            }

            // if the user has already received a request, show accept/decline button
            for (i = 0; i < receivedRequests.length; i++) {
                if (profileId === receivedRequests[i].sender) {
                    setShowFollow(false);
                    setShowUnsend(false);
                    setShowAccept(true);
                    setShowRemove(false);
                }
            }
        }
    }, [profileId, canEdit, currentUserConnections, sentRequests, receivedRequests]);

    const makeConnectionRequest = async () => {
        try {
            const data = {
                sender: userId,
                receiver: profileId
            };
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/`, data);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/sent/` + userId);
            setSentRequests(res.data);
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    };

    const unsendRequest = async () => {
        try {
            const data = {
                sender: userId,
                receiver: profileId
            };
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/`, { params: data });
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/sent/` + userId);
            setSentRequests(res.data);
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    };

    const acceptRequest = async () => {
        // Added both userIds to each other's connections list
        // And then remove the request from the database
        try {
            const data = {
                sender: profileId,
                receiver: userId
            };
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/${profileId}/addConnection/`, data);
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/`, { params: data });
            let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/received/` + userId);
            setReceivedRequests(res.data);
            res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/` + userId);
            setCurrentUserConnections(res.data);
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    };

    const removeConnection = async () => {
        try {
            const data = {
                removed: profileId
            };
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}/removeConnection/`, data);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/` + userId);
            setCurrentUserConnections(res.data);
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    };

    const ProfilePic = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
        console.log(event.target.files[0], 'file');
    };

    return (
        <>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>

            <div className="userProfilemain">
                <Container className=" p-0">
                    <div className="subprofile-main-compoenet">
                        <Row className="subject-content w-100" style={{ maxWidth: '100%' }}>
                            <Col xs={10}>
                                <Link to={'/feed'}>
                                    <img src="../assets/leftt.svg" alt="close" width="35px" />
                                </Link>{' '}
                                <div className="mb-2 mt-2 d-flex" style={{ maxWidth: '700px' }}>
                                    <Form.Group controlId="formFileLg" className="mb-3 userprofile">
                                        <Form.Label>
                                            {!isSelected ? <img className="middle" src="../assets/image (1).png" width="130px" alt="userpic" /> : null}
                                            {isSelected && <img src={URL.createObjectURL(selectedFile)} alt="userpic" width="130px" className="uplodeduserpic" />}
                                        </Form.Label>
                                        <Form.Control type="file" name="description" onChange={(event) => ProfilePic(event)} placeholder="" style={{ maxWidth: '130px' }} />

                                        {!canEdit && showFollow ? (
                                            <Button className="follow" onClick={() => makeConnectionRequest()}>
                                                Follow
                                            </Button>
                                        ) : null}
                                        {!canEdit && showUnsend ? (
                                            <Button className="follow" onClick={() => unsendRequest()}>
                                                Unsend Request
                                            </Button>
                                        ) : null}
                                        {!canEdit && showAccept ? (
                                            <Button className="follow" onClick={() => acceptRequest()}>
                                                Accept
                                            </Button>
                                        ) : null}
                                        {!canEdit && showRemove ? (
                                            <Button className="follow" onClick={() => removeConnection()}>
                                                Remove Connection
                                            </Button>
                                        ) : null}
                                    </Form.Group>

                                    <div className="ps-5 mt-3 w-100">
                                        <div style={{ marginLeft: '12px' }}>
                                            <h4 className="pt-1 text-white">{profile !== undefined ? <strong>{`${profile.firstName} ${profile.lastName}`}</strong> : ''}</h4>
                                            <p className="text-white">Connections: 489</p>
                                        </div>
                                        <Form.Control type="text" rows={4} as="textarea" name="description" className="adddescription text-white w-100" placeholder="Add a Description" />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={2} className="text-end mute-bell">
                                <div className="d-flex justify-content-end" id="feed-dropdown">
                                    <span>
                                        <NavDropdown
                                            title={
                                                <div className="pull-left">
                                                    <img className="thumbnail-image" src="../assets/setting.svg" alt="user pic" />
                                                </div>
                                            }
                                            id="basic-nav-dropdown"
                                            className="useroption"
                                        >
                                            <NavDropdown.Item as={Link} to="#">
                                                Edit Cover photo
                                            </NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="#">
                                                Edit Profile
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/* <ToastContainer /> */}
                </Container>
            </div>
            <div className="profile-tabs">
                <Container style={{ position: 'relative' }}>
                    <Row>
                        <Col xs={12} md={12} className="subject-tabs user py-5">
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 mk-post ">
                                <Tab eventKey="profile" title="Profile">
                                    <TeztusScore />
                                    <br />
                                    <div id="profile-edu" className="pt-4">
                                        <Education />
                                    </div>
                                </Tab>
                                <Tab eventKey="Posts" title="Posts">
                                    <TabContent />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        </>
    );
};

export default UsersProfile;
