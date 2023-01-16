import React, { useState } from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyDate from '../feed/Date';

const AddEventForm = () => {
    const schema = yup.object().shape({
        newcategory: yup.string(),
        startdate: yup.date(),
        starttime: yup.string(),
        endsdate: yup.date(),
        endtime: yup.string(),
        color: yup.string(),
        repeat: yup.string(),
        alert: yup.string(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted')
    });

    const handleSubmit = (values) => {
        alert(JSON.stringify(values), 'data');
    };

    var someDate = new Date();
    someDate.setDate(someDate.getDate() + 3);
    var datee = someDate.toISOString().substr(0, 10);

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                newcategory: '',
                terms: false,
                color: '',
                startdate: '',
                starttime: '',
                endsdate: '',
                endtime: '',
                repeat: '',
                alert: ''
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className="study-modes eventsform">
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <Form.Group controlId="newcategory">
                                    <Form.Control name="newcategory" required as="select" placeholder="Select" onChange={handleChange}>
                                        <option value="new-cat">New Category</option>
                                        <option value="cat1">Category 1</option>
                                        <option value="cat2">Category 2</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">{errors.newcategory}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={12} lg={5}>
                                {/* <Row> */}

                                <div className="all-day">
                                    <div className="d-flex">
                                        <Form.Label>All Day</Form.Label>
                                        <Form.Check
                                            name="terms"
                                            label=""
                                            className="m-2"
                                            onChange={handleChange}
                                            isInvalid={!!errors.terms}
                                            feedback={errors.terms}
                                            feedbackType="invalid"
                                            id="validationFormik00"
                                        />
                                    </div>
                                    <Form.Group controlId="color" className="startdate d-flex justify-content-between">
                                        <Form.Control type="color" name="color" className="mx-1" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik01" className="startdate d-flex justify-content-between">
                                        <Form.Label>Starts:</Form.Label>
                                        <Form.Control type="date" name="startdate" defaultValue={datee} className="mx-1" onChange={handleChange} isValid={touched.startdate && !errors.startdate} />
                                        <Form.Control type="time" name="starttime" onChange={handleChange} isValid={touched.starttime && !errors.starttime} />
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik01" className="d-flex my-2">
                                        <Form.Label>End</Form.Label> <Form.Control type="date" name="endsdate" className="mx-1" onChange={handleChange} isValid={touched.edtime && !errors.endsdate} />
                                        <Form.Control type="time" name="endtime" onChange={handleChange} isValid={touched.endtime && !errors.endtime} />
                                    </Form.Group>

                                    <Form.Group controlId="alert" className="day-select d-flex">
                                        <Form.Label className="me-3">Alert</Form.Label>
                                        <Form.Control name="alert" required as="select" placeholder="Select" onChange={handleChange}>
                                            <option value="none">None</option>
                                            <option value="none1">None 1</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.newcategory}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="repeat" className="day-select d-flex">
                                        <Form.Label className="me-3">Repeat</Form.Label>{' '}
                                        <Form.Control name="repeat" required as="select" placeholder="Select" onChange={handleChange}>
                                            <option value="none">None</option>
                                            <option value="none1">None 1</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.repeat}</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <Form.Group controlId="" className="my-3">
                                    <Link to="/invite" className="invitelink">
                                        <div className="invtfr text-white">
                                            Invite a Connection <span className="inviteplus"> + </span>
                                        </div>
                                    </Link>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={12} lg={5}>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data=""
                                    onReady={(editor) => {}}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                    }}
                                />
                            </Col>
                        </Row>
                        <Button type="submit" className="mt-3 add-eventsubmit">
                            Add Eventss
                        </Button>
                    </Container>
                </Form>
            )}
        </Formik>
    );
};

export default AddEventForm;
