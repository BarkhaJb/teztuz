import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/main.css';
import { getLoggedUser } from '../../../helpers/utils';

const Tezt = () => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    const [userId, setUserId] = useState();
    const [studySets, setStudySets] = useState([]);
    const [progressBars, setProgressBars] = useState([]);

    // Fetch user id
    useEffect(() => {
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
    }, []);

    // Fetch all of user's study sets
    useEffect(() => {
        const fetchStudySets = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/user/` + userId);
                setStudySets(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (userId) {
            fetchStudySets();
        }
    }, [userId]);

    useEffect(() => {
        const fetchProgress = async (userId, studySetId) => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord/` + userId + '/' + studySetId);
                const progress = res.data.progress;
                setProgressBars((progressBars) => [...progressBars, progress]);
            } catch (err) {
                console.log(err);
            }
        };
        studySets.map((studySet) => {
            fetchProgress(userId, studySet._id);
        });
    }, [studySets]);

    const startStudySession = (studySetId) => {
        navigate('/study-session/' + studySetId);
    };

    const redirectToCreate = () => {
        navigate('/create-studySet');
    };

    return (
        <Row className="pt-4 m-0 w-100" style={{ maxWidth: '100%' }}>
            <Col sm={12} md={12}>
                {studySets.map((val, index) => {
                    return (
                        <Row key={index} className="my-3 mx-0" style={{ maxWidth: '100%' }}>
                            <Col sm={4} className="text-white d-flex align-items-center flex-wrap">
                                <Link to="/start-tezt">
                                    <img src="../assets/22.png" onClick={() => startStudySession(val._id)} />
                                </Link>
                                <p className="ms-2 mb-0">{val.title}</p>
                            </Col>

                            <Col sm={7} xs={10} className="mt-4">
                                <ProgressBar label={progressBars[index]} now={progressBars[index]} variant="" className="user-progress" />
                            </Col>
                            <Col sm={1} xs={2} className="mt-4">
                                <p className="text-white">{progressBars[index]}%</p>
                            </Col>
                        </Row>
                    );
                })}
            </Col>
            <Col sm={12} md={12}>
                <Row style={{ maxWidth: '100%' }}>
                    <Col sm={12} md={12}>
                        <div className="addsubjects">
                            <img src="../assets/pluss.png" onClick={() => redirectToCreate()} />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Tezt;
