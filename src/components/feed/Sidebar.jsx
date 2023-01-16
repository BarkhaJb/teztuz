import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../css/main.css';
import { Link, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import { useEffect } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../config';

const FeedSidebar = ({ userId }) => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(false);
    const [user, setUser] = useState();
    // This determines which page to navigate to when user clicks on groups
    // Group page with id or create group page
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/` + userId);
            setUser(res.data);
        };

        const fetchUserGroups = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/groups/` + userId);
            setGroups(res.data);
        };

        if (userId !== undefined) {
            fetchUser();
            fetchUserGroups();
        }
    }, [userId]);

    function openNav() {
        document.getElementById('mySidenav').style.width = '300px';
    }
    function closeNav() {
        document.getElementById('mySidenav').style.width = '30px';
    }

    const [connect, setConnect] = useState([
        {
            user: 'User X',
            folder: 'calulus'
        },
        {
            user: 'User X1',
            folder: 'math'
        },
        {
            user: 'User X2',
            folder: 'english'
        },
        {
            user: 'User X3',
            folder: ''
        },
        {
            user: 'User X4',
            folder: 'chemistry'
        },
        {
            user: 'User X5',
            folder: 'chemistry'
        },
        {
            user: 'User X4',
            folder: 'chemistry'
        }
    ]);

    const MakePost = (props) => {
        return (
            <>
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" id="create-post" className="invitemyfriend makpost" centered>
                    <Modal.Header></Modal.Header>
                    <Modal.Body>
                        <CreatePost />
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
            <img className="openbtn" src="../assets/-left.svg" onClick={openNav} />

            <div className="position-relative">
                <div id="mySidenav" className="sidebar">
                    <div className="feed-sidebar">
                        <a className="closebtn" onClick={closeNav}>
                            <img src="../assets/-right.svg" alt="close" />
                        </a>
                        <div className="sidecont sidbrr text-center">
                            <Link className="" to="/search">
                                <img src="../assets/new/Search.png" alt="search" /> Search
                            </Link>
                            <a href="#" className="" onClick={() => setModalShow(true)}>
                                <img src="../assets/new/Create Post.png" alt="make a post" variant="primary" /> Make a post
                            </a>
                            {user !== undefined ? (
                                <Link className="" to={`/profile/${user._id}`}>
                                    <img src="../assets/new/Profile.png" alt="may wau" /> {user !== undefined ? `${user.firstName} ${user.lastName}` : ''}
                                </Link>
                            ) : (
                                ''
                            )}
                            <Link className="" to="/connection">
                                <img src="../assets/g1.png" alt="connection" /> Connection
                            </Link>
                            {groups.length < 1 ? (
                                <Link className="" to="/create-group">
                                    <img src="../assets/new/Groups.png" alt="" /> Groups
                                </Link>
                            ) : (
                                <Link className="" to={`/group/${groups[0]._id}`}>
                                    <img src="../assets/new/Groups.png" alt="" /> Groups
                                </Link>
                            )}
                            <Link className="" to="/chat">
                                <img src="../assets/new/Messages.png" alt="" /> Messages
                            </Link>
                        </div>
                        <div className="active-connects sidecont">
                            <h5 className="text-white my-3">Active Connections</h5>
                            {connect.map((val, index) => {
                                return (
                                    <div className="d-flex" key={index}>
                                        <div className="me-2">
                                            <img src="../assets/teztus-user.png" alt="" />
                                        </div>
                                        <div>
                                            <h6 className="my-0">{val.user} </h6>
                                            <p className="mt-0" style={{ fontSize: '13px' }}>
                                                {val.folder}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <MakePost show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default FeedSidebar;
