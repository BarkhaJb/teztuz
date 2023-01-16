import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import '../../css/style.css';
import { Formik } from 'formik';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import IntroVideo from './IntroVideo';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const recaptchaRef = React.createRef();

const SignInForm = () => {
    const [video, setVideo] = useState(false);
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string()
    });

    const siteKey = window.location.href.toString().includes('localhost') ? '6LeEg4IhAAAAAHNplZ3-mC8woFap7YRj2h_280lI' : '6Lfds40hAAAAAPhJozVpsZi8wAcUznYvWRQ6DKlH';

    const navigate = useNavigate();

    function FormExample() {
        const handleSubmit = async (values) => {
            const resData = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, values, {
                validateStatus: () => true
            });
            if (resData && resData.status === 200) {
                const user = {
                    username: resData.data.user.username,
                    email: resData.data.user.email,
                    // userName: true
                    userId: resData.data.user.isAdmin
                };
                const token = resData.data.token;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('jwt', token);
                //setVideo(true);
                if (recaptchaRef.current.props.grecaptcha.getResponse().length !== 0) {
                    //your condition
                    if (localStorage.getItem('TeztUrl')) {
                        navigate(localStorage.getItem('TeztUrl'));
                        // window.location.href = localStorage.getItem('TeztUrl');
                    }
                    // navigate('/subjects');
                    else window.location.href = '/subjects';
                    localStorage.removeItem('TeztUrl');
                } else {
                    toast.error('Verification required');
                }

                console.log(localStorage.getItem('jwt'));
            } else if (resData && resData.status === 400) {
                toast.error('Password incorrect', {
                    position: 'top-right',
                    theme: 'colored',
                    autoClose: 5000,
                    hideProgressBar: false
                });
            } else if (resData && resData.status === 404) {
                toast.error('User not found', {
                    position: 'top-right',
                    theme: 'colored',
                    autoClose: 5000,
                    hideProgressBar: false
                });
            }
        };

        return (
            <Formik
                validationSchema={schema}
                a
                onSubmit={handleSubmit}
                initialValues={{
                    username: '',
                    password: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
                    <Form noValidate onSubmit={handleSubmit} className="Signupmainform">
                        <div>
                            <Form.Group controlId="username" className="frmgrp">
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    isInvalid={!!errors.username}
                                    value={values.username}
                                    onChange={handleChange}
                                    isValid={touched.username && !errors.username}
                                />
                                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password" className="frmgrp">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    isInvalid={!!errors.password}
                                    value={values.password}
                                    onChange={handleChange}
                                    isValid={touched.password && !errors.password}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 " controlId="formBasicCheckbox">
                                <div className="captcha">
                                    <ReCAPTCHA ref={recaptchaRef} size="normal" sitekey={siteKey && siteKey} />
                                </div>
                            </Form.Group>
                        </div>

                        <Button type="submit" className="mt-3" onClick={handleSubmit}>
                            Sign In
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }
    return <>{<FormExample />}</>;
};

export default SignInForm;
