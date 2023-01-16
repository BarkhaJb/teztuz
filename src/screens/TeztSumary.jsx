import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Summaryprogress from '../components/tezt/Summaryprogress';
import axios from 'axios';
import { getLoggedUser } from '../helpers/utils';
import { SocketContext } from '../context/SocketContext';
const TeztSummary = () => {
    const user = getLoggedUser();
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [userId, setUserId] = useState();
    const location = useLocation();
    const total_time_ms = location.state.timeSpent.reduce((partialSum, a) => partialSum + a, 0);
    const averageTime = Math.round((total_time_ms / location.state.timeSpent.length / 1000 + Number.EPSILON) * 100) / 100;
    const finishedUnder = Math.round((total_time_ms / 1000 / 60 + Number.EPSILON) * 100) / 100;

    const { socketIO } = useContext(SocketContext);
    // States for auto grading
    const questions = location.state.questions;
    const userAnswers = location.state.userAnswers;
    const [progress, setProgress] = useState({});
    const [users, setUsers] = useState([]);
    const [finishedUsers, setFinishedUsers] = useState([]);

    const positions = ['First', 'Second', 'Third', 'Fourth'];

    useEffect(() => {
        if (socketIO) {
            socketIO.on('SHARE_STUDY_PROGRESS', async (data) => {
                if (location.state.studySetId == data.studySetId) {
                    setProgress({ [data.sender]: data.progress });
                    setFinishedUsers(JSON.parse(localStorage?.getItem('finishedTime')));
                }
            });
        }
    }, [socketIO]);

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
        const fetchUserId = async (email) => {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
                const id = await axios.get(url);
                setUserId(id.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserId(user.email);
        setFinishedUsers(JSON.parse(localStorage.getItem('finishedTime')));
    }, [navigate, user.email]);
    let attempts;
    let user_id;
    useEffect(async () => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
        const fetchUserId = async (email) => {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
                const id = await axios.get(url);

                setUserId(id.data);
                user_id = id.data;
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserId(user.email);
    }, [user]);

    const playerAnalytics = async () => {
        let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord/${userId}/${location.state.studySetId}`);
        attempts = res.data.attempt;
        console.log(attempts);
        // If mode is not Streak mode (Streak mode grades and uploads during the session)
        // If set to auto grade, mark questions here and upload analytics
        setTimeout(async () => {
            if (location.state.mode !== 'Streak') {
                let score = 0;
                for (var i = 0; i < questions.length; i++) {
                    const data = {
                        userId: userId,
                        questionId: questions[i]._id,
                        timeSpent: location.state.timeSpent[i],
                        attemps: '3',
                        userAnswer: userAnswers[i],
                        studySetId: location.state.studySetId,
                        attempt: attempts
                    };

                    if (questions[i].answer === userAnswers[i]) {
                        score = score + 1;
                        data.correct = true;
                    } else {
                        data.correct = false;
                    }

                    try {
                        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/uqAttempts`, data);
                    } catch (err) {
                        console.log(err);
                    }
                }
                // Upload score for graph in homepage
                const percentage = score / location.state.questions.length;
                try {
                    await axios.put(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord/uploadScoreAndTime`, {
                        userId: userId,
                        studySetId: location.state.studySetId,
                        score: percentage * 100,
                        timeSpent: total_time_ms
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            const data = {
                averageTime: averageTime,
                finishedUnder: finishedUnder,
                studySetId: location.state.studySetId,
                questions: location.state.questions
            };

            navigate('/user-analytics', { state: data });

            localStorage.setItem('finishedTime', JSON.stringify(users));
        }, 1000);
    };

    useEffect(() => {
        setProgress(location.state.progress);
        setUsers(Object?.keys(location.state.progress));
    }, [location.state]);
    // let totalTime = location.state.timeSpent.reduce((partialSum, a) => partialSum + a, 0);
    // const calculatedTime = Math.round((totalTime / 1000 / 60 + Number.EPSILON) * 100) / 100;

    const startGrading = async () => {
        // Pass the id of the user that is being marked as well
        location.state.userId = userId;
        navigate('/grade-tezt', { state: location.state });
    };

    function InitailModel(props) {
        return (
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter " className="playermodel" size="lg" centered>
                <Modal.Header className="gradetest text-end justify-content-end">
                    <img src="../assets/x-circlew.svg" onClick={() => setModalShow(false)} />
                </Modal.Header>
                <Modal.Body>
                    <Row className="study-modes-div1">
                        <h5 className="text-white text-center">We will notify you when you can beging grading the other user's teztz</h5>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <div className="">
                <div className="Header" id="SignuP">
                    <Header />
                </div>
            </div>
            <div className="questionsection" style={{ minHeight: '100vh' }}>
                <Container className="pt-5">
                    <p className="backbtn" onClick={() => navigate(-1)}>
                        <Button type="submit" className="exit">
                            Exit
                        </Button>
                    </p>
                    <div>
                        <div className="study-modes">
                            <Container fluid>
                                <Row className="study-modes-div1">
                                    <h3 className="text-center text-white mb-5 py-md-5">
                                        <b>Tezt Summary</b>
                                    </h3>
                                    <Col sm={10} md={6} className="sumary-progress">
                                        {users?.map((val, i) => (
                                            <Summaryprogress key={i} variantcolor="success" progresscolor={'three-progress'} noww={progress[val]} name={val} />
                                        ))}
                                    </Col>

                                    <Col sm={10} md={6}>
                                        <div className="completed-time-info">
                                            <p className="text-white">Average time per question: {averageTime} seconds</p>
                                            <p className="text-white">Finished in {finishedUnder} minutes</p>
                                        </div>
                                    </Col>
                                    <div className="py-md-5 my-sm-4 py-3">
                                        <h3 className="text-white text-center my-3 fs-4">
                                            {users.length > 1 ? `Congratulation you finished ${positions[finishedUsers?.indexOf(user.username)]}!` : null}
                                        </h3>
                                        <div className="teztbtns-row">
                                            <div className="positions-btns">
                                                {location.state.grading === 'Grade_Manually' && location.state.mode !== 'Streak' ? (
                                                    <Button className="me-4" onClick={() => startGrading()}>
                                                        Start Grading
                                                    </Button>
                                                ) : (
                                                    <Button onClick={() => playerAnalytics()}>Player Analytics</Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </Container>
                            <InitailModel show={modalShow} onHide={() => setModalShow(false)} />
                        </div>
                    </div>
                </Container>
            </div>
            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default TeztSummary;
