import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Container, InputGroup } from 'react-bootstrap';
import axios from 'axios';

import '../../css/main.css';
const TeztFolder = ({ userId, closeFolder, setPendingFolders, pendingFolders, pendingIndexes, setPendingIndexes }) => {
    const [searchitem, setSearchvalue] = useState('');
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/folders/user/` + userId);
                setFolders(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId) {
            fetchFolders();
        }
    }, [userId]);

    const handleCheck = (event, value) => {
        var updatedFolders = [...pendingFolders];
        var updatedIndexes = [...pendingIndexes];
        if (event.target.checked) {
            updatedFolders = [...pendingFolders, folders[event.target.value]];
            updatedIndexes = [...pendingIndexes, event.target.value];
        } else {
            updatedFolders.splice(pendingFolders.indexOf(folders[event.target.value]), 1);
            updatedIndexes.splice(pendingIndexes.indexOf(event.target.value), 1);
        }
        setPendingFolders(updatedFolders);
        setPendingIndexes(updatedIndexes);
    };
    let setCloseModal = closeFolder;

    return (
        <div>
            <Container className="study-modes teztfolder" fluid>
                <Row className="invite-friendd">
                    <Col sm={6} md={6} className="col-fs p-0">
                        <h5 className="p-3 text-white text-center assign-tezt">Assign Tezt to Folder</h5>
                        <Form noValidate className="study-modes Signupmainf">
                            <div className="in-userlist tezt-form">
                                <Form>
                                    <Form.Group className="mb-3 search-friend frend" controlId="firendsearch">
                                        <InputGroup hasValidation>
                                            <Form.Control type="text" placeholder="Search Folder" onChange={(e) => setSearchvalue(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                                {folders
                                    .filter((val) => {
                                        if (searchitem === '') {
                                            return val;
                                        } else if (val.title.toLowerCase().includes(searchitem.toLowerCase())) {
                                            return val;
                                        }
                                    })
                                    .map((val, index) => {
                                        return (
                                            <>
                                                <div className="mb-2 allusers d-flex justify-content-between" key={index}>
                                                    <p>
                                                        <img src="../assets/folder1.png" className="me-2 userpng middle" />
                                                        <span className="">{val.title}</span>
                                                    </p>
                                                    <p>
                                                        <Form.Check value={index} checked={pendingIndexes.includes(index.toString())} type="checkbox" onChange={(event) => handleCheck(event)} />
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })}
                            </div>
                            <div className="invitemainbtnss invitefrnd text-end "></div>
                        </Form>
                    </Col>

                    <Col sm={6} md={6} className="col-sc position-relative teztadded">
                        <div className="study-modes-div2 text-center"></div> <h5 className="text-white">{pendingFolders.length} Folders Selected</h5>
                        <Row className="pt-5">
                            {pendingFolders.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="d-flex justify-content-between my-3">
                                            <div className="text-white">
                                                <img src="../assets/folder1.png" className="me-2 userpng middle" />
                                                <span className="text-white"> {item.title}</span>
                                            </div>
                                            <div></div>
                                        </div>
                                    </>
                                );
                            })}
                        </Row>
                        <Button className="addtezt" onClick={() => setCloseModal(false)}>
                            Add
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TeztFolder;
