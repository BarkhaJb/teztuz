import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../css/main.css';
import { useCountdown } from 'react-countdown-circle-timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Footer from '../../Layouts/Footer';

const Deadline = () => {
    const [useranalytics, setUserAnalytics] = useState([
        {
            Average_time: '30sec',
            Timers_attempted: '4',
            Accuracy: 90
        },
        {
            Average_time: '10sec',
            Timers_attempted: '4',
            Accuracy: 60
        }
    ]);

    const { path, pathLength, stroke, strokeDashoffset, remainingTime, elapsedTime, size, strokeWidth } = useCountdown({ isPlaying: true, duration: 280, colors: '#abc' });
    useEffect(() => {
        // location.reload();
    }, []);
    useEffect(() => {}, [useranalytics]);

    return (
        <div>
            <div className="deadline">
                <div className="subjects-main pt-3 planners">
                    <Container>
                        <div className="deadline-btn">
                            <Button>Options</Button>
                            <Button>View More</Button>
                        </div>
                        <Row>
                            <Col sm={12} md={12} className="text-center text-white">
                                <h2>UPCOMING DEADLINES</h2> <p>Lorem ipsum dolor, sit amet consectetur</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={4} className="text-center timer text-white">
                                <CountdownCircleTimer isPlaying duration={100} strokeWidth={8} size={150} colors={['#1f88f1', '#00366d', '#A30000', '#1f88f1']} colorsTime={[100, 15, 20, 110]}>
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                                <h5>CALCULUS EXAM</h5>
                                <p>February 11, 2022</p>
                            </Col>
                            <Col sm={6} md={4} className="text-center timer text-white">
                                <CountdownCircleTimer isPlaying duration={130} strokeWidth={8} size={150} colors={['#1f88f1', '#5e9cde', '#A30000', '#1f88f1']} colorsTime={[100, 15, 20, 110]}>
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                                <h5>SCIENCE REPORT</h5>
                                <p>February 13, 2022</p>
                            </Col>
                            <Col sm={6} md={4} className="text-center timer text-white">
                                <CountdownCircleTimer isPlaying duration={150} strokeWidth={8} size={150} colors={['#1f88f1', '#00366d', '#A30000']} colorsTime={[100, 15, 20, 110]}>
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                                <h5>ENGLISH ESSAY</h5>
                                <p>February 12, 2022</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div className="black-footer">
                <Footer />
            </div>
        </div>
    );
};

export default Deadline;
