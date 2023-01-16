import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Container, Form } from 'react-bootstrap';
import MyDate from '../components/feed/Date';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import { Formik } from 'formik';
import Header from '../Layouts/Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
const Grades = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [questionFields, setQuestionField] = useState([]);
    const { studyid } = useParams();
    const [correct, setCorrect] = useState([]);
    let userName = localStorage.getItem('user');

    useEffect(async () => {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/uqAttempts/study/${studyid}/${location.state.allAteampts}`);
        setQuestionField(res.data);
    }, []);

    console.log(location.state.currentStudySet.title);
    return (
        <>
            <div>
                <div className="Header" id="SignuP">
                    <Container>
                        <Header />
                    </Container>
                </div>
            </div>
            <div className="questionsection" style={{ paddingTop: '110px' }}>
                <Container>
                    <p className="backbtn" onClick={() => navigate(-1)} style={{ paddingBottom: '50px' }}>
                        <img src="../assets/leftt.svg" alt="go back" />
                    </p>
                    <Row>
                        <Col sm={12}>
                            <Form>
                                <div>
                                    {questionFields?.map((questionfield, index) => (
                                        <Row className="question-row justify-content-center" key={index}>
                                            <Col sm={10} md={1} className="questionblock ">
                                                <h5 className="text-white ps-2">{index + 1}</h5>
                                                <img src="../assets/max.png" className="me-2 cursor-pointer" />
                                            </Col>
                                            <Col sm={10} md={5} className="questionblock">
                                                <Form.Group controlId={questionfield.question}>
                                                    <Form.Label className="text-white">Question</Form.Label>
                                                    <div
                                                        style={{ minHeight: 300, color: '#fff', borderTop: '1px solid #fff' }}
                                                        name={(questionfield.question, index, 'question')}
                                                        dangerouslySetInnerHTML={{
                                                            __html: questionfield.questionId.question
                                                        }}
                                                        // value={questionfield.question}
                                                        placeholder="Question"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={10} md={5}>
                                                <Form.Group controlId={questionfield.question}>
                                                    <Form.Label className="text-white">Answer</Form.Label>
                                                    <Form.Control disabled type="text" as="textarea" value={questionfield.userAnswer} rows={5} name={questionfield.answer} placeholder="answer" />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={1} className="studyanswers check-cros">
                                                {questionfield.correct ? (
                                                    <img src="../assets/check-mark (1).png" className="me-2 cursor-pointer" alt="check" />
                                                ) : (
                                                    <img src="../assets/check-mark.png" className="me-2 cursor-pointer" alt="check" />
                                                )}
                                                {!questionfield.correct ? (
                                                    <img src="../assets/xg.png" className="cursor-pointer" alt="cross" />
                                                ) : (
                                                    <img src="../assets/x.png" className="cursor-pointer" alt="cross" />
                                                )}
                                            </Col>
                                        </Row>
                                    ))}
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="py-5 bg-black">
                <Container>
                    <Row>
                        <Col xs={12} md={6} className="bottom-create">
                            <h2 className="text-white">
                                <b>{location.state.currentStudySet.title}</b>
                            </h2>
                            <div className="mb-1">
                                <p className="text-white">Date Taken: {moment(location.state.currentStudySet?.updatedAt).format('dddd, MMMM Do YYYY')}</p>
                            </div>
                            <h4 className="text-white">{JSON.parse(userName).username}</h4>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default Grades;
