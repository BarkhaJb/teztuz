import React, { useEffect, useState } from 'react';
import { Form, Container, InputGroup } from 'react-bootstrap';
import '../css/main.css';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../helpers/utils';
import axios from 'axios';

function Connection() {
    const user = getLoggedUser();
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [requests, setRequests] = useState();
    const [requestsInfo, setRequestsInfo] = useState([]);
    const [connections, setConnections] = useState();
    const [connectionsInfo, setConnectionsInfo] = useState([]);

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
    }, [user.email, navigate]);

    // Fetch connections and requests
    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/` + userId);
                setConnections(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/received/` + userId);
                setRequests(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId !== undefined) {
            fetchConnections();
            fetchRequests();
        }
    }, [userId]);

    useEffect(() => {
        const fetchRequestsInfo = async () => {
            setRequestsInfo([]);
            for (var i = 0; i < requests.length; i++) {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/` + requests[i].sender);
                const data = {
                    senderId: res.data._id,
                    name: `${res.data.firstName} ${res.data.lastName}`,
                    school: res.data.school
                };
                setRequestsInfo((requestsInfo) => [...requestsInfo, data]);
            }
        };
        const fetchConnectionsInfo = async () => {
            setConnectionsInfo([]);
            for (var i = 0; i < connections.length; i++) {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/` + connections[i]._id);
                console.log(res.data);
                const data = {
                    id: res.data._id,
                    name: `${res.data.firstName} ${res.data.lastName}`,
                    school: res.data.school
                };
                setConnectionsInfo((connectionsInfo) => [...connectionsInfo, data]);
            }
        };
        if (requests) {
            fetchRequestsInfo();
            fetchConnectionsInfo();
        }
    }, [requests, connections]);

    const acceptRequest = async (val) => {
        console.log(val);
        // Added both userIds to each other's connections list
        // And then remove the request from the database
        try {
            const data = {
                sender: val.senderId,
                receiver: userId
            };
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/${val.senderId}/addConnection/`, data);
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/`, { params: data });
            let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/connectionRequests/received/` + userId);
            setRequests(res.data);
            res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/` + userId);
            setConnections(res.data);
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    };

    const deleteRequest = (val) => {};

    const DeleteConnection = async (val) => {
        try {
            const data = {
                removed: val.id
            };
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}/removeConnection/`, data);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/` + userId);
            setConnections(res.data);
        } catch (err) {
            console.log(err);
            window.location.reload();
        }
    };

    const SearchUserData = () => {
        const [searchitem, setSearchvalue] = useState('');

        const handleSubmit = (values) => {
            alert(JSON.stringify(values), 'data');
        };

        return (
            <>
                <Container>
                    <Form noValidate onSubmit={handleSubmit} className="">
                        <Form className="pt-5">
                            <h1 className="connect-hd text-white text-center py-4">Connections</h1>
                            <Form.Group className="mb-5 search-friend py-2" controlId="firendsearch">
                                <InputGroup hasValidation className="connection">
                                    <InputGroup.Text id="inputGroupPrepend">
                                        <img src="../assets/search-w.svg" />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Search Connection" onChange={(e) => setSearchvalue(e.target.value)} />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                        <h3 className="text-white">Connections Request</h3>
                        {requestsInfo &&
                            requestsInfo
                                .filter((val) => {
                                    if (searchitem === '') {
                                        return val;
                                    } else if (val.name.toLowerCase().includes(searchitem.toLowerCase())) {
                                        return val;
                                    } else if (val.school.toLowerCase().includes(searchitem.toLowerCase())) {
                                        return val;
                                    }
                                })
                                .map((val, index) => {
                                    return (
                                        <div className="d-flex AllUser cnct-req justify-content-between align-items-center" key={index}>
                                            <div className="me-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <img src="../assets/user.png" alt="" className="conntcimg" />
                                                    </div>
                                                    <div>
                                                        <p className="mb-1 username">{val.name}</p>
                                                        <p>Studying at {val.school} </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <Link to="#" onClick={() => acceptRequest(val)} className="accept">
                                                    Accept
                                                </Link>
                                                <Link to="#">
                                                    <img style={{ padding: '10px' }} onClick={() => deleteRequest(val)} src="../assets/trash.svg" alt="delete request" />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                        <div className="py-5">
                            <h3 className="text-white">Connections</h3>
                            {connectionsInfo &&
                                connectionsInfo
                                    .filter((val) => {
                                        if (searchitem === '') {
                                            return val;
                                        } else if (val.name.toLowerCase().includes(searchitem.toLowerCase())) {
                                            return val;
                                        } else if (val.school.toLowerCase().includes(searchitem.toLowerCase())) {
                                            return val;
                                        }
                                    })
                                    .map((val, index) => {
                                        return (
                                            <div className="d-flex AllUser justify-content-between align-items-center" key={index}>
                                                <div className="me-3">
                                                    <div className="d-flex">
                                                        <div>
                                                            <img src="../assets/user.png" alt="" className="conntcimg" />
                                                        </div>
                                                        <div>
                                                            <p className="mb-1 username">{val.name}</p>
                                                            <p>{`Studying at ${val.school}`} </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    {/* <Link to="#" className="accept">
                                                Accept
                                            </Link> */}
                                                    <Link to="#">
                                                        <img style={{ padding: '7px', minWidth: '40px' }} onClick={() => DeleteConnection(val)} src="../assets/trash.svg" alt="delete request" />
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                        </div>
                    </Form>
                </Container>
            </>
        );
    };
    return (
        <>
            <div className="Header connects-header" id="courses-main">
                <div className="container">
                    <Header />
                </div>
            </div>
            <div className="pt-5 Search search-connect">
                <SearchUserData />
                <Container></Container>
                <Footer />
            </div>
        </>
    );
}

export default Connection;
