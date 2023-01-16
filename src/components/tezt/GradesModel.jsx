import React, { useState } from 'react';
import { Row, Col, Form, Modal, Container } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
const GradesModel = () => {
    const schema = yup.object().shape({
        userName: yup.string().required()
    });

    const handleSubmit = (values) => {
        alert(values, 'data');
    };
    return (
        <>
            <Formik
                validationSchema={schema}
                a
                onSubmit={handleSubmit}
                initialValues={{
                    Question: '',
                    answer: ''
                }}
            >
                {({ handleSubmit }) => (
                    <Form style={{ width: '100%' }} noValidate onSubmit={handleSubmit} className="">
                        <Container className="gradesmodelbox">
                            <Row className=" question-row">
                                <Col sm={10} md={6} className="questionblock">
                                    <Form.Group controlId="" className="">
                                        <Form.Control disabled type="text" as="textarea" rows={15} name="question" placeholder="Question" />
                                    </Form.Group>
                                </Col>
                                <Col sm={10} md={6} className="answerinmodel">
                                    <Form.Group controlId="answer" className="">
                                        <Form.Control disabled type="text" as="textarea" rows={15} name="answer" placeholder="Answer" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-end">
                                <img src="../assets/check-mark (1).png" className="me-2 cursor-pointer" />
                                <img src="../assets/x.png" className="cursor-pointer" />
                            </div>
                        </Container>
                    </Form>
                )}
            </Formik>
            <div className="modelsarrows">
                <img src="../assets/chevron-left.svg" className="ps-2 tezt-left-arrow" />
                <img src="../assets/chevron-right.svg" className="ps-2 tezt-right-arrow" />
            </div>
        </>
    );
};

export default GradesModel;
