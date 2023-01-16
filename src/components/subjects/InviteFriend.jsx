import React, { useState } from 'react';
import { Button, Row, Col, Form, Container, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
const InviteFriends = () => {
    const [searchitem, setSearchvalue] = useState('');
    const [tags, setTags] = useState([
        { name: 'User X', id: 0 },
        { name: 'jack', id: 1 },
        { name: 'cache', id: 2 },
        { name: 'puppy', id: 3 },
        { name: 'tonny', id: 4 }
    ]);
    const [pendingUsers, setPendingUsers] = useState([]);

    const handleSubmit = (values) => {
        alert(JSON.stringify(values), 'data');
    };

    const AddField = (name, id) => {
        setPendingUsers([...pendingUsers, { name: name, id: id }]);
    };
    const Deleteuser = (item) => {
        let filteredArr = pendingUsers.filter((el) => el.id !== item.id);
        setPendingUsers(filteredArr);
    };
    const handleCheck = (event) => {
        var updatedList = [...pendingUsers];
        if (event.target.checked) {
            updatedList = [...pendingUsers, event.target.value];
        } else {
            updatedList.splice(pendingUsers.indexOf(event.target.value), 1);
        }

        setPendingUsers(updatedList);
    };

    return (
        <div className="">
            <Container className="study-modes" fluid>
                <Row className="invite-friend">
                    <Col sm={6} md={6} className="col-fs">
                        <h5 className="text-center">Invite friend to this group</h5>
                        <Form noValidate onSubmit={handleSubmit} className="study-modes Signupmainform">
                            <div className="in-userlist">
                                <Form>
                                    <Form.Group className="mb-3 search-friend frend" controlId="firendsearch">
                                        <InputGroup hasValidation>
                                            <Form.Control type="text" placeholder="Search Friend" onChange={(e) => setSearchvalue(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                                {tags
                                    .filter((val) => {
                                        if (searchitem === '') {
                                            return val;
                                        } else if (val.name.toLowerCase().includes(searchitem.toLowerCase())) {
                                            return val;
                                        }
                                    })
                                    .map((val, index) => {
                                        return (
                                            <>
                                                <div className="mb-2 allusers d-flex justify-content-between" key={index}>
                                                    <Form.Group className="d-flex w-100" controlId={index}>
                                                        <Form.Label>
                                                            <p>
                                                                <img src="../assets/teztus-user.png" className="me-2 userpng middle" />
                                                                <span>{val.name}</span>
                                                            </p>
                                                        </Form.Label>
                                                        <p>
                                                            <Form.Check value={val.name} type="checkbox" onChange={handleCheck} />
                                                        </p>
                                                    </Form.Group>
                                                </div>
                                            </>
                                        );
                                    })}
                            </div>
                        </Form>

                        <div className="modelfotr">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisico conseq</p>
                        </div>
                    </Col>

                    <Col sm={6} md={6} className="col-sc position-relative">
                        <div className="study-modes-div2 text-center"></div>
                        <h5>{pendingUsers.length} Friends Selected</h5>
                        <Row className=" pt-3">
                            {pendingUsers.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="d-flex justify-content-between">
                                            <div className="mt-3">
                                                <img src="../assets/teztus-user.png" className="middle me-4" alt="addeduserlist" />
                                                {item}
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </Row>
                        <div className="invitemainbtns invitefrnd text-end">
                            <Button className="adinvite">Add</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default InviteFriends;
