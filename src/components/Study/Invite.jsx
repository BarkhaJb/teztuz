import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button, Row, Col, Form, Container, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../css/main.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import { getLoggedUser } from '../../helpers/utils';
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from '../../context/SocketContext';

const Invite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getLoggedUser();
    const [userId, setUserId] = useState('');
    const [searchitem, setSearchvalue] = useState('');
    const [friends, setFriends] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [urlData, setUrlData] = useState();
    const [Teztid, setTeztid] = useState(uuidv4());
    const [waitingUser, setWaitingUser] = useState();
    const [waitingUsers, setWaitingUsers] = useState([]);
    const { studySetId } = useParams();
    const { socketIO } = useContext(SocketContext);

    // Check if there is a user already logged in

    useEffect(() => {
        if (socketIO) {
            socketIO.on('WAITING_START_TEZT', (data) => {
                setWaitingUser(data.sender);
            });
        }
    }, [socketIO]);

    useEffect(() => {
        if (waitingUser) {
            setWaitingUsers([...new Set([...waitingUsers, waitingUser])]);
        }
    }, [waitingUser]);

    useEffect(async () => {
        let newData = {
            uid: Teztid,
            sender: user.username,
            teztData: location.state,
            studySetId: studySetId
        };
        let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/teztInvitation`, newData);
    }, []);

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
    }, [user]);

    useEffect(() => {
        // let localUrl = 'http://localhost:3000/start-tezt';
        let localUrl = 'http://15.235.162.99:3008/start-tezt';
        let Tezt_Url = `${localUrl}/${studySetId}?uid=${Teztid}`;
        setUrlData(Tezt_Url);
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/` + userId);
                setFriends(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId !== '') {
            fetchFriends();
        }
    }, [userId]);

    const handleSubmit = (values) => {
        alert(JSON.stringify(values), 'data');
    };

    const copyText = () => {
        Swal.fire('Text Copied..!');
    };
    const handleCheck = (event) => {
        var updatedList = [...pendingUsers];
        if (event.target.checked) {
            updatedList = [...pendingUsers, event.target.value];
        } else {
            updatedList.splice(pendingUsers.indexOf(event.target.value), 1);
        }
        setPendingUsers([...new Set(updatedList.slice(0, 4))]);
    };
    const copyUrl = () => {
        navigator.clipboard.writeText(urlData);
        copyText();
    };
    const handleStartInvite = async () => {
        const payload = {
            sender: user.username,
            receivers: pendingUsers,
            studySetId,
            teztData: location.state
        };

        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/studySets/inviteOthers/`, payload);
        await axios.put(`${process.env.REACT_APP_BASE_URL}/api/teztInvitation/${Teztid}`, { hasSenderStarted: true });

        navigate('/start-tezt/' + studySetId, { state: { ...location.state, usernames: payload.receivers, ...payload } });
    };

    return (
        <div>
            <Container className="study-modes" fluid>
                <Row className="study-modes-div1 invite">
                    <Col sm={6} md={6} className="p-0 ">
                        <h3 className="invte-header">Invite firends to this group</h3>
                        <div className="invit-form">
                            <Form noValidate onSubmit={handleSubmit} className="study-modes Signupmainform">
                                <Form.Group className="mb-3 search-friend frend" controlId="firendsearch">
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" placeholder="Search Friend" onChange={(e) => setSearchvalue(e.target.value)} />
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                            {friends
                                .filter((val) => {
                                    if (searchitem === '') {
                                        return val;
                                    } else if (val.firstName.toLowerCase().includes(searchitem.toLowerCase())) {
                                        return val;
                                    } else if (val.lastName.toLowerCase().includes(searchitem.toLowerCase())) {
                                        return val;
                                    }
                                })
                                .map((val, index) => {
                                    return (
                                        <>
                                            <div className="mb-2 allusers d-flex justify-content-between" key={index}>
                                                <Form.Group className="d-flex  w-100" controlId={index}>
                                                    <Form.Label>
                                                        <p>
                                                            <img src="../assets/teztus-user.png" className="me-2 userpng middle" />
                                                            <span className="">{`${val.firstName} ${val.lastName}`}</span>
                                                        </p>
                                                    </Form.Label>
                                                    <p>
                                                        <Form.Check value={val.username} type="checkbox" onChange={handleCheck} />
                                                    </p>
                                                </Form.Group>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </Col>
                    <Col sm={6} md={6} className="p-0">
                        <div className="waitng-users">
                            <h3 className="text-center text-white mb-3">
                                <b>Waiting for users to join</b>
                            </h3>
                            <Row className="inviteslect px-3 align-items-center">
                                {[...new Set([...pendingUsers, ...waitingUsers])].map((val, index) => {
                                    return (
                                        <>
                                            <Col xs={6} key={index}>
                                                <div className="text-center userslist">
                                                    <div>
                                                        <img src="../assets/user.png" />
                                                        <p className="text-white mt-1">{val}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </>
                                    );
                                })}
                            </Row>
                            <Form className="clipboard">
                                <Form.Group className="mb-3" onClick={copyUrl} controlId="">
                                    <Form.Label className="pointer">Copy link to clipboard</Form.Label>
                                    <Form.Control type="text" defaultValue={urlData} placeholder="Copy link to clipboard" />
                                </Form.Group>
                            </Form>
                            <div className="invitemainbtns text-end">
                                <Button onClick={handleStartInvite} className="start me-2">
                                    Start
                                </Button>
                            </div>
                            <ToastContainer autoClose={1000} hideProgressBar={false} />
                        </div>{' '}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Invite;
