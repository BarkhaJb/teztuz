import React, { useState } from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import TimePicker from 'react-time-picker';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const StudyAdminMode = ({ teztData }) => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState();
    const [hasBookMarked, sethasBookMarked] = useState(false);
    const [studyMode, setStudyMode] = useState('Tezt');
    const [valueTime, setValueTime] = useState('10:00:00');
    const schema = yup.object().shape({
        mode: yup.string(),
        q_type: yup.string(),
        invite: yup.string(),
        timer: yup.string(),
        order: yup.string(),
        grading: yup.string(),
        customtime: yup.string()
    });
    console.log('t2', teztData);

    const { studySetId } = useParams();

    useEffect(async () => {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/questions/studySets/` + studySetId);
        res.data.map((q) => {
            if (q.bookmark == true) {
                sethasBookMarked(true);
            }
        });
    }, []);

    const SwitchCase = () => {
        switch (studyMode) {
            case 'Tezt':
                return 'Tezt contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral contentgeneral content';
            case 'General':
                return 'general content';
            case 'Flash':
                return 'flash content ';
            case 'Streak':
                return 'streak content';
            case 'Improve':
                return 'improve content';
            default:
                return 'Select';
        }
    };

    const handleSubmit = async (values) => {
        let newvalues = { ...values, valueTime, teztData };
        console.log('values', newvalues);
        if (values.q_type == 'bookmark' && hasBookMarked == false) {
            toast.error('No Bookmark Questions Available', {
                position: 'top-right',
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false
            });
        } else if (values.invite === 'Solo') {
            // If tezt mode, redirect to tezt mode pag
            if (values.mode === 'Tezt') {
                navigate('/tezt-admin-mode/' + studySetId, { state: newvalues });
            } else {
                navigate('/start-admin-tezt/' + studySetId, { state: newvalues });
            }
        } else {
            navigate('/invite/' + studySetId, { state: newvalues });
        }
        const upDatedStudySet = {};

        await axios.put(`${process.env.REACT_APP_BASE_URL}/api/studySets/study/${studySetId}`, upDatedStudySet);
    };

    return (
        <div>
            <div className="mode-area">
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        mode: 'Tezt',
                        q_type: 'normal',
                        invite: 'Solo',
                        timer: 'no_timer',
                        Difficulty: 'Easy',
                        noOfQuestion: '10',
                        improved: 'none',
                        customtime: 'none',
                        bookmark: 'none'
                    }}
                >
                    {({ handleSubmit, handleChange, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} className="study-modes Signupmainform studyseson">
                            <Container fluid>
                                <Row className="studymodeselect">
                                    <Col sm={6} md={4}>
                                        <Form.Group controlId="hearabout" className="mb-3">
                                            <Form.Label>Mode</Form.Label>
                                            <Form.Select
                                                className="form-control form-select"
                                                name="mode"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setStudyMode(e.target.value);
                                                }}
                                            >
                                                <option value="Tezt" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                                                    Tezt
                                                </option>

                                                <option value="General">General</option>

                                                <option value="Flash" data-toggle="tooltip" data-placement="top" title="Hooray!">
                                                    Flash
                                                </option>
                                                <option value="Streak">Streak</option>
                                                <option value="Improve">Improve</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">{errors.hearabout}</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="hearabout">
                                            <Form.Label>Question Type</Form.Label>

                                            <Form.Select className="form-control form-select" name="q_type" placeholder="Select" onChange={handleChange}>
                                                <option value="normal">Normal</option>
                                                <option value="bookmark">Bookmarked</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">{errors.hearabout}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Group controlId="hearabout" className="mb-3">
                                            <Form.Label>Invite</Form.Label>
                                            <Form.Select className="form-control form-select" name="invite" placeholder="Select" onChange={handleChange}>
                                                <option defaultValue="Solo">Solo</option>
                                                {studyMode !== 'Tezt' ? <option value="multiplayer">Invite a friend</option> : null}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group controlId="hearabout" className="mb-3">
                                            <Form.Label>No of Questions</Form.Label>
                                            <Form.Select className="form-control form-select" name="invite" placeholder="Select" onChange={handleChange}>
                                                <option defaultValue="Solo">10</option>
                                                <option defaultValue="Solo">20</option>
                                                <option defaultValue="Solo">50</option>
                                                <option defaultValue="Solo">100</option>
                                                <option defaultValue="Solo">150</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Form.Group controlId="hearabout" className="mb-3">
                                            <Form.Label>Difficulty</Form.Label>

                                            <Form.Select className="form-control form-select" name="order" placeholder="Select" onChange={handleChange}>
                                                <option value="Ordered">Easy</option>
                                                <option value="shuffled">Medium</option>
                                                <option value="shuffled">Difficult</option>
                                            </Form.Select>
                                        </Form.Group>
                                        {/* {studyMode !== 'Tezt' && studyMode !== 'Streak' ? (
                                            <Form.Group controlId="hearabout" className="mb-3">
                                                <Form.Label>Grading</Form.Label>
                                                <Form.Select className="form-control form-select" name="grading" onChange={handleChange}>
                                                    <option value="Grade_Automatically">Grade Automatically</option>
                                                    <option value="Grade_Manually">Grade Manually</option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">{errors.hearabout}</Form.Control.Feedback>
                                            </Form.Group>
                                        ) : null} */}
                                        <Form.Group style={studyMode !== 'Tezt' ? null : { pointerEvents: 'none' }} controlId="hearabout" className="mb-3">
                                            <Form.Label>Timer {studyMode !== 'Tezt' ? '' : 'not available on tezt mode'}</Form.Label>

                                            <Form.Select
                                                className="form-control form-select"
                                                name="timer"
                                                placeholder="Select"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setTimer(e.target.value);
                                                }}
                                            >
                                                <option value="no_timer">No Timer</option>
                                                <option value="30-sec">30 sec</option>
                                                <option value="1-min">1 min</option>
                                                <option value="2-min">2 min</option>
                                                <option value="Other">Other</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">{errors.hearabout}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        {timer == 'Other' && studyMode !== 'Tezt' ? (
                                            <>
                                                <Form.Label className="d-block">Custom Time</Form.Label>
                                                <TimePicker
                                                    style={{ width: '100%' }}
                                                    format="hh:mm:ss"
                                                    maxDetail="second"
                                                    isOpen={false}
                                                    onChange={setValueTime}
                                                    clearIcon
                                                    hourPlaceholder="HH"
                                                    minutePlaceholder="MM"
                                                    secondPlaceholder="SS"
                                                    placeholder="HH:MM:SS"
                                                    placeholderText={'Please select a date'}
                                                    defaultValue={valueTime}
                                                />
                                                {/* {valueTime} */}
                                            </>
                                        ) : null}
                                    </Col>
                                </Row>
                                <Button type="submit" className="mt-3" id="studymodes">
                                    Continue
                                </Button>
                            </Container>
                        </Form>
                    )}
                </Formik>
                <div className="descriptor-area">
                    <div className="descriptor-mode">
                        <p className="descriptor-para">
                            <SwitchCase />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyAdminMode;
