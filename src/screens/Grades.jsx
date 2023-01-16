import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Container, Tabs, Tab, Nav } from 'react-bootstrap';
import MyDate from '../components/feed/Date';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import GradesForm from '../components/tezt/GradeForm';
import GradesQuestion from '../components/tezt/GradesQuestions';
import axios from 'axios';
const Grades = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Sets the user that's being marked
    const [username, setUsername] = useState();
    const [correct, setCorrect] = useState([]);
    const [score, setScore] = useState(0);
    const [Title, setTitle] = useState();
    const [SchoolName, setSchoolName] = useState();
    const [Description, setDescription] = useState();
    const [CourseName, setCourseName] = useState();
    const [CourseNames, setCourseNames] = useState();
    const [attempts, setAttempts] = useState();
    const userId = location.state.userId;
    const total_time_ms = location.state.timeSpent.reduce((partialSum, a) => partialSum + a, 0);
    const averageTime = Math.round((total_time_ms / location.state.timeSpent.length / 1000 + Number.EPSILON) * 100) / 100;
    const finishedUnder = Math.round((total_time_ms / 1000 / 60 + Number.EPSILON) * 100) / 100;
    const [gradeTab, setGradeTab] = useState(['kafayat', 'adeel', 'hamza']);
    useEffect(() => {
        const fetchStudySetDetails = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/studySet/` + location.state.studySetId);
            setTitle(res.data.title);
            setSchoolName(res.data.SchoolName);
            setDescription(res.data.description);
            setCourseName(res.data.CourseName);
        };
        // Sets the user that's being marked
        const fetchUsername = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/` + location.state.userId);
            setUsername(res.data.username);
        };
        fetchStudySetDetails();
        fetchUsername();
    }, [location.state]);
    useEffect(async () => {
        let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord/${userId}/${location.state.studySetId}`);
        setAttempts(res.data.attempt);
    }, []);
    const submit = async () => {
        if (correct.includes(undefined)) {
            alert('Please finish marking all the questions');
        } else {
            let totalTimeSpent = 0;
            console.log(attempts, '-------');
            for (var i = 0; i < location.state.questions.length; i++) {
                totalTimeSpent = totalTimeSpent + location.state.timeSpent[i];
                const data = {
                    userId: userId,
                    questionId: location.state.questions[i]._id,
                    timeSpent: location.state.timeSpent[i],
                    correct: correct[i],
                    studySetId: location.state.studySetId,
                    userAnswer: location.state.userAnswers[i],
                    attempt: attempts
                };
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
                    timeSpent: totalTimeSpent
                });
            } catch (err) {
                console.log(err);
            }
            const data = {
                averageTime: averageTime,
                finishedUnder: finishedUnder,
                studySetId: location.state.studySetId,
                questions: location.state.questions
            };
            navigate('/user-analytics', { state: data });
        }
    };
    useEffect(() => {
        setCourseNames(gradeTab[0]);
    }, []);
    return (
        <>
            <div>
                <div className="Header" id="SignuP">
                    <Container>
                        <Header />
                    </Container>
                </div>
                <div className="study-content">
                    <Container>
                        <div className="studydivform">
                            <div className="study-block">
                                <p className="backbtn" onClick={() => navigate(-1)}>
                                    <img src="../assets/leftt.svg" alt="go back" />
                                </p>
                                <h1 className="text-white text-center my-4">GRADE TEST</h1>
                                <h1 className="text-white text-center my-4">
                                    Final Grade: {score}/{location.state.questions.length}
                                </h1>
                                <GradesForm Title={Title} SchoolName={SchoolName} Description={Description} CourseName={CourseName} />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="questionsection">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <GradesQuestion setScore={setScore} correct={correct} setCorrect={setCorrect} />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="py-5 bg-black">
                <Container>
                    <Row>
                        <Col xs={12} md={6} className="bottom-create">
                            <p>
                                <MyDate />
                            </p>
                            <p>{username ? username : 'user'}</p>
                        </Col>
                        <Col xs={12} md={6} className="text-end createbtn">
                            <div className="gradient-border me-3">
                                <Button onClick={submit}>Submit</Button>
                            </div>
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
