import { Row, Col, Form } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';

const GradesForm = ({ Title, SchoolName, Description, CourseName }) => {

    return (
        <Formik
            initialValues={{
                Title: '',
                SchoolName: '',
                Description: '',
                CourseName: ''
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className="StudyForm ">
                    <div>
                        <Row className="mb-3">
                            <Col sm={12} md={6}>
                                <Form.Group controlId="Title" className="frmgrp my-4">
                                    <Form.Control
                                        type="text"
                                        name="Title"
                                        placeholder="Title"
                                        isInvalid={!!errors.Title}
                                        value={Title}
                                        onChange={handleChange}
                                        isValid={touched.Title && !errors.Title}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Title}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="Description" className="frmgrp">
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        rows={5}
                                        name="Description"
                                        placeholder="Add a Description"
                                        isInvalid={!!errors.Description}
                                        value={Description}
                                        onChange={handleChange}
                                        isValid={touched.Description && !errors.Description}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Description}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group controlId="SchoolName" className="frmgrp secndcol my-4">
                                    <Form.Control
                                        type="text"
                                        name="SchoolName"
                                        placeholder="School Name"
                                        isInvalid={!!errors.SchoolName}
                                        value={SchoolName}
                                        onChange={handleChange}
                                        isValid={touched.SchoolName && !errors.SchoolName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.SchoolName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="CourseName" className="frmgrp secndcol ">
                                    <Form.Control
                                        type="text"
                                        as="textarea"
                                        rows={5}
                                        name="CourseName"
                                        placeholder="Course Name"
                                        isInvalid={!!errors.CourseName}
                                        value={CourseName}
                                        onChange={handleChange}
                                        isValid={touched.CourseName && !errors.CourseName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.CourseName}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Form>
            )}
        </Formik>
    );


};

export default GradesForm;
