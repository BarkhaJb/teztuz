import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Container, Modal, DropdownButton, ProgressBar, Dropdown } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
const Tezt = () => {
    const [showAns, setShowAns] = useState(false);
    const questionsAndAnswers = [
        {
            _id: 1,
            q: 'Question 1',
            a: 'Answer 1'
        },

        {
            _id: 2,
            q: 'Question 2',
            a: 'Answer 2'
        },

        {
            _id: 3,
            q: 'Question 3',
            a: 'Answer 3'
        },

        {
            _id: 4,
            q: 'Question 4',
            a: 'Answer 4'
        }
    ];

    const [defaultQuestion, setDefaultQuestion] = useState(0);
    const [showmsg, setShowmsg] = useState(true);
    const [users, setUsers] = useState(true);
    const [streak, setStreak] = useState(true);
    const [bookmark, setBookmark] = useState(false);
    const [chatbox, setChatbox] = useState(false);
    const [showA, setShowA] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const toggleShowA = () => setShowA(!showA);
    useEffect(() => {
        const keyDownHandler = (event) => {
            event.preventDefault();
            if (event.key === 'ArrowRight') {
                if (defaultQuestion >= 0 && defaultQuestion < questionsAndAnswers.length - 1) {
                    // let index = defaultQuestion + 1;
                    setDefaultQuestion((pre) => pre + 1);
                } else {
                    setDefaultQuestion(questionsAndAnswers.length - 1);
                }
            }
            if (event.key === 'ArrowLeft') {
                setDefaultQuestion((pre) => pre - 1);

                if (defaultQuestion > 0 && defaultQuestion < questionsAndAnswers.length) {
                }
            }
            if (event.key === ' ') {
                setShowAns(true);
            }
            if (event.key === 'Backspace') {
                setShowAns(false);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);
    useEffect(() => {}, [defaultQuestion]);
    // const { path, pathLength, stroke, strokeDashoffset, remainingTime, elapsedTime, size, strokeWidth } = useCountdown({ isPlaying: true, duration: 280, colors: '#abc' });

    const [pendingUsers, setPendingUsers] = useState([]);
    const schema = yup.object().shape({
        hearabout: yup.string()
    });

    const handleSubmit = (values) => {
        alert(JSON.stringify(values), 'data');
    };

    const Messages = () => {
        const [Messages, setMessage] = useState([{ text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }, { text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }]);
        const handleAddition = (ev) => {
            {
                if (ev.key === 'Enter') {
                    ev.preventDefault();
                    setMessage([...Messages, { text: ev.target.value }]);
                }
            }
        };
        return (
            <>
                <div class="msgbox invitechat ">
                    <div>
                        {Messages.map((val, index) => {
                            return (
                                <li key={index} className="d-flex justify-content-between mb-4">
                                    <img src="../../assets/user.png" alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="50" />
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="mb-0">{val.text}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </div>
                    <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Message" onKeyPress={(ev) => handleAddition(ev)} />
                    </Form.Group>
                </div>
            </>
        );
    };
    const HintBox = () => {
        return (
            <>
                <div className="hintbodymodel position-relative" id={!modalShow ? 'limit' : null}>
                    <p className="pt-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa provident voluptatibus iusto quis in. Cumque quidem minima, consequatur necessitatibus laboriosam itaque aut
                        sint dignissimos perspiciatis reprehenderit ipsa vitae facilis dolor!
                    </p>
                    <p className="pt-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa provident voluptatibus iusto quis in. Cumque quidem minima, consequatur necessitatibus laboriosam itaque aut
                        sint dignissimos perspiciatis reprehenderit ipsa vitae facilis dolor!
                    </p>
                    <p className="pt-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa provident voluptatibus iusto quis in. Cumque quidem minima, consequatur necessitatibus laboriosam itaque aut
                        sint dignissimos perspiciatis reprehenderit ipsa vitae facilis dolor!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa provident voluptatibus iusto quis in.
                        Cumque quidem minima, consequatur necessitatibus laboriosam itaque aut sint dignissimos perspiciatis reprehenderit ipsa vitae facilis dolor!
                    </p>
                    {!modalShow ? <img src="../assets/maxi.svg" className="maximize" alt="fullscreen hint" onClick={() => setModalShow(true)} /> : null}
                </div>
            </>
        );
    };
    const HintModel = (props) => {
        return (
            <>
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered fullscreen>
                    <Modal.Header closeButton className="hint-header"></Modal.Header>
                    <Modal.Body className="hintbodymodel">
                        <HintBox />
                    </Modal.Body>
                </Modal>
            </>
        );
    };

    return (
        <div className="teztusers ">
            <Container fluid className="study-modes">
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        hearabout: ''
                    }}
                >
                    {({ handleSubmit, handleChange, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} className="study-modes mainform">
                            <Row className="teztmodes teztquestions">
                                <Col sm={12} md={chatbox ? 4 : 6} className="pe-2 pt-5">
                                    <Row className="usersprogressbar">
                                        <Col sm={12} md={12} className="p-0">
                                            <Row>
                                                <Col xs={4} md={3} className="username-tezt">
                                                    <p className="username-tezt">
                                                        <img src="../assets/user.png" className="pe-2 usertesticon" />
                                                        <span className="fs-13">User 1</span>
                                                    </p>
                                                </Col>
                                                <Col xs={8} md={9} className="m-auto">
                                                    <ProgressBar now={60} className="three-progress prgwidth" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="usersprogressbar">
                                        <Col sm={12} md={12} className="p-0">
                                            <Row>
                                                <Col xs={4} md={3} className="username-tezt">
                                                    <p>
                                                        <img src="../assets/user.png" className="pe-2 usertesticon" />
                                                        <span className="fs-13">User 2</span>
                                                    </p>
                                                </Col>
                                                <Col xs={8} md={9} className="m-auto">
                                                    <ProgressBar now={60} className="two-progress prgwidth" />
                                                </Col>
                                                <Col sm={12} md={3} className="mob-timer dstimer">
                                                    {users ? (
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={200}
                                                            strokeWidth={3}
                                                            size={50}
                                                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                            colorsTime={[100, 15, 20, 110]}
                                                        >
                                                            {({ remainingTime }) => remainingTime}
                                                        </CountdownCircleTimer>
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="usersprogressbar tezt-3 user3">
                                        <Col sm={12} md={12} className="p-0">
                                            <Row>
                                                <Col xs={4} md={3} className="username-tezt">
                                                    <p className="mt-1 ps-md-3">
                                                        <img src="../assets/user.png" className="pe-2 usertesticon" />
                                                        <span className="fs-13">User 3</span>
                                                    </p>
                                                </Col>
                                                <Col xs={8} md={9} className="m-auto">
                                                    <ProgressBar now={60} className="two-progress prgwidth" />
                                                </Col>
                                                <Col sm={12} md={3} className="mob-timer"></Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={3} className="mob-timer mbtimer">
                                            {users ? (
                                                <CountdownCircleTimer
                                                    isPlaying
                                                    duration={200}
                                                    strokeWidth={3}
                                                    size={50}
                                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                    colorsTime={[100, 15, 20, 110]}
                                                >
                                                    {({ remainingTime }) => remainingTime}
                                                </CountdownCircleTimer>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    {!showAns && (
                                        <Form.Group controlId="" className="mt-5 mt customer-question">
                                            <Form.Label>
                                                <b>Question</b>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={questionsAndAnswers[defaultQuestion] && questionsAndAnswers[defaultQuestion].q}
                                                disabled
                                                className="teztqs"
                                                as="textarea"
                                                rows={12}
                                                name="question"
                                                placeholder="Question"
                                            />
                                        </Form.Group>
                                    )}
                                </Col>
                                <Col sm={12} md={chatbox ? 4 : 6} className="mb-5 mt-5">
                                    <Row className="usersprogressbar tezt-4 user3">
                                        <Col sm={12} md={3} className="p-0 username-tezt">
                                            <p className="mt-1 ps-md-3">
                                                <img src="../assets/user.png" className="pe-2 usertesticon" alt="usertesticon" />
                                                <span className="fs-13 d-inline-block pt-2">User 3</span>
                                            </p>
                                        </Col>
                                        <Col sm={12} md={9} className="p-0">
                                            <Row>
                                                <Col sm={12} md={9} className="m-auto">
                                                    <ProgressBar now={60} className="three-progress prgwidth" />
                                                </Col>
                                                <Col sm={12} md={3} className="desk-timer">
                                                    {users ? (
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={200}
                                                            strokeWidth={3}
                                                            size={50}
                                                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                                            colorsTime={[100, 15, 20, 110]}
                                                        >
                                                            {({ remainingTime }) => remainingTime}
                                                        </CountdownCircleTimer>
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {showAns ? (
                                        <div id="ans-sheet" style={{ marginLeft: '-100%' }}>
                                            <Form.Group controlId="" className="mb-4" style={{ width: '100%', textAlign: 'center' }}>
                                                <Form.Label>
                                                    <b>Answer</b>
                                                </Form.Label>
                                                <Form.Control className="teztqs" type="text" as="textarea" rows={12} name="question" placeholder="Answer" />
                                            </Form.Group>
                                        </div>
                                    ) : (
                                        <div className="mt-5">
                                            <Form.Group controlId="" className="mt-5 tezt-answer customer-question">
                                                <Form.Label>
                                                    <b>Answer</b>
                                                </Form.Label>
                                                <Form.Control
                                                    className="teztqs"
                                                    value={questionsAndAnswers[defaultQuestion] && questionsAndAnswers[defaultQuestion].a}
                                                    type="text"
                                                    as="textarea"
                                                    rows={12}
                                                    name="question"
                                                    placeholder="Answer"
                                                />
                                            </Form.Group>
                                        </div>
                                    )}
                                </Col>
                                {chatbox ? (
                                    <Col sm={12} md={4} className="msgsbox position-relative">
                                        <div>
                                            <img className="closechat pt-2" onClick={() => setChatbox(!chatbox)} src="../assets/x.svg" alt="starttezt" />
                                            <div className="p-2 mt-3">
                                                <h5 className="text-center">ChatBox In Progress</h5>
                                                <div>
                                                    <DropdownButton id="dropdown-basic-button" title="Jackson" className="msgdropdown text-black">
                                                        <Dropdown.Item href="#">Simon</Dropdown.Item>
                                                        <Dropdown.Item href="#">Jackson</Dropdown.Item>
                                                        <Dropdown.Item href="#">User X</Dropdown.Item>
                                                    </DropdownButton>
                                                </div>
                                                <Messages />
                                            </div>
                                        </div>
                                    </Col>
                                ) : null}
                                <div className="tezt-options">
                                    <img src="../assets/light.png" onClick={toggleShowA} />
                                    {bookmark ? (
                                        <img src="../assets/pin.png" onClick={() => setBookmark(!bookmark)} className="mx-2" alt="starttezt" />
                                    ) : (
                                        <img src="../assets/bookmarkempt.png" className="mx-2" onClick={() => setBookmark(!bookmark)} alt="starttezt" />
                                    )}
                                    {streak ? (
                                        <>
                                            <img src="../assets/fire.png" className="pe-2" alt="fire - teztus" />
                                            <span className="text-white">3</span>
                                        </>
                                    ) : null}
                                </div>

                                {chatbox ? null : (
                                    <div className="hidebtns">
                                        <Button className="hidemsg" onClick={() => setShowmsg(!showmsg)}>
                                            {showmsg ? ' Hide Messages' : 'Show Messages'}
                                        </Button>
                                        {showmsg ? <img src="../assets/chat.png" onClick={() => setChatbox(!chatbox)} className="ps-2 chat" width="50px" alt="chat teztus" /> : null}
                                    </div>
                                )}

                                <img
                                    src="../assets/chevron-left.svg"
                                    className="ps-2 tezt-left-arrow"
                                    onClick={() => {
                                        if (defaultQuestion > 0 && defaultQuestion !== questionsAndAnswers.length) {
                                            let index = defaultQuestion - 1;
                                            setDefaultQuestion(index);
                                        }
                                        if (defaultQuestion === questionsAndAnswers.length - 1) {
                                            setDefaultQuestion(0);
                                        }
                                    }}
                                />
                                <img
                                    src="../assets/chevron-right.svg"
                                    className="ps-2 tezt-right-arrow"
                                    onClick={() => {
                                        if (defaultQuestion >= 0 && defaultQuestion !== questionsAndAnswers.length) {
                                            let index = defaultQuestion + 1;
                                            setDefaultQuestion(index);
                                        }
                                        if (defaultQuestion === questionsAndAnswers.length - 1) {
                                            setDefaultQuestion(questionsAndAnswers.length - 1);
                                        }
                                    }}
                                />
                                {showA ? <HintBox show={!showA} onClose={toggleShowA} /> : null}
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Container>
            <HintModel
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    setShowA(true);
                }}
            />
        </div>
    );
};

export default Tezt;
