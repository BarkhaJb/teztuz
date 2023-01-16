import React, { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Form } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { getLoggedUser } from '../helpers/utils';
import axios from 'axios';
import { ObjectID } from 'bson';

const CreateGroup = () => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    const [userId, setUserId] = useState([]);
    const [groupId, setGroupId] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState();
    const [groupname, setGroupName] = useState('New Group');
    const [visibility, setVisibility] = useState('public');
    const [allowOthersToInvite, setAllowOthersToInvite] = useState(false);
    const [location, setLocation] = useState();
    const [school, setSchool] = useState();
    const [checkfriend, setCheckFriend] = useState();

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
        const newObjectId = new ObjectID();
        setGroupId(newObjectId.toString());
    }, [user.email, navigate]);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const schema = yup.object().shape({
        groupname: yup.string(),
        visibility: yup.string()
    });

    const handleSubmit = async (values) => {
        const myval = {
            _id: groupId,
            name: groupname,
            description: values.description,
            visibility: visibility,
            allowOthersToInvite: allowOthersToInvite,
            school: school,
            location: location,
            members: [userId],
            admins: [userId]
        };
        try {
            // Create group and upload to database
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/groups/`, myval);
            // Add group id to the user's list
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}/addGroup`, { groupId: groupId });
            // Add teztUs points
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/user/addTeztUsPoints`, { userId: userId, pointsToAdd: 10 });
        } catch (err) {
            console.log(err);
        }
        navigate('/group/' + groupId);
        return (
            <>
                <div className="Header Home" id="main-header">
                    <Container>
                        <Header />
                    </Container>
                </div>
                <div className="gradient groupsidebar">
                    <div>
                        <Container className="p-0" fluid>
                            <Row>
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={handleSubmit}
                                    initialValues={{
                                        groupname: '',
                                        private: '',
                                        friend: '',
                                        admin: '',
                                        description: ''
                                    }}
                                >
                                    {({ handleSubmit, handleChange, touched, errors }) => (
                                        <Form noValidate onSubmit={handleSubmit} className="Create-group">
                                            <Row className="crtedgrps">
                                                <Col xs={12} md={4} className="create-sidebar">
                                                    <div className="create-1">
                                                        <div className="div1">
                                                            <h3 className="">
                                                                <span className="tex-white pe-2">
                                                                    <Link to={'/feed'}>
                                                                        <img src="../assets/-left.svg" alt="close" width="35px" />
                                                                    </Link>
                                                                </span>
                                                                Create Group
                                                            </h3>
                                                        </div>
                                                        <div className="side-form">
                                                            <Form.Group controlId="Title" className="frmgrp ">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="groupname"
                                                                    placeholder="Group Name"
                                                                    // defaultValue="Create Group"
                                                                    onChange={(e) => {
                                                                        setGroupName(e.target.value);
                                                                    }}
                                                                    isValid={touched.groupname && !errors.groupname}
                                                                />
                                                            </Form.Group>
                                                            <Form.Select
                                                                className="form-control  prvt my-5"
                                                                name="private"
                                                                onChange={(e) => {
                                                                    setVisibility(e.target.value);
                                                                }}
                                                                size="lg"
                                                            ></Form.Select>
                                                            <Form.Select
                                                                className="form-control  prvt my-5"
                                                                name="freinds"
                                                                //</div>onChange={(e) => setFriend(e.target.value)}
                                                                size="lg"
                                                            >
                                                                <option value="freinds 1">Add Friends</option>
                                                                <option value="friend 2">Friend 2</option>
                                                                <option value="friend 3">Friend 3</option>
                                                            </Form.Select>
                                                            <Form.Select
                                                                className="form-control  prvt my-5"
                                                                name="admin"
                                                                //onChange={(e) => setFriend(e.target.value)}
                                                                size="lg"
                                                            >
                                                                <option value="Add Admin">Add Admin</option>
                                                                <option value="Admin 2">Admin 2</option>
                                                                <option value="Admin 3">Admin 3</option>
                                                            </Form.Select>

                                                            <Form.Group className="ms-2" controlId="formBasicCheckbox">
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    label="Allow others to invite friends"
                                                                    className="text-white"
                                                                    onChange={() => setAllowOthersToInvite(!allowOthersToInvite)}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col xs={12} md={8} className="create-group">
                                                    <div className="group-block">
                                                        <div className="creat">
                                                            <div className="groupdetail">
                                                                <Form.Group controlId="formFileLg" className="mb-3">
                                                                    <Form.Label>
                                                                        {!isSelected ? <img className="middle" src="../assets/image (1).png" width="150px" alt="" /> : null}
                                                                        {isSelected && <img src={URL.createObjectURL(selectedFile)} alt="" width="150px" />}
                                                                        <span>{groupname.length === '' ? 'CreateGroup' : groupname}</span>
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type="file"
                                                                        name="description"
                                                                        rows={5}
                                                                        placeholder="Write a description about the group"
                                                                        isInvalid={!!errors.description}
                                                                        onChange={changeHandler}
                                                                        isValid={touched.description && !errors.description}
                                                                    />
                                                                </Form.Group>
                                                            </div>
                                                            <h3 className="my-2">
                                                                <b> About</b>
                                                            </h3>
                                                            <Row>
                                                                <Col xs={12} md={12} lg={8}>
                                                                    <Form.Group controlId="Title" className="group-description">
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="description"
                                                                            as="textarea"
                                                                            rows={5}
                                                                            placeholder="Write a description about the group"
                                                                            isInvalid={!!errors.description}
                                                                            onChange={handleChange}
                                                                            isValid={touched.description && !errors.description}
                                                                        />
                                                                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={12} md={4} lg={4}>
                                                                    <div className="g-about">
                                                                        {checkfriend === 'friend' ? (
                                                                            <p>
                                                                                <img className="middle me-1" src="../assets/user.png" width="30px" alt="link" />{' '}
                                                                                <span className="abt-options">Friend</span>
                                                                            </p>
                                                                        ) : (
                                                                            <p>
                                                                                <img className="middle me-1" src="../assets/lock.svg" width="30px" alt="link" />
                                                                                <span className="abt-options">Private</span>
                                                                            </p>
                                                                        )}
                                                                        <p>
                                                                            <img className="middle me-1" src="../assets/team.png" width="30px" alt="link" />{' '}
                                                                            <span className="abt-options">1 Member</span>
                                                                        </p>
                                                                        <p className="d-flex align-items-center">
                                                                            <img className="middle me-1" src="../assets/pin1.png" width="30px" alt="link" />
                                                                            <span>
                                                                                <Form.Control type="text" placeholder="Location (optional)" className="grptxt td-inline" />
                                                                            </span>
                                                                        </p>
                                                                        <p className="d-flex align-items-center">
                                                                            <img className="middle me-1" src="../assets/bus.png" width="30px" alt="link" />
                                                                            <span>
                                                                                {' '}
                                                                                <Form.Control type="text" placeholder="School (Optional)" className="grptxt d-inline" />
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    <div className="group d-flex justify-content-end">
                                                        <Button type="submit" className="mt-3 submit create">
                                                            CREATE
                                                        </Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </Row>
                        </Container>
                    </div>
                    <Footer />{' '}
                </div>
            </>
        );
    };
};
export default CreateGroup;
