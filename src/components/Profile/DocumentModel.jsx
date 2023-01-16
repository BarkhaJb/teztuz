import React, { useState } from 'react';
import { Button, Row, Col, Form, Container, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
const DocumentModel = (props) => {
    const [searchitem, setSearchvalue] = useState('');
    const [tags, setTags] = useState([
        { name: 'Chemistry', id: 0 },
        { name: 'Math', id: 1 },
        { name: 'cache', id: 2 },
        { name: 'Physics', id: 3 },
        { name: 'English', id: 4 }
    ]);
    const [pendingUsers, setPendingUsers] = useState([]);

    const handleSubmit = (values) => {
        alert(JSON.stringify(values), 'data');
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
    let setCloseModal = props.closeDocument;
    return (
        <div>
            <Container className="study-modes teztfolder" fluid>
                <Row className="invite-friendd">
                    <Col sm={6} md={6} className="col-sc position-relative teztadded">
                        <div className="study-modes-div2 text-center"></div> <h5 className="text-white text-center">Upload Document</h5>
                        <Row className="pt-5">
                            <div className="whtbo">
                                <label className="custom-file-upload text-center w-100">
                                    <input type="file" onChange={(e) => console.log(e.target.files[0].name)} />
                                    <img src="../assets/new/Add Document.png" alt="Add Document.png" width="70%" className="uploaddoc" />
                                </label>
                            </div>
                        </Row>
                    </Col>
                    <Col sm={6} md={6} className="col-fs p-0 doc-right">
                        <h5 className="p-3 text-white text-center assign-tezt border-0">Assign Document to Folder</h5>
                        <Form noValidate onSubmit={handleSubmit} className="study-modes Signupmainf">
                            <div className="in-userlist tezt-form">
                                <Form.Group className="mb-3 search-friend py-3" controlId="firendsearch">
                                    <InputGroup hasValidation>
                                        <InputGroup.Text id="inputGroupPrepend">
                                            <img src="../assets/search.svg" />
                                        </InputGroup.Text>
                                        <Form.Control type="text" placeholder="Search Folder" onChange={(e) => setSearchvalue(e.target.value)} />
                                    </InputGroup>
                                </Form.Group>

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
                                            <div className="mb-2 allusers d-flex justify-content-between" key={index}>
                                                <Form.Group className="d-flex w-100" controlId={index}>
                                                    <Form.Label>
                                                        <p>
                                                            <img src="../assets/folder1.png" className="me-2 userpng middle" />
                                                            <span className="">{val.name}</span>
                                                        </p>
                                                    </Form.Label>
                                                    <p>
                                                        <Form.Check value={val.name} type="checkbox" onChange={handleCheck} />
                                                    </p>
                                                </Form.Group>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="invitemainbtnss invitefrnd text-end "></div>
                        </Form>
                        <Button className="addtezt edu" onClick={() => setCloseModal(false)}>
                            Add
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DocumentModel;
