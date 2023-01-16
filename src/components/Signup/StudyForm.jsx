import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../../css/main.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudyForm = ({ data, setData, username, setDataCheck }) => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
        setData((values) => ({ ...values, [name]: value }));
    };
    const { id } = useParams();
    useEffect(async () => {
        if (id) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/studySet/${id}`);
            setInputs(res.data);
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs), 'inputs');
    };

    return (
        <Form noValidate onSubmit={handleSubmit} className="StudyForm ">
            <div>
                <Row className="mb-3">
                    <Col sm={12} md={6}>
                        <Form.Group controlId="title" className="frmgrp my-4">
                            <Form.Control type="text" name="title" placeholder="Title" value={inputs.title} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="description" className="frmgrp">
                            <Form.Control type="text" as="textarea" rows={8} name="description" placeholder="Add a Description" value={inputs.description} onChange={handleChange} />
                            {/* <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback> */}
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                        <Form.Group controlId="SchoolName" className="frmgrp secndcol my-4">
                            <Form.Control type="text" name="SchoolName" placeholder="School Name" value={inputs.SchoolName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="CourseName" className="frmgrp secndcol ">
                            <Form.Control type="text" as="textarea" rows={8} name="CourseName" placeholder="Course Name" value={inputs.CourseName} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Row className="my-4 studyselectfie">
                        <Col sm={12} md={4} className="selcdiv1 mb-2">
                            <Form.Select size="lg" className="form-control form-select" name="visibility" value={inputs.visibility} onChange={handleChange}>
                                <option value="Visible to Everyone">Visible to Everyone</option>
                                <option value="me">Me</option>
                                <option value="everyone">Everyone</option>
                            </Form.Select>
                        </Col>

                        <Col sm={12} md={4}>
                            <Form.Select className="form-control form-select editable" name="editable" value={inputs.editable} size="lg" onChange={handleChange}>
                                <option defaultValue="Only Editable by Me">Only Editable by Me</option>
                                <option value="Editible by Other" disabled>
                                    Editable by Others (Not Available Currently)
                                </option>
                            </Form.Select>
                        </Col>
                    </Row>

                    {/* <Button type="submit" className="mt-4 d-inline-block w-auto studysubmit">
                        Submit
                    </Button> */}
                </Row>
            </div>
        </Form>
    );
};

export default StudyForm;
