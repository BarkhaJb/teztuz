import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiUrl } from '../../config';

const ContactForm = () => {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        name: yup.string().required().required('This field is required'),
        email: yup.string().email('Invalid email format').required('This field is required'),
        subject: yup.string().required('This field is required'),
        message: yup.string().required('This field is required')
    });

    const notify = () =>
        toast.success('Message sent successfully', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 2000,
            hideProgressBar: false
        });

    const handleSubmit = async (values) => {
        try {
            const resData = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/contact`, values, {
                validateStatus: () => true
            });

            if (resData && resData.status === 200) {
                notify();
                navigate('/');
            }
        } catch (err) {}
    };

    return (
        <Formik
            validationSchema={schema}
            a
            onSubmit={handleSubmit}
            initialValues={{
                name: '',
                email: '',
                subject: '',
                message: ''
            }}
        >
            {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className="Signupmainform">
                    <div className="contact-from">
                        <Form.Group controlId="name" className="frmgrp">
                            <Form.Control type="text" name="name" placeholder="Name" isInvalid={!!errors.name} value={values.name} onChange={handleChange} isValid={touched.name && !errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email" className="frmgrp">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="email"
                                isInvalid={!!errors.email}
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="subject" className="frmgrp">
                            <Form.Control type="text" name="subject" placeholder="Subject" isInvalid={!!errors.subject} onChange={handleChange} isValid={touched.subject && !errors.subject} />
                            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="message" className="frmgrp">
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={6}
                                name="message"
                                placeholder="Message"
                                isInvalid={!!errors.message}
                                onChange={handleChange}
                                isValid={touched.message && !errors.message}
                            />
                            <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="submit-main mt-3 d-flex justify-content-between align-items-center">
                        <p className="text-white pt-3" style={{ width: '80%' }}>
                            Lorem ipsum dolor sit amet consecte uLorem ipsum dolor sit amet consectetu
                        </p>
                        <Button type="submit" className="c-submit">
                            Send
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default ContactForm;
