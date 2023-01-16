import React from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { getLoggedUser } from '../../helpers/utils';
const OTPForm = () => {

    const userdata = getLoggedUser();

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string()
    });

    function FormExample() {
        const handleSubmit = (values) => {
            const verificationData = {
                code: values,
                username: userdata.username,
                email: userdata.email,
                password: userdata.password,
            };
            console.log(verificationData);
        };
        return (
            <Formik
                validationSchema={schema}
                a
                onSubmit={handleSubmit}
                initialValues={{
                    otpvalue: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
                    <Form noValidate onSubmit={handleSubmit} className="Signupmainform">
                        <div>
                            <Form.Group controlId="otpvalue" className="frmgrp">
                                <Form.Control
                                    type="text"
                                    name="otpvalue"
                                    placeholder="First Name"
                                    isInvalid={!!errors.otpvalue}
                                    value={values.otpvalue}
                                    onChange={handleChange}
                                    isValid={touched.otpvalue && !errors.otpvalue}
                                />
                                <Form.Control.Feedback type="invalid">{errors.otpvalue}</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <Button type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }
    return (
        <>
            <FormExample />
        </>
    );
};

export default OTPForm;
