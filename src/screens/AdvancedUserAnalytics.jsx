import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ProgressBar, Button, NavDropdown, Form } from 'react-bootstrap';
import Header from '../Layouts/Header';
import '../css/main.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getLoggedUser } from '../helpers/utils';
import moment from 'moment';
import MyDate from '../components/feed/Date';

const AdvancedUserAnalytics = () => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    const [userId, setUserId] = useState();
    const location = useLocation();
    const [userAnalytics, setUserAnalytics] = useState([]);
    const finished_time = location.state.finishedUnder;
    const ave_time = location.state.averageTime;
    const [studySetName, setStudySetName] = useState();
    const [toggle, setToggle] = useState(false);
    const questions = location.state.questions;
    const [sorting, setSorting] = useState();
    const [filteringDays, setFilteringDays] = useState();
    const [finishedUsers, setFinishedUsers] = useState([]);
    const [allUsers, setallUsers] = useState([]);
    const [changeEmail, setChangeEmail] = useState();
    const sty1 = {
        backgroundColor: '#5cbe41'
    };
    const sty2 = {
        backgroundColor: '#ffeb3b'
    };
    const sty3 = {
        backgroundColor: '#e91e27'
    };
    const fetchUserId = async (email) => {
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
            const id = await axios.get(url);
            setUserId(id.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }

        const fetchStudySetName = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/studySet/` + location.state.studySetId);

            setStudySetName(res.data.title);
        };
        if (location.state.studySetId) {
            fetchUserId(user.email);
            fetchStudySetName();
        }
        if (allUsers.length > 0) {
            fetchUserId(user.email);
        }
        setFinishedUsers(JSON.parse(localStorage?.getItem('finishedTime')));
    }, [location.state.studySetId, navigate, user.email]);

    useEffect(() => {
        setallUsers(JSON.parse(localStorage?.getItem('AllUsers')));
    }, []);

    useEffect(() => {
        var currentDate = new Date();
        var date = null;

        if (filteringDays) {
            date = new Date(currentDate);
            date.setDate(date.getDate() - filteringDays);
        }

        const fetchUserAnaytics = async () => {
            setUserAnalytics([]);
            for (var i = 0; i < questions.length; i++) {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/uqAttempts/`, { params: { userId: userId, questionId: questions[i]._id, date: date } });

                const accuracy = (res.data?.correct / res.data.attempts) * 100;
                res.data.Accuracy = accuracy;
                setUserAnalytics((userAnalytics) => [...userAnalytics, res.data]);
            }
        };
        if (userId) {
            fetchUserAnaytics();
        }
    }, [userId, questions, filteringDays]);

    useEffect(() => {
        const sortByMostAttempted = () => {
            const sorted = userAnalytics.sort((a, b) => {
                return b.attempts - a.attempts;
            });
            setUserAnalytics(sorted);
            setToggle(!toggle);
        };
        const sortByLeastAttempted = () => {
            const sorted = userAnalytics.sort((a, b) => {
                return a.attempts - b.attempts;
            });
            setUserAnalytics(sorted);
            setToggle(!toggle);
        };
        const sortByLeastAccurate = () => {
            const sorted = userAnalytics.sort((a, b) => {
                return a.Accuracy - b.Accuracy;
            });
            setUserAnalytics(sorted);
            setToggle(!toggle);
        };
        const sortByMostAccurate = () => {
            const sorted = userAnalytics.sort((a, b) => {
                return b.Accuracy - a.Accuracy;
            });

            setUserAnalytics(sorted);
            setToggle(!toggle);
        };
        if (sorting === 'leastAttempted') {
            sortByLeastAttempted();
        }
        if (sorting === 'mostAttempted') {
            sortByMostAttempted();
        }
        if (sorting === 'leastAccurate') {
            sortByLeastAccurate();
        }
        if (sorting === 'mostAccurate') {
            sortByMostAccurate();
        }
        if (sorting === 'lastAttempted') {
            //  sortByLastAttempted();
        }
    }, [sorting, userAnalytics]);
    useEffect(() => {
        setSorting('mostAccurate');
        fetchUserId(user.email);
        setChangeEmail(user.email);
    }, []);

    return (
        <div>
            <div className="Header" id="SignuP">
                <Header />
            </div>
            <div className="user-analytics">
                <div className="main-anyltics">
                    <Container>
                        <Row>
                            <Col sm={12} md={9}>
                                <div className="d-flex text-white align-items-center">
                                    <div className="me-4">
                                        <img src="../assets/useranlytics.png" alt="useranalytcs" />
                                    </div>
                                    <div>
                                        <h3 className="d-block mt-2">USER ANALYTICS</h3>
                                        <p className="mb-0">{studySetName && studySetName}</p>
                                        <div className="avrg1">
                                            <p className="mb-1">Average time per question: {ave_time} seconds</p>
                                            <p>Finished in: {finished_time}</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12} md={3} className="text-white avrg pt-2">
                                <div className="avrg">
                                    <p>Average time per question: {ave_time} seconds</p>
                                    <p>Finished in: {finished_time}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="analytics-table">
                    <Container>
                        <div className="text-white sorts text-end pt-5 d-flex flex justify-content-end">
                            {allUsers?.length > 1 ? (
                                <Form.Select
                                    aria-label="Default select example"
                                    id="allusersselect"
                                    selected={user.email}
                                    onChange={(e) => {
                                        setSorting('lastAttempted');
                                        fetchUserId(e.target.value);
                                        setChangeEmail(e.target.value);
                                    }}
                                >
                                    <option disabled selected value={user.email}>
                                        Users
                                    </option>
                                    {allUsers?.map((user, i) => {
                                        return (
                                            <option key={i} value={user}>
                                                {user}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            ) : null}
                            <NavDropdown
                                title={
                                    <div className="pull-left ">
                                        <img className="thumbnail-image" src="../assets/sort (1).png" alt="user pic" /> Sort
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                className="useroption sort"
                            >
                                {user.email !== changeEmail ? (
                                    <NavDropdown.Item onClick={() => setSorting('lastAttempted')}>Last Attempted</NavDropdown.Item>
                                ) : (
                                    <>
                                        <NavDropdown.Item onClick={() => setSorting('mostAttempted')}>Most attempted</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => setSorting('leastAttempted')}>Least attempted</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => setSorting('mostAccurate')}>Most Accurate</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => setSorting('leastAccurate')}>Least Accurate</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => setSorting('lastAttempted')}>Last Attempted</NavDropdown.Item>
                                    </>
                                )}
                            </NavDropdown>
                            {/* ####### Filter  */}
                            <NavDropdown
                                title={
                                    <div className="pull-left ">
                                        <img className="thumbnail-image" src="../assets/flter.png" alt="user pic" /> Filter
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                className="useroption sort"
                            >
                                <NavDropdown.Item href="#" onClick={() => setFilteringDays(1)}>
                                    1 day
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => setFilteringDays(5)}>
                                    5 days
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => setFilteringDays(10)}>
                                    10 days
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => setFilteringDays(30)}>
                                    30 days
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <h3 className="text-white wrong-att">Number of wrong attempts per question</h3>
                        <div>
                            <Row className="my-4 user-progr">
                                <Col xs={2} className="text-white text-center"></Col>
                                <Col xs={4}></Col>
                                <Col xs={2} className="text-white text-center">
                                    Average Time
                                </Col>
                                <Col xs={2} className="text-white text-center">
                                    Times attempted
                                </Col>
                                <Col xs={2} className="text-white text-center">
                                    {/* Accuracy */}
                                </Col>
                            </Row>
                            <Row className="my-4 user-progress mb-0">
                                {userAnalytics.map((val, index) => {
                                    return (
                                        <div key={index} className="datamain-div">
                                            <Col xs={2} className="text-white prg">
                                                <span
                                                    className="score-signal"
                                                    style={
                                                        val.latestAttempt?.correct && sorting === 'lastAttempted'
                                                            ? sty1
                                                            : !val.latestAttempt?.correct && sorting === 'lastAttempted'
                                                            ? sty3
                                                            : val.Accuracy >= 75
                                                            ? sty1
                                                            : val.Accuracy < 75 && val.Accuracy >= 50
                                                            ? sty2
                                                            : sty3
                                                    }
                                                ></span>
                                                Question {index + 1}
                                            </Col>
                                            <Col xs={4} sm={4} className="m-auto analyticprogression">
                                                {sorting === 'lastAttempted' ? (
                                                    <ProgressBar
                                                        label={val.latestAttempt?.correct ? 100 : 0}
                                                        now={val.latestAttempt?.correct ? 100 : 0}
                                                        variant=""
                                                        className="user-progress analytics"
                                                    />
                                                ) : (
                                                    <ProgressBar label={val.Accuracy.toFixed(2)} now={val.Accuracy} variant="" className="user-progress analytics" />
                                                )}
                                            </Col>
                                            <Col xs={3} sm={2} className="text-white prg text-center">
                                                {sorting === 'lastAttemptedd' ? (
                                                    <> {Math.round((val?.latestAttempt?.timeSpent / 1000 + Number.EPSILON) * 100) / 100} secs</>
                                                ) : (
                                                    <> {Math.round((val?.averageTimeSpent / 1000 + Number.EPSILON) * 100) / 100} secs</>
                                                )}
                                            </Col>
                                            <Col xs={2} sm={2} className="text-white prg text-center">
                                                {sorting === '' ? 1 : val.attempts}
                                            </Col>
                                            <Col xs={1} sm={2} className="text-white prg text-center">
                                                {/* {sorting === 'lastAttempted' ? <> {val.latestAttempt?.correct ? '100%' : 0}</> : <> {Math.round((val.Accuracy + Number.EPSILON) * 100) / 100}%</>} */}
                                            </Col>
                                        </div>
                                    );
                                })}
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="py-4 bg-black">
                <Container>
                    <Row>
                        <Col xs={12} md={6} className="bottom-create">
                            <h2 className="text-white">
                                <b>{studySetName}</b>
                            </h2>
                            <div className="mb-1">
                                <p className="text-white">
                                    <MyDate />
                                </p>
                            </div>
                            <p className="mb-1">{user.username}</p>
                        </Col>
                        <Col xs={12} md={6} className="text-end createbtn">
                            <div className="gradient-border me-3 mt-4">
                                <Link to="/">
                                    <Button
                                        onClick={() => {
                                            localStorage.removeItem('AllUsers');
                                            localStorage.removeItem('finishedTime');
                                        }}
                                    >
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* <div className="bg-dark">
                <Footer />
            </div> */}
        </div>
    );
};

export default AdvancedUserAnalytics;
