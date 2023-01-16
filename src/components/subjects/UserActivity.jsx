import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import '../../css/main.css';
import axios from 'axios';
import { LineChart, ResponsiveContainer, ScatterChart, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';

const UserActivity = ({ userId }) => {
    const navigate = useNavigate();
    const [teztCheck, setTeztCheck] = useState(false);
    const [screen, setCreen] = useState(false);

    const [studySets, setStudySets] = useState();
    const [currentStudySet, setCurrentStudySet] = useState();
    const [analytics, setAnalytics] = useState();
    // title of graph
    const [label, setLabel] = useState('Tezt Name');
    // x-axis labels
    const [highScore, setHighScore] = useState();
    // scores
    const [scores, setScores] = useState([]);
    // Hours studied
    const [timeSpent, setTimeSpent] = useState(0);
    const [mobileGrapgh, setMobileGrapgh] = useState(false);

    // Average time per question (for advanced analytics)
    // Questions
    const [questions, setQuestions] = useState();
    const [avgTimePerQ, setAvgTimePerQ] = useState();
    const [selectedTezt, setSelectedTezt] = useState(false);
    const [selectedTeztName, setSelectedTeztName] = useState();

    const [pdata, setpdata] = useState([]);
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 760) {
                setCreen(true);
            } else {
                setCreen(false);
            }
        });
    });

    useEffect(() => {
        const fetchStudySets = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/user/` + userId);

                // Remove blur if user has created a study set
                if (res.data.length > 0) {
                    setTeztCheck(false);
                } else setTeztCheck(true);
                setStudySets(res.data);
                var indexx = res.data
                    .map(function (val) {
                        return val.recent;
                    })
                    .indexOf(true);
                setCurrentStudySet(res.data[indexx]);
                setSelectedTeztName(res.data[indexx].title);

                setSelectedTezt(true);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId !== '') {
            fetchStudySets();
        }
    }, [userId]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord/${userId}/${currentStudySet._id}`);

                setAnalytics(res.data.record);
                setScores(res.data.record.scores);
                setHighScore(Math.max(...res.data.record?.scores));
                var data = [];
                for (var i = 0; i < res.data.record.scores.length; i++) {
                    const newValue = {
                        name: (i + 1).toString(),
                        Tezt: res.data.record?.scores[i]?.toFixed(2),
                        attempt: i + 1
                    };
                    data = [...data, newValue];
                }
                setpdata(data);
                setTimeSpent(res.data.record.timeSpent);
                res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/questions/studySets/${currentStudySet._id}`);
                setQuestions(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (currentStudySet) {
            setLabel(currentStudySet.title);
            fetchAnalytics();
        }
        fetchAnalytics();
    }, [currentStudySet, userId]);

    useEffect(() => {
        const fetchUQAttempts = async () => {
            try {
                var avgTimes = [];
                for (var i = 0; i < questions.length; i++) {
                    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/uqAttempts/`, { params: { userId: userId, questionId: questions[i]._id } });
                    avgTimes = [...avgTimes, res.data.averageTimeSpent];
                }

                const reducer = (accumulator, curr) => accumulator + curr;
                const sum = avgTimes.reduce(reducer);
                const avgTimeInMs = sum / avgTimes.length;
                var avgTime = ((avgTimeInMs % 60000) / 1000).toFixed(0);

                setAvgTimePerQ(avgTime);
            } catch (err) {
                console.log(err);
            }
        };

        if (questions) {
            fetchUQAttempts();
        }
    }, [questions]);

    const changeTezt = (e) => {
        setCurrentStudySet(studySets[e.target.value]);
        setSelectedTezt(true);
        setSelectedTeztName(studySets[e.target.value].title);
    };

    const advancedAnalytics = () => {
        if (currentStudySet) {
            const data = {
                studySetId: currentStudySet._id,
                finishedUnder: 'N/A',
                averageTime: avgTimePerQ,
                questions: questions
            };
            localStorage.removeItem('AllUsers');
            localStorage.removeItem('finishedTime');

            navigate('/advanced-user-analytics', { state: data });
        }
    };
    const handleLineClick = (data, index) => {
        let myData = {
            allAteampts: index.payload.attempt,
            currentStudySet: currentStudySet
        };
        navigate('/teztGrade/' + currentStudySet._id, { state: myData });
    };

    return (
        <div>
            <div className="user-activity" style={{ position: 'relative' }}>
                <div className="subjects-main">
                    <Container className="graph" style={teztCheck ? { filter: 'opacity(0.4)', pointerEvents: 'none' } : null}>
                        <div className="text-center">
                            <img src="../assets/graphbar.png" className="anly-arrow" alt="graph" style={{ maxWidth: '35px' }} />
                            <h3>Tezt Performance</h3>

                            <Form.Group controlId="tezt-score" className="mb-3">
                                <Form.Select onChange={changeTezt} disabled={teztCheck} className="form-control form-select" name="mode">
                                    {studySets?.length
                                        ? studySets.map((val, index) => {
                                              return (
                                                  <option value={index} key={index} selected={val.recent == true}>
                                                      {val.title}
                                                  </option>
                                              );
                                          })
                                        : null}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="userchart" onClick={() => setMobileGrapgh(!mobileGrapgh)}>
                            <ResponsiveContainer width="100%" height="300" aspect={screen ? 1 : 3}>
                                <LineChart data={selectedTezt ? pdata : pdata.length - 1} margin={{ right: 4.5, left: 0, bottom: 10, top: 4.5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 100]} allowDecimals={false}></YAxis>
                                    <Legend />
                                    <Tooltip />

                                    <Line
                                        currentStudySet={currentStudySet?.latestAttempt?.uid}
                                        isAnimationActive={false}
                                        type="monotone"
                                        dataKey="Tezt"
                                        stroke="#a7008a"
                                        activeDot={{ onClick: handleLineClick, stroke: 'a7008a', strokeWidth: 2, r: 4, test: currentStudySet?.latestAttempt?.uid }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="text-center performance" style={{ color: '#a7008a' }}>
                                {selectedTeztName ? selectedTeztName : 'Tezt'} Performance
                            </p>
                        </div>
                    </Container>
                </div>
                {teztCheck ? (
                    <div className="checktztmain">
                        <div className="checktezt">
                            <p className="m-auto">You have not yet started this feature Get started by creating a tezt</p>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="bg-white pt-2 text-black activtytbtm mt-1">
                <Container fluid>
                    <Row className="py-2 totalhours-row">
                        <Col xs={12} sm={3} className="text-black text-center advanced-user">
                            <h3>
                                <b> User Analytics</b>
                            </h3>
                            <div className="advanced">
                                <Button
                                    onClick={() => {
                                        advancedAnalytics();
                                    }}
                                >
                                    Advanced Analytics
                                </Button>
                            </div>
                        </Col>
                        <Col xs={3} className="text-black text-center">
                            <h6>
                                <b>Total Hours Studied</b>
                            </h6>
                            <p className="mb-0">
                                {timeSpent[timeSpent.length - 1]
                                    ? // convert from ms to hours
                                      Number(((timeSpent?.reduce((partialSum, a) => partialSum + a, 0) / (1000 * 60 * 60)) % 24).toPrecision(2)) + ' hours'
                                    : 0}
                            </p>
                        </Col>
                        <Col xs={3} sm={2} className="text-black text-center">
                            <h6>
                                <b>High score</b>
                            </h6>
                            <p className="mb-0">{highScore > 0 ? highScore.toFixed(2) : 'N/A'}</p>
                        </Col>
                        <Col xs={3} sm={2} className="text-black text-center">
                            <h6>
                                <b>Total Run Throughs</b>
                            </h6>
                            <p className="mb-0">{scores ? scores.length : 0}</p>
                        </Col>
                        <Col xs={3} sm={2} className="text-black text-center">
                            <h6>
                                <b>Latest Score</b>
                            </h6>
                            <p className="mb-0">{scores[scores.length - 1] ? scores[scores.length - 1].toFixed(2) : 'N/A'}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default UserActivity;
