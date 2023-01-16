import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Container, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
import axios from 'axios';
import { ApiUrl } from '../../config';

const AddFriends = ({ userId, groupId }) => {
    const [searchitem, setSearchvalue] = useState('');
    const [friends, setFriends] = useState();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/connections/${userId}`);
                console.log(res.data);
                setFriends(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFriends();
    }, [userId]);

    const [pendingUsers, setPendingUsers] = useState([]);

    const handleSubmit = async () => {
        for (var i = 0; i < pendingUsers.length; i++) {
            try {
                const data = {
                    //userId
                    id: pendingUsers[i].id,
                    groupId: groupId
                };
                await axios.put(`${process.env.REACT_APP_BASE_URL}/api/groups/addUserToGroup`, data);
            } catch (err) {
                console.log(err);
            }
        }

        //close add connections modal
    };

    const AddField = (name, id) => {
        setPendingUsers([...pendingUsers, { name: name, id: id }]);
    };
    const Deleteuser = (item) => {
        let filteredArr = pendingUsers.filter((el) => el.id !== item.id);
        setPendingUsers(filteredArr);
    };

    return (
        <div className="">
            <Container className="study-modes" fluid>
                <Row className="invite-friend">
                    <Col sm={6} md={6} className="col-fs">
                        <h5 className="ps-4">Invite friend to this group</h5>
                        <Form noValidate onSubmit={handleSubmit} className="study-modes Signupmainform">
                            <div className="in-userlist">
                                <Form>
                                    <Form.Group className="mb-3 search-friend" controlId="firendsearch">
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">
                                                <img src="../assets/search.svg" />
                                            </InputGroup.Text>
                                            <Form.Control type="text" placeholder="Search Friend" onChange={(e) => setSearchvalue(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                                {friends &&
                                    friends
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
                                                    <div className="mb-2 allusers" key={index}>
                                                        <img src="../assets/user.png" className="me-2 userpng" />
                                                        <span className="">
                                                            {val.firstName} {val.lastName}
                                                        </span>
                                                        <img onClick={() => AddField(`${val.firstName} ${val.lastName}`, val._id)} src="../assets/plus-square.svg" className="me-2 userpng" />
                                                    </div>
                                                </>
                                            );
                                        })}
                            </div>
                        </Form>

                        <div className="modelfotr">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque quae, enim similique non iusto conseq</p>
                        </div>
                    </Col>

                    <Col sm={6} md={6} className="col-sc position-relative">
                        <div className="study-modes-div2 text-center"></div> <h5 className="">{pendingUsers.length} Freinds Selected</h5>
                        <Row className=" pt-3">
                            {pendingUsers.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="d-flex justify-content-between">
                                            <div>
                                                <img src="../assets/user.png" className="middle me-4" alt="addeduserlist" />
                                                {item.name}
                                            </div>
                                            <div>
                                                <p className="crossicon" onClick={() => Deleteuser(item)}>
                                                    X
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </Row>
                        <div className="invitemainbtns invitefrnd text-end">
                            <Button className="adinvite" onClick={() => handleSubmit()}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddFriends;
