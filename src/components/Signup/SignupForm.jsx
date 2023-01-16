import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useState, useContext } from 'react';
import axios from 'axios';
import { getLoggedUser } from '../../helpers/utils';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { ApiUrl } from '../../config';

const SignupForm = () => {
    const [formsuccess, setFormsuccess] = useState(false);
    const [otpfield, setOTP] = useState('');
    const userdata = getLoggedUser();
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userData, setUserdata] = useState();
    const [inValidCode, setInvalidCode] = useState();
    const navigate = useNavigate();

    const [allUsers, setAllUsers] = useState([]);
    const uppercaseRegex = new RegExp('(?=.*[A-Z])');
    const lowercaseRegex = new RegExp('(?=.*[a-z])');
    const numbercaseRegex = new RegExp('(?=.*[0-9])');
    const mincharacter = new RegExp(/.{8,30}/);
    const specialCharacterRegex = new RegExp('(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*.,]');

    const schema = yup.object().shape({
        username: yup.string().required('This field is required'),
        firstName: yup.string(),
        lastName: yup.string(),
        email: yup.string().email('Invalid email format').required('This field is required'),
        password: yup
            .string()
            .required('This field is required')
            .matches(uppercaseRegex, 'Password does not have uppercase.')
            .matches(lowercaseRegex, 'Password does not have lowercase.')
            .matches(numbercaseRegex, 'Password does not have number.')
            .matches(specialCharacterRegex, 'Password does not have special character.')
            .matches(mincharacter, 'Password must have minimum 8 characters'),
        confirm_password: yup.string().when('password', {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref('password')], 'Both password needs to be the same')
        }),
        dateofbirth: yup.date().max(new Date(), 'Please choose Past date').required(),
        referalcode: yup.string(),
        school: yup.string().required('This field is required'),
        grade: yup.string(),
        hearabout: yup.string()
    });

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`);
                setAllUsers(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUsers();
    }, []);

    const fetchUserId = async (email) => {
        try {
            console.log(email);
            const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
            console.log(url);
            const id = await axios.get(url);
            setUserId(id);
        } catch (err) {
            console.log(err);
        }
    };

    const OtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const verificationData = {
                code: otpfield,
                email: userdata.email
            };
            var resData = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/verifyOtp`, verificationData, {
                validateStatus: () => true
            });

            if (resData && resData.status === 200) {
                // Update user isVerified
                verified();
                setInvalidCode('');
                alert('user verified');
                login();
                navigate('/subjects');
            } else if (resData && resData.status === 404) {
                alert('Invalid verification code');
                setInvalidCode('Invalid verification code');
            } else if (resData && resData.status === 409) {
                alert('User already exist');
            } else if (resData && resData.status === 410) {
                alert('Code has expired');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const login = async () => {
        const values = {
            username: userdata.username,
            password: userPassword
        };
        const resData = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, values, {
            validateStatus: () => true
        });
        console.log(resData);
        if (resData && resData.status === 200) {
            console.log(resData);
            const user = {
                username: resData.data.user.username,
                email: resData.data.user.email
            };
            const token = resData.data.token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('jwt', token);

            //setVideo(true);
            navigate('/subjects');
            console.log(localStorage.getItem('jwt'));
        }
    };

    // Set isVerified to true
    const verified = async () => {
        console.log(userId.data);
        const url = `${process.env.REACT_APP_BASE_URL}/api/users/` + userId.data;
        try {
            const resData = await axios.put(
                url,
                { isVerified: true },
                {
                    validateStatus: () => true
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
    const reSendotp = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/resendotp`, userData, {
                validateStatus: () => true
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (values) => {
        const user = {
            username: values.username,
            email: values.email
        };
        localStorage.setItem('user', JSON.stringify(user));
        try {
            const userData = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, values, {
                validateStatus: () => true
            });
            setUserdata(values);
            if (userData && userData.status === 409) {
                const message = userData.data;
                console.log(message);
                toast.error(message, {
                    position: 'top-right',
                    theme: 'colored',
                    autoClose: 5000,
                    hideProgressBar: false
                });
            } else if (userData && userData.status === 200) {
                setFormsuccess(true);
                setUserPassword(values.password);
                fetchUserId(userData.data.email);
            } else if (userData && userData.status === 400) {
                const message = userData.data;
                toast.error(message, {
                    position: 'top-right',
                    theme: 'colored',
                    autoClose: 5000,
                    hideProgressBar: false
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    function FormExample() {
        // Actual method

        // Check if username is already in use
        const checkUsername = (value) => {
            let found = false;
            for (var i = 0; i < allUsers.length; i++) {
                if (value === allUsers[i].username) {
                    // setValidUsername(true);
                    found = true;
                }
            }
            return found;
        };

        // Check if email is already in use
        const checkEmail = (value) => {
            let found = false;
            for (var i = 0; i < allUsers.length; i++) {
                if (value === allUsers[i].email) {
                    // setValidEmail(false);
                    found = true;
                }
            }
            return found;
        };

        const [formStep, setformstep] = React.useState(0);
        const cmpFrom = () => {
            setformstep((cur) => cur + 1);
        };
        const cmpFrom1 = () => {
            setformstep((cur) => cur - 1);
        };
        const formButton = (validateForm, isValid) => {
            if (formStep > 1) {
                return undefined;
            } else if (formStep === 1) {
                return (
                    <img
                        src="../assets/chevron-left.svg"
                        style={{ cursor: 'pointer', display: 'block', marginLeft: 'auto', width: '40px' }}
                        alt="formsteparrow"
                        onClick={() => {
                            cmpFrom1();
                        }}
                    />
                );
            } else {
                return (
                    <img
                        src="../assets/chevron-right.svg"
                        style={{ cursor: 'pointer', display: 'block', marginLeft: 'auto', width: '40px' }}
                        alt="formsteparrow"
                        onClick={() => {
                            validateForm().then((errors) => {
                                console.log(errors);

                                let e = Object.keys(errors);
                                console.log(e);
                                let test = ['username', 'firstName', 'lastName', 'email', 'password', 'confirm_password', 'dateofbirth'].some((r) => e.includes(r));
                                if (!test) {
                                    cmpFrom();
                                }
                            });
                        }}
                    />
                );
            }
        };
        return (
            <Formik
                validate={(values) => {
                    const errors = {};

                    const userName = checkUsername(values.username);
                    const email = checkEmail(values.email);
                    if (email) {
                        errors.email = 'Email already exist';
                    }

                    if (userName) {
                        errors.username = 'Username already exist';
                    }
                    return errors;
                }}
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    username: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                    dateofbirth: '',
                    referalcode: '',
                    school: '',
                    grade: '',
                    hearabout: ''
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, validateForm }) => (
                    <Form noValidate onSubmit={handleSubmit} className="Signupmainform">
                        {formStep === 0 && (
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
                                <Form.Group controlId="firstName" className="frmgrp">
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        isInvalid={!!errors.firstName}
                                        value={values.firstName}
                                        onChange={handleChange}
                                        isValid={touched.firstName && !errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="lastName" className="frmgrp">
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        isInvalid={!!errors.lastName}
                                        value={values.lastName}
                                        onChange={handleChange}
                                        isValid={touched.lastName && !errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="email" className="frmgrp">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        isInvalid={!!errors.email}
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="password" className="frmgrp">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        isInvalid={!!errors.password}
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="confirm_password" className="frmgrp">
                                    <Form.Control
                                        type="password"
                                        name="confirm_password"
                                        placeholder="confirm password"
                                        isInvalid={!!errors.confirm_password}
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        isValid={touched.confirm_password && !errors.confirm_password}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.confirm_password}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="dateofbirth" className="frmgrp" style={{ maxWidth: '80%' }}>
                                    <Form.Control
                                        type="date"
                                        name="dateofbirth"
                                        placeholder="Date of Birth"
                                        value={values.dateofbirth}
                                        isInvalid={!!errors.dateofbirth}
                                        onChange={handleChange}
                                        isValid={touched.dateofbirth && !errors.dateofbirth}
                                    />
                                    {/* {errors.username ? 'Date is required' : null} */}
                                    <Form.Control.Feedback type="invalid">{errors.dateofbirth}</Form.Control.Feedback>
                                    <p className="dateval">Date must not greater that current date.</p>
                                </Form.Group>
                                <p className="have-acc">
                                    Already have an account ? <Link to="/signin">Sign In</Link>
                                </p>
                            </div>
                        )}
                        {formStep === 1 && (
                            <div>
                                <Form.Group controlId="referalcode" className="frmgrp">
                                    <Form.Control
                                        type="text"
                                        name="referalcode"
                                        placeholder="Referral code (optional)"
                                        isInvalid={!!errors.referalcode}
                                        value={values.referalcode}
                                        onChange={handleChange}
                                        isValid={touched.referalcode && !errors.referalcode}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.referalcode}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="school" className="frmgrp">
                                    <Form.Control
                                        type="text"
                                        name="school"
                                        placeholder="School:"
                                        isInvalid={!!errors.school}
                                        value={values.school}
                                        onChange={handleChange}
                                        isValid={touched.school && !errors.school}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.school}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="grade" className="frmgrp">
                                    <Form.Control
                                        type="text"
                                        name="grade"
                                        placeholder="Grade/Year:"
                                        isInvalid={!!errors.grade}
                                        value={values.grade}
                                        onChange={handleChange}
                                        isValid={touched.grade && !errors.grade}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.grade}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="hearabout" style={{ maxWidth: '80%' }}>
                                    <Form.Label className="ps-2">How did you hear about us:</Form.Label>

                                    <Form.Control name="hearabout" className="hear" as="select" placeholder="Select" onChange={handleChange}>
                                        <option value=""></option>
                                        <option value="Youtube">Youtube</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="Friend">Friend</option>
                                        <option value="News/Publications">News/Publications</option>
                                        <option value="Other">Other</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">{errors.hearabout}</Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className="mt-3">
                                    Sign up
                                </Button>
                                <p className="have-acc">
                                    Already have an account ? <Link to="/signin">Sign In</Link>
                                </p>
                            </div>
                        )}

                        {formButton(validateForm, isValid)}
                        <div className="text-end mt-5"></div>
                    </Form>
                )}
            </Formik>
        );
    }

    return (
        <>
            {!formsuccess ? (
                <FormExample />
            ) : (
                <>
                    <h3 className="text-white text-center mb-3" style={{ fontSize: '22px' }}>
                        Get started by confirming your email address.
                    </h3>
                    <Form className="otpform" onSubmit={OtpSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control style={{ margin: 'auto' }} type="text" placeholder="Enter Verification Code" onChange={(e) => setOTP(e.target.value)} />
                            <p className="text-center text-danger my-2">{inValidCode}</p>
                        </Form.Group>
                        <div className="otp-button">
                            <p onClick={reSendotp} className="mb-0 otp-btn verification">
                                Resend Verification code
                            </p>
                            <Button type="submit" className="mt-1 otp-btn">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </>
            )}
        </>
    );
};

export default SignupForm;
