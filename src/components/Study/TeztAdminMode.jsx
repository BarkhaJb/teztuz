<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Container, ProgressBar } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../css/main.css';
import { allowedAudioTypes, allowedImageTypes, allowedVideoTypes, getExtension, getLoggedUser } from '../../helpers/utils';
import AnswerComponent from './AnswerComponent';
const TeztAdminMode = ({ dataAdminTezt }) => {
    const navigate = useNavigate();
    const { studySetId } = useParams();
    const user = getLoggedUser();
    const [userId, setUserId] = useState('');
    const [activeAnswer, setActivenswer] = useState(false);
    const [activeQuestion, setQuestion] = useState(false);
    const [slides, setSlides] = useState([]);
    const [progress, setProgress] = useState(0);
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [questions, setQuestions] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bookmark, setBookmark] = useState(true);
    const [bookmarkState, setBookmarkSate] = useState(false);
    const [bookmarkmode, setBookmarkmode] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const location = useLocation();

    const path = dataAdminTezt.teztData.URL;

    async function fetchAdminTest(localUserId) {
        debugger;
        if (!localUserId) return;
        const res = await axios.get(`http://159.223.168.200:4001${path} `);
        const rawQuestions = res.data || [];
        let filteredQuestions = rawQuestions || [];
        if (location.state.improved == 'poorly_performed') {
=======
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Row, Col, Container, ProgressBar } from 'react-bootstrap';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import '../../css/main.css';
// import { allowedAudioTypes, allowedImageTypes, allowedVideoTypes, getExtension, getLoggedUser } from '../../helpers/utils';
// import AnswerComponent from './AnswerComponent';
// const TeztAdminMode = ({ dataAdminTezt }) => {
//     const navigate = useNavigate();
//     const { studySetId } = useParams();
//     const user = getLoggedUser();
//     const [userId, setUserId] = useState('');
//     const [activeAnswer, setActivenswer] = useState(false);
//     const [activeQuestion, setQuestion] = useState(false);
//     const [slides, setSlides] = useState([]);
//     const [progress, setProgress] = useState(0);
//     const [noOfQuestions, setNoOfQuestions] = useState(0);
//     const [questions, setQuestions] = useState({});
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [bookmark, setBookmark] = useState(true);
//     const [bookmarkState, setBookmarkSate] = useState(false);
//     const [bookmarkmode, setBookmarkmode] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
//     const location = useLocation();

//     const path = dataAdminTezt.teztData.URL;

//     async function fetchAdminTest(localUserId) {
//         debugger;
//         if (!localUserId) return;
//         const res = await axios.get(`http://159.223.168.200:4001${path} `);
//         const rawQuestions = res.data || [];
//         let filteredQuestions = rawQuestions || [];
//         if (location.state.improved == 'poorly_performed') {
//             filteredQuestions = [];
//             for (const rawQuestion of rawQuestions) {
//                 const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/uqAttempts/`, { params: { userId: userId, questionId: rawQuestion._id } });
//                 const questionAnalytics = res.data;
//                 const accuracy = (questionAnalytics.correct / questionAnalytics.attempts) * 100;
//                 if (accuracy < 60) filteredQuestions.push(rawQuestion);
//             }
//             setQuestions(filteredQuestions);
//             setNoOfQuestions(filteredQuestions.length);

//             filteredQuestions.forEach((question) => {
//                 setSlides((state) => [...state, { question: question.question, files: question.files }, question.answer]);
//             });
//         } else if (location.state.q_type == 'bookmark') {
//             let newFilteredQuestions = res.data.filter((val) => val.bookmark == true);
//             setNoOfQuestions(newFilteredQuestions.length);
//             setQuestions(newFilteredQuestions);
//             setBookmarkmode(true);
//             newFilteredQuestions.forEach((question) => {
//                 setSlides((state) => [...state, { question: question.Question, files: question.files }, question.Answer]);
//             });
//         } else {
//             if (filteredQuestions[0].bookmark == true) {
//                 setBookmarkSate(true);
//             }
//             setNoOfQuestions(filteredQuestions.length);
//             setQuestions(filteredQuestions);

//             filteredQuestions.forEach((question) => {
//                 setSlides((state) => [
//                     ...state,
//                     {
//                         question: question.Question,
//                         files: question.files,
//                         answer: question.Answer,
//                         answerArray: [
//                             { answer: question.Answer, explanation: question.Explanation },
//                             { answer: question.Wrong1, explanation: question.ExplanationW1 },
//                             { answer: question.Wrong2, explanation: question.ExplanationW2 },
//                             { answer: question.Wrong3, explanation: question.ExplanationW3 },
//                             { answer: question.Wrong4, explanation: question.ExplanationW4 }
//                         ]
//                     }
//                 ]);
//             });
//         }
//     }
//     console.log('new array', slides);
//     useEffect(() => {
//         async function fetchData() {
//             if (!localStorage.getItem('jwt')) {
//                 navigate('/signin');
//             }

//             const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + user.email;
//             const res = await axios.get(url);
//             debugger;
//             setUserId(res.data);
//             await fetchAdminTest(res.data);
//         }
//         fetchData();
//     }, []);

//     console.log('slides', slides);

//     useEffect(() => {
//         const uploadProgress = async () => {
//             const progress = await Math.round((currentQuestionIndex * 100) / noOfQuestions);
//             try {
//                 await axios.put(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord`, { userId: userId, studySetId: studySetId, progress: progress });
//                 setProgress(progress);
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         if (noOfQuestions > 0) {
//             if (currentQuestionIndex <= noOfQuestions) {
//                 uploadProgress();
//             } else {
//                 navigate('/');
//             }
//         }
//         const checkQuestionsBookmarked = () => {
//             const currentQuestion = questions[currentQuestionIndex - 1] || [];
//             if (currentQuestion?.bookmark == true) {
//                 setBookmarkSate(true);
//             } else if (currentQuestion?.bookmark == false) {
//                 setBookmarkSate(false);
//             }
//         };

//         checkQuestionsBookmarked();
//     }, [currentQuestionIndex, noOfQuestions, navigate, studySetId, userId]);

//     const previousQuestion = () => {
//         if (currentSlide > 0) {
//             // If current slide is a question
//             if ((currentSlide + 1) % 2 !== 0) {
//                 // Go back 2 slides
//                 setCurrentSlide(currentSlide - 2);
//                 setCurrentQuestionIndex(currentQuestionIndex - 1);
//             } else if ((currentSlide + 1) % 2 === 0 && currentSlide > 1) {
//                 setCurrentSlide(currentSlide - 3);
//                 setCurrentQuestionIndex(currentQuestionIndex - 1);
//                 setQuestion(!activeQuestion);
//                 setActivenswer(!activeAnswer);
//             } else {
//                 setQuestion(!activeQuestion);
//                 setActivenswer(!activeAnswer);
//                 setCurrentSlide(0);
//                 setCurrentQuestionIndex(1);
//             }
//         }
//     };

//     const nextSlide = () => {
//         if (currentSlide >= 0) {
//             // If current slide is a question
//             if ((currentSlide + 1) % 2 !== 0) {
//                 // Go back 2 slides
//                 setCurrentSlide(currentSlide + 2);
//                 setCurrentQuestionIndex(currentQuestionIndex + 1);
//             } else if ((currentSlide + 1) % 2 === 0) {
//                 setCurrentSlide(currentSlide + 1);
//                 setCurrentQuestionIndex(currentQuestionIndex + 1);
//                 setQuestion(!activeQuestion);
//                 setActivenswer(!activeAnswer);
//             } else {
//                 setCurrentSlide(currentSlide + 2);
//                 setCurrentQuestionIndex(currentQuestionIndex + 1);
//             }
//         }
//     };

//     const keyDownHandler = (event) => {
//         if (event.key == 'ArrowRight') {
//             nextSlide();
//         }
//         if (event.key == 'ArrowLeft') {
//             previousQuestion();
//         }
//         if (event.key == ' ' || event.key == 'ArrowUp' || event.key == 'ArrowDown') {
//             event.preventDefault();
//             setQuestion(!activeQuestion);
//             setActivenswer(!activeAnswer);
//             if ((currentSlide + 1) % 2 !== 0) {
//                 setCurrentSlide(currentSlide + 1);
//                 setQuestion(!activeQuestion);
//                 setActivenswer(!activeAnswer);
//             } else {
//                 setCurrentSlide(currentSlide - 1);
//                 setQuestion(!activeQuestion);
//                 setActivenswer(!activeAnswer);
//             }
//         }
//     };

//     const QuestionSwapt = () => {
//         setQuestion(!activeQuestion);
//         setActivenswer(!activeAnswer);
//         if ((currentSlide + 1) % 2 !== 0) {
//             setCurrentSlide((prevValue) => prevValue + 1);
//             setQuestion(!activeQuestion);
//             setActivenswer(!activeAnswer);
//         } else {
//             setCurrentSlide((prevValue) => prevValue - 1);
//             setQuestion(!activeQuestion);
//             setActivenswer(!activeAnswer);
//         }
//     };

//     const toogleBookmark = async () => {
//         try {
//             const currentQuestion = questions[currentQuestionIndex - 1] || {};

//             await axios.post(`${process.env.REACT_APP_BASE_URL}/api/questions/bookmark/`, { id: currentQuestion._id, studySetId: currentQuestion.studySetId, bookmark: bookmark });
//             setBookmark((prevbookmark) => !prevbookmark);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('keydown', keyDownHandler);

//         return () => {
//             document.removeEventListener('keydown', keyDownHandler);
//         };
//     });

//     return (
//         <div className="teztusers study-modes">
//             <Container>
//                 <Row className="study-modes-div1 teztmde">
//                     <Col sm={12} className="">
//                         <ProgressBar now={progress} label={`${progress}%`} className="three-progress" />
//                     </Col>

//                     <Row className="teztquestions mt-5 pointer" onClick={QuestionSwapt}>
//                         {(!activeAnswer && (currentSlide + 1) % 2 !== 0) || (!activeAnswer && (currentSlide + 1) % 2 === 0) ? (
//                             <Col sm={12} md={12} className="text-center text-white p-0 ">
//                                 <h1>Question {currentQuestionIndex}</h1>
//                                 <h3
//                                     style={{ minHeight: '100px' }}
//                                     className="mt-4 modelimg"
//                                     dangerouslySetInnerHTML={{
//                                         __html: slides[currentSlide]?.question
//                                     }}
//                                 ></h3>
//                                 {/* <p style={{ minHeight: '100px' }} className="mt-4">
//                                     {slides[currentSlide]?.files?.map((image) => {
//                                         if (allowedImageTypes.includes(getExtension(image))) {
//                                             return <img src={`${process.env.REACT_APP_BASE_URL}/questions${image}`} width="150" alt="tezt" />;
//                                         } else if (allowedVideoTypes.includes(getExtension(image))) {
//                                             return (
//                                                 <video style={{ maxWidth: '100%' }} playsInline loop muted controls alt="All the devices" src={`${process.env.REACT_APP_BASE_URL}/questions${image}`} />
//                                             );
//                                         } else if (allowedAudioTypes.includes(getExtension(image))) {
//                                             return (
//                                                 <audio style={{ maxWidth: '100%' }} playsInline loop muted controls alt="All the devices" src={`${process.env.REACT_APP_BASE_URL}/questions${image}`} />
//                                             );
//                                         }
//                                     })}
//                                 </p> */}
//                             </Col>
//                         ) : (
//                             <Col sm={12} md={12} className="text-center text-white p-0 ">
//                                 <h1>Answer {currentQuestionIndex}</h1>
//                                 {slides[currentSlide].answerArray?.map((answerObj) => {
//                                     return <AnswerComponent answerObj={answerObj} correctAnswer={slides[currentSlide].answer} />;
//                                 })}
//                             </Col>
//                         )}
//                     </Row>

//                     {/* {(!activeAnswer && (currentSlide + 1) % 2 !== 0) || (!activeAnswer && (currentSlide + 1) % 2 === 0) ? ( */}
//                     <Col sm={12} md={5} className="mt-5">
//                         <div className="tezt-options bookmark">
//                             <img src="../assets/light.png" />
//                             {bookmarkState ? (
//                                 <img
//                                     src="../assets/pin.png"
//                                     style={bookmarkmode ? { opacity: '0 ' } : null}
//                                     onClick={() => {
//                                         toogleBookmark();
//                                         setBookmarkSate(!bookmarkState);
//                                     }}
//                                 />
//                             ) : (
//                                 <img
//                                     src="../assets/bookmarkempt.png"
//                                     style={bookmarkmode ? { opacity: '0 ' } : null}
//                                     className=""
//                                     onClick={() => {
//                                         toogleBookmark();
//                                         setBookmarkSate(!bookmarkState);
//                                     }}
//                                     alt=""
//                                 />
//                             )}
//                         </div>
//                     </Col>
//                     {/* ) : null} */}

//                     <img src="../assets/chevron-left.svg" className="ps-2 tezt-left-arrow" onClick={() => previousQuestion()} />
//                     <img src="../assets/chevron-right.svg" className="ps-2 tezt-right-arrow" onClick={() => nextSlide()} />
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default TeztAdminMode;


import React, { useEffect, useState, useContext } from 'react';
import { Button, Row, Col, Form, Container, Modal, ProgressBar, Dropdown, Spinner } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { allowedAudioTypes, allowedImageTypes, allowedVideoTypes, getExtension, getLoggedUser } from '../../helpers/utils';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SocketContext } from '../../context/SocketContext';
import AnswerComponent from './AnswerComponent';

const  TeztAdminMode = ({ dataAdminTezt }) => {
    const user = getLoggedUser();
    const [userId, setUserId] = useState('');
    const { studySetId } = useParams();
    const location = useLocation();
    const [questions, setQuestions] = useState({});
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState();
    const [progress, setProgress] = useState({});
    const [duration, setDuration] = useState(20);
    const [countdown, setCountdown] = useState(false);
    const [timeSpent, setTimeSpent] = useState([]);
    const [showmsg, setShowmsg] = useState(true);
    const [bookmark, setBookmark] = useState(true);
    const [chatbox, setChatbox] = useState(false);
    const [bookmarkState, setBookmarkSate] = useState(false);
    const [bookmarkmode, setBookmarkmode] = useState(false);
    const [showA, setShowA] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [testUsers, setTestUsers] = useState([]);
    const [chatUser, setChatUser] = useState();
    const toggleShowA = () => setShowA(!showA);
    const navigate = useNavigate();
    const { socketIO } = useContext(SocketContext);
    const [message, setMessage] = useState();
    const [myProgress, setMyProgress] = useState(0);
    const [allMessages, setAllMessages] = useState([]);
    const [newUser, setNewUser] = useState();
    const [teztStarted, setTeztStarted] = useState(false);
    const [slides, setSlides] = useState([]);

    const [newProgress, setNewProgress] = useState();
    let userEmail = JSON.parse(localStorage.getItem('AllUsers')) || [];

    const path = dataAdminTezt.teztData.URL;

    useEffect(() => {
        if (socketIO) {
            socketIO.on('NEW_CHAT_MESSAGE', (data) => {
                setMessage({ user: data.sender, text: data.msg });
            });
            socketIO.on('SHARE_STUDY_PROGRESS', async (data) => {
                if (studySetId == data.studySetId) {
                    setNewUser(data.sender);
                    if (data.sender == location.state.sender) {
                        setTeztStarted(true);
                    }
                    setNewProgress({ [data.sender]: data.progress });
                    if (!userEmail.includes(data.senderemail)) {
                        userEmail.push(data.senderemail);
                    }
                }
                localStorage.setItem('AllUsers', JSON.stringify(userEmail));
            });
        }
    }, [socketIO]);
    localStorage.setItem('AllUsers', JSON.stringify(userEmail));
    useEffect(() => {
        if (newUser && !testUsers.includes(newUser)) setTestUsers([...testUsers, newUser]);
    }, [newUser]);
    useEffect(() => {
        let userProgressList = JSON.parse(localStorage.getItem('finishedTime')) || [];
        for (const item in progress) {
            if (progress[item] === 100) {
                if (!userProgressList.includes(item)) userProgressList.push(item);
            } else if (progress[item] < 100) {
                if (userProgressList.includes(item)) userProgressList = userProgressList.filter((i) => i == item);
            }
        }
        localStorage.setItem('finishedTime', JSON.stringify(userProgressList));
    }, [location.state, newProgress, progress]);

    useEffect(async () => {
        if (newProgress) {
            const progressUser = Object.keys(newProgress)[0];
            if (!progress[progressUser]) {
                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/studySets/shareProgress`, {
                    sender: user.username,
                    receivers: [progressUser],
                    progress: myProgress,
                    studySetId,
                    senderemail: user.email
                });
            }
            setProgress({ ...progress, ...newProgress });
        }
    }, [newProgress]);

    useEffect(() => {
        if (message) setAllMessages([...allMessages, message]);
    }, [message]);

    useEffect(() => {
        if (noOfQuestions) setMyProgress(currentQuestionIndex / noOfQuestions);
    }, [noOfQuestions]);

    useEffect(() => {
        if (location.state) {
            const allUsers = location.state.usernames ? [...location.state.usernames, location.state.sender] : [user.username];
            setTestUsers([user.username]);
            setChatUser(allUsers.filter((u) => u !== user.username)[0]);
            setTeztStarted(location.state.hasSenderStarted ?? true);
        }
    }, [location.state]);
    useEffect(() => {
        if (testUsers?.length) {
            setChatUser(testUsers.filter((u) => u !== user.username)[0]);
        }
    }, [testUsers]);
    useEffect(async () => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }

        const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + user.email;
        const res = await axios.get(url);
        setUserId(res.data);
    }, []);

    // ###########################################################################################
    const  fetchAdminTest = async () => {
        if (!userId) return;
        const res = await axios.get(`http://159.223.168.200:4001${path}`);

        const rawQuestions = res.data || [];
        let filteredQuestions = rawQuestions || [];
        if (location.state.order == 'shuffled') {
            setQuestions(filteredQuestions.sort(() => Math.random() - 0.5));
            setNoOfQuestions(filteredQuestions.length);
            setUserAnswers(Array(filteredQuestions.length).fill(''));
            setTimeSpent(Array(filteredQuestions.length).fill(0));
        }
        if (location.state.mode == 'Improve') {
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
            filteredQuestions = [];
            for (const rawQuestion of rawQuestions) {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/uqAttempts/`, { params: { userId: userId, questionId: rawQuestion._id } });
                const questionAnalytics = res.data;
                const accuracy = (questionAnalytics.correct / questionAnalytics.attempts) * 100;
                if (accuracy < 60) filteredQuestions.push(rawQuestion);
            }
            setQuestions(filteredQuestions);
            setNoOfQuestions(filteredQuestions.length);
<<<<<<< HEAD

            filteredQuestions.forEach((question) => {
                setSlides((state) => [...state, { question: question.question, files: question.files }, question.answer]);
            });
        } else if (location.state.q_type == 'bookmark') {
=======
            setUserAnswers(Array(filteredQuestions.length).fill(''));
            setTimeSpent(Array(filteredQuestions.length).fill(0));
        } else if (location.state.q_type == 'bookmark') {
            filteredQuestions = [];
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
            let newFilteredQuestions = res.data.filter((val) => val.bookmark == true);
            setNoOfQuestions(newFilteredQuestions.length);
            setQuestions(newFilteredQuestions);
            setBookmarkmode(true);
<<<<<<< HEAD
            newFilteredQuestions.forEach((question) => {
                setSlides((state) => [...state, { question: question.Question, files: question.files }, question.Answer]);
            });
=======
            setUserAnswers(Array(newFilteredQuestions.length).fill(''));
            setTimeSpent(Array(newFilteredQuestions.length).fill(0));
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
        } else {
            if (filteredQuestions[0].bookmark == true) {
                setBookmarkSate(true);
            }
            setNoOfQuestions(filteredQuestions.length);
            setQuestions(filteredQuestions);
<<<<<<< HEAD

=======
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
            filteredQuestions.forEach((question) => {
                setSlides((state) => [
                    ...state,
                    {
                        question: question.Question,
                        files: question.files,
                        answer: question.Answer,
                        answerArray: [
                            { answer: question.Answer, explanation: question.Explanation },
                            { answer: question.Wrong1, explanation: question.ExplanationW1 },
                            { answer: question.Wrong2, explanation: question.ExplanationW2 },
                            { answer: question.Wrong3, explanation: question.ExplanationW3 },
                            { answer: question.Wrong4, explanation: question.ExplanationW4 }
                        ]
                    }
                ]);
            });
<<<<<<< HEAD
        }
    }
    console.log('new array', slides);
    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem('jwt')) {
                navigate('/signin');
            }

            const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + user.email;
            const res = await axios.get(url);
            debugger;
            setUserId(res.data);
            await fetchAdminTest(res.data);
        }
        fetchData();
    }, []);

    console.log('slides', slides);

    // useEffect(() => {
    //     debugger
    //     const uploadProgress = async () => {
    //         const progress = await Math.round((currentQuestionIndex * 100) / noOfQuestions);
    //         try {
    //             await axios.put(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord`, { userId: userId, studySetId: studySetId, progress: progress });
    //             setProgress(progress);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     if (noOfQuestions > 0) {
    //         if (currentQuestionIndex <= noOfQuestions) {
    //             uploadProgress();
    //         } else {
    //             navigate('/');
    //         }
    //     }
    //     const checkQuestionsBookmarked = () => {
    //         const currentQuestion = questions[currentQuestionIndex - 1] || [];
    //         if (currentQuestion?.bookmark == true) {
    //             setBookmarkSate(true);
    //         } else if (currentQuestion?.bookmark == false) {
    //             setBookmarkSate(false);
    //         }
    //     };

    //     checkQuestionsBookmarked();
    // }, [currentQuestionIndex, noOfQuestions, navigate, studySetId, userId]);

    const previousQuestion = () => {
        if (currentSlide > 0) {
            // If current slide is a question
            if ((currentSlide + 1) % 2 !== 0) {
                // Go back 2 slides
                setCurrentSlide(currentSlide - 2);
                setCurrentQuestionIndex(currentQuestionIndex - 1);
            } else if ((currentSlide + 1) % 2 === 0 && currentSlide > 1) {
                setCurrentSlide(currentSlide - 3);
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setQuestion(!activeQuestion);
                setActivenswer(!activeAnswer);
            } else {
                setQuestion(!activeQuestion);
                setActivenswer(!activeAnswer);
                setCurrentSlide(0);
                setCurrentQuestionIndex(1);
            }
        }
    };

    const nextSlide = () => {
        if (currentSlide >= 0) {
            // If current slide is a question
            if ((currentSlide + 1) % 2 !== 0) {
                // Go back 2 slides
                setCurrentSlide(currentSlide + 2);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else if ((currentSlide + 1) % 2 === 0) {
                setCurrentSlide(currentSlide + 1);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setQuestion(!activeQuestion);
                setActivenswer(!activeAnswer);
            } else {
                setCurrentSlide(currentSlide + 2);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    const keyDownHandler = (event) => {
        if (event.key == 'ArrowRight') {
            nextSlide();
        }
        if (event.key == 'ArrowLeft') {
            previousQuestion();
        }
        if (event.key == ' ' || event.key == 'ArrowUp' || event.key == 'ArrowDown') {
            event.preventDefault();
            setQuestion(!activeQuestion);
            setActivenswer(!activeAnswer);
            if ((currentSlide + 1) % 2 !== 0) {
                setCurrentSlide(currentSlide + 1);
                setQuestion(!activeQuestion);
                setActivenswer(!activeAnswer);
            } else {
                setCurrentSlide(currentSlide - 1);
                setQuestion(!activeQuestion);
                setActivenswer(!activeAnswer);
            }
        }
    };

    const QuestionSwapt = () => {
        setQuestion(!activeQuestion);
        setActivenswer(!activeAnswer);
        if ((currentSlide + 1) % 2 !== 0) {
            setCurrentSlide((prevValue) => prevValue + 1);
            setQuestion(!activeQuestion);
            setActivenswer(!activeAnswer);
        } else {
            setCurrentSlide((prevValue) => prevValue - 1);
            setQuestion(!activeQuestion);
            setActivenswer(!activeAnswer);
        }
    };

=======
            console.log('g3', slides);
        }

        setUserAnswers(Array(filteredQuestions.length).fill(''));
        setTimeSpent(Array(filteredQuestions.length).fill(0));

        if (location.state.timer !== 'no_timer') {
            setCountdown(true);
        }

        const query = new URLSearchParams(location.search);
        const uuid = query.get('uid');
        if (!uuid) {
            setTeztStarted(true);
        }
        // console.log(filteredQuestions, 'scsc');
    };

    useEffect(() => {
        fetchAdminTest();
    }, [userId]);

    useEffect(() => {
        const uploadProgress = async (newProgress) => {
            try {
                setMyProgress(newProgress);
                await axios.put(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord`, { userId: userId, studySetId: studySetId, progress: newProgress });
                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/studySets/shareProgress`, {
                    sender: user.username,
                    senderemail: user.email,
                    receivers: testUsers.filter((u) => u !== user.username),
                    progress: newProgress,
                    studySetId
                });
            } catch (err) {
                console.log(err);
            }
        };

        if (noOfQuestions > 0) {
            if (currentQuestionIndex <= noOfQuestions) {
                const newProgress = Math.round((currentQuestionIndex * 100) / noOfQuestions);
                uploadProgress(newProgress);
            }
        }
        const checkQuestionsBookmarked = () => {
            const currentQuestion = questions[currentQuestionIndex - 1] || [];
            if (currentQuestion?.bookmark == true) {
                setBookmarkSate(true);
            } else if (currentQuestion?.bookmark == false) {
                setBookmarkSate(false);
            }
        };

        checkQuestionsBookmarked();
        setTimer();
    }, [currentQuestionIndex, noOfQuestions, studySetId, userId]);
    const setTimer = () => {
        if (location.state.timer === 'no_timer') {
            setDuration(50);
        } else if (location.state.timer === '30-sec') {
            setDuration(30);
        } else if (location.state.timer === '1-min') {
            setDuration(60);
        } else if (location.state.timer === '2-min') {
            setDuration(120);
        } else if (location.state.timer === 'Other') {
            const hms = location.state.valueTime;
            const [hours, minutes, seconds] = hms.split(':');
            const totalSeconds = +hours * 60 * 60 + +minutes * 60 + +seconds;
            setDuration(totalSeconds);
        }
    };
    // Record time spent on each question
    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            setTimeSpent([...timeSpent.slice(0, currentQuestionIndex - 1), timeSpent[currentQuestionIndex - 1] + 10, ...timeSpent.slice(currentQuestionIndex, timeSpent.length)]);
        }, 10);
        return () => clearInterval(interval);
    });

    const saveAnswers = (answer) => {
        setUserAnswers([...userAnswers.slice(0, currentQuestionIndex - 1), answer, ...userAnswers.slice(currentQuestionIndex, userAnswers.length)]);
    };
    const previousQuestion = () => {
        if (currentQuestionIndex > 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < noOfQuestions) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            endSession();
        }
    };
    const timerRunsOut = () => {
        toast.error("Time's up", {
            position: 'top-right',
            theme: 'colored',
            autoClose: 5000,
            hideProgressBar: false
        });
        endSession();
    };
    const endSession = async () => {
        const values = {
            mode: location.state.mode,
            studySetId: studySetId,
            grading: location.state.grading,
            questions: questions,
            userAnswers: userAnswers,
            timeSpent: timeSpent,
            progress: progress
        };
        navigate('/tezt-summary', { state: values });
    };
    const handleSubmit = (values) => {
        alert(JSON.stringify(values), 'data');
    };
    const keyDownHandler = (event) => {
        if (event.key == 'ArrowRight') {
            event.preventDefault();
            nextQuestion();
        }
        if (event.key == 'ArrowLeft') {
            event.preventDefault();
            previousQuestion();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    });
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
    const toogleBookmark = async () => {
        try {
            const currentQuestion = questions[currentQuestionIndex - 1] || {};

            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/questions/bookmark/`, { id: currentQuestion._id, studySetId: currentQuestion.studySetId, bookmark: bookmark });
            setBookmark((prevbookmark) => !prevbookmark);
        } catch (err) {
            console.log(err);
        }
    };

<<<<<<< HEAD
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    });

    return (
        <div className="teztusers study-modes">
            <Container>
                <Row className="study-modes-div1 teztmde">
                    <Col sm={12} className="">
                        <ProgressBar now={progress} label={`${progress}%`} className="three-progress" />
                    </Col>

                    <Row className="teztquestions mt-5 pointer" onClick={QuestionSwapt}>
                        {(!activeAnswer && (currentSlide + 1) % 2 !== 0) || (!activeAnswer && (currentSlide + 1) % 2 === 0) ? (
                            <Col sm={12} md={12} className="text-center text-white p-0 ">
                                <h1>Question {currentQuestionIndex}</h1>
                                <h3
                                    style={{ minHeight: '100px' }}
                                    className="mt-4 modelimg"
                                    dangerouslySetInnerHTML={{
                                        __html: slides[currentSlide]?.question
                                    }}
                                ></h3>
                                {/* <p style={{ minHeight: '100px' }} className="mt-4">
                                    {slides[currentSlide]?.files?.map((image) => {
                                        if (allowedImageTypes.includes(getExtension(image))) {
                                            return <img src={`${process.env.REACT_APP_BASE_URL}/questions${image}`} width="150" alt="tezt" />;
                                        } else if (allowedVideoTypes.includes(getExtension(image))) {
                                            return (
                                                <video style={{ maxWidth: '100%' }} playsInline loop muted controls alt="All the devices" src={`${process.env.REACT_APP_BASE_URL}/questions${image}`} />
                                            );
                                        } else if (allowedAudioTypes.includes(getExtension(image))) {
                                            return (
                                                <audio style={{ maxWidth: '100%' }} playsInline loop muted controls alt="All the devices" src={`${process.env.REACT_APP_BASE_URL}/questions${image}`} />
                                            );
                                        }
                                    })}
                                </p> */}
                            </Col>
                        ) : (
                            <Col sm={12} md={12} className="text-center text-white p-0 ">
                                <h1>Answer {currentQuestionIndex}</h1>
                                {slides[currentSlide].answerArray?.map((answerObj) => {
                                    return <AnswerComponent answerObj={answerObj} correctAnswer={slides[currentSlide].answer} />;
                                })}
                            </Col>
                        )}
                    </Row>

                    {/* {(!activeAnswer && (currentSlide + 1) % 2 !== 0) || (!activeAnswer && (currentSlide + 1) % 2 === 0) ? ( */}
                    <Col sm={12} md={5} className="mt-5">
                        <div className="tezt-options bookmark">
                            <img src="../assets/light.png" />
                            {bookmarkState ? (
                                <img
                                    src="../assets/pin.png"
                                    style={bookmarkmode ? { opacity: '0 ' } : null}
                                    onClick={() => {
                                        toogleBookmark();
                                        setBookmarkSate(!bookmarkState);
                                    }}
                                />
                            ) : (
                                <img
                                    src="../assets/bookmarkempt.png"
                                    style={bookmarkmode ? { opacity: '0 ' } : null}
                                    className=""
                                    onClick={() => {
                                        toogleBookmark();
                                        setBookmarkSate(!bookmarkState);
                                    }}
                                    alt=""
                                />
                            )}
                        </div>
                    </Col>
                    {/* ) : null} */}

                    <img src="../assets/chevron-left.svg" className="ps-2 tezt-left-arrow" onClick={() => previousQuestion()} />
                    <img src="../assets/chevron-right.svg" className="ps-2 tezt-right-arrow" onClick={() => nextSlide()} />
                </Row>
            </Container>
=======
    const HintBox = () => {
        return (
            <>
                <div className="hintbodymodel position-relative" id={!modalShow ? 'limit' : null}>
                    <p className="pt-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa provident voluptatibus iusto quis in. Cumque quidem minima, consequatur necessitatibus laboriosam itaque aut
                        sint dignissimos perspiciatis reprehenderit ipsa vitae facilis dolor!
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
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="hintbodymodel">
                        <HintBox />
                    </Modal.Body>
                </Modal>
            </>
        );
    };

    const handlChat = async (msg) => {
        const payload = {
            sender: user.username,
            receivers: chatUser,
            msg
        };
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/chat/sendMessage/`, payload);
    };
    const handleAddition = (ev) => {
        {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                setAllMessages([...allMessages, { user: user.username, text: ev.target.value }]);
                handlChat(ev.target.value);
                // document.getElementById('message').reset();
            }
        }
    };
    const renderTime = ({ remainingTime }) => {
        var timerhours = Math.floor(remainingTime / 3600);
        var timerminutes = -timerhours * 60 + Math.floor(remainingTime / 60);
        var timerseconds = -timerminutes * 60 - timerhours * 3600 + remainingTime;
        if (remainingTime === 0) {
            timerminutes = 0;
            timerseconds = 0;
        }
        return (
            <div className="timer">
                <div className="minutesvalue">{timerhours}</div> <span className="time-gap">:</span> <div className="secondsvalue">{timerminutes}</div> <span className="time-gap">:</span>{' '}
                <div className="secondsvalue">{timerseconds}</div>
            </div>
        );
    };
    return (
        <div className="teztusers ">
            {!teztStarted ? (
                <div className="text-center">
                    <h2 className="text-white mb-4">Waiting for Tezt to be Started..</h2>
                    <Spinner animation="border" variant="light" />
                </div>
            ) : (
                <>
                    {questions.length < 1 ? (
                        <h2 className="text-center text-white">No Questions Available </h2>
                    ) : (
                        <Container fluid className="study-modes generalfix">
                            <Formik onSubmit={handleSubmit}>
                                {({ handleSubmit, handleChange, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit} className="study-modes mainform">
                                        <Row className="teztmodes teztquestions">
                                            <Col sm={12} md={chatbox ? 8 : 12} className="pe-4 pt-5">
                                                <Row className="usersprogressbar">
                                                    {testUsers.map((username, index) => (
                                                        <Col sm={12} md={testUsers.length == 1 ? 11 : 6} className="p-0" key={index}>
                                                            <Row>
                                                                <Col sm={12} md={3} lg={2}>
                                                                    <p>
                                                                        <img src="../assets/user.png" className="pe-2 usertesticon" alt="" />
                                                                        <span>{username}</span>
                                                                    </p>
                                                                </Col>
                                                                <Col sm={12} md={9} lg={10} className={`pe-3 ps-0 ${testUsers.length > 1 ? 'singleuser' : ''} `}>
                                                                    <ProgressBar now={username === user.userame ? myProgress : progress[username]} className="three-progress" />
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    ))}
                                                </Row>

                                                <Row>
                                                    <Col sm={12} md={6} className="mb-5">
                                                        <Form.Group controlId="" className="mt-5">
                                                            <Form.Label>Question</Form.Label>
                                                            {questions.length > 0 && (
                                                                <div
                                                                    className="text-white  modelimg generalsec"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: slides[currentQuestionIndex]?.question
                                                                    }}
                                                                ></div>
                                                            )}

                                                            {questions[currentQuestionIndex - 1]?.files?.map((image) => {
                                                                if (allowedImageTypes.includes(getExtension(image))) {
                                                                    return <img src={`${process.env.REACT_APP_BASE_URL}/questions${image}`} width="100" alt="tezt" />;
                                                                } else if (allowedVideoTypes.includes(getExtension(image))) {
                                                                    return (
                                                                        <video
                                                                            style={{ maxWidth: '100%' }}
                                                                            playsInline
                                                                            loop
                                                                            muted
                                                                            controls
                                                                            alt="All the devices"
                                                                            src={`${process.env.REACT_APP_BASE_URL}/questions${image}`}
                                                                        />
                                                                    );
                                                                } else if (allowedAudioTypes.includes(getExtension(image))) {
                                                                    return (
                                                                        <audio
                                                                            style={{ maxWidth: '100%' }}
                                                                            controls
                                                                            alt="All the devices"
                                                                            src={`${process.env.REACT_APP_BASE_URL}/questions${image}`}
                                                                        />
                                                                    );
                                                                }
                                                            })}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm={12} md={6} className="mb-5">
                                                        <div className="mt-5">
                                                            <Form.Group controlId="" className="mt-5 tezt-answer">
                                                                <Form.Label style={{ marginLeft: '10px' }}>Answer</Form.Label>
                                                                {slides[currentQuestionIndex]?.answerArray?.map((answerObj) => {
                                                                    return <AnswerComponent answerObj={answerObj} correctAnswer={slides[currentQuestionIndex].answer} />;
                                                                })}
                                                            </Form.Group>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            {chatbox ? (
                                                <Col sm={12} md={4} className="msgsbox position-relative">
                                                    <img className="closechat pt-2" onClick={() => setChatbox(!chatbox)} src="../assets/x.svg" alt="" />
                                                    <div className="p-2 mt-3">
                                                        <h5 className="text-center">Chat With Friends</h5>
                                                        <div>
                                                            <Form.Select aria-label={chatUser} className="mb-2">
                                                                {testUsers.length == 1 ? (
                                                                    <option disabled selected value="Please select friend">
                                                                        Please select friend
                                                                    </option>
                                                                ) : null}
                                                                {testUsers
                                                                    .filter((u) => u !== user.username)
                                                                    .map((username) => (
                                                                        <>
                                                                            <option onClick={(e) => setChatUser(e.target.value)} value={username}>
                                                                                {username}
                                                                            </option>
                                                                        </>
                                                                    ))}
                                                            </Form.Select>
                                                        </div>

                                                        <>
                                                            <div className="msgbox invitechat ">
                                                                <div>
                                                                    {allMessages.map((val, index) => {
                                                                        return (
                                                                            <li key={index} className="d-flex justify-content-between mb-4">
                                                                                <img
                                                                                    src="../../assets/user.png"
                                                                                    alt="avatar"
                                                                                    className="rounded-circle d-flex align-self-start shadow-1-strong"
                                                                                    width="60"
                                                                                />
                                                                                <span style={{ fontWeight: 600 }}>{val.user}</span>
                                                                                <div className="card">
                                                                                    <div className="card-body">
                                                                                        <p className="mb-0">{val.text}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </div>
                                                                {/* <form id="message"> */}
                                                                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                                                                    <Form.Control type="text" placeholder="Enter Message" onChange={handleAddition} onKeyPress={(ev) => handleAddition(ev)} />
                                                                </Form.Group>
                                                                {/* </form> */}
                                                            </div>
                                                        </>
                                                    </div>
                                                </Col>
                                            ) : null}
                                            <div className="tezt-options">
                                                <img src="../assets/light.png" onClick={toggleShowA} alt="" />
                                                {bookmarkState ? (
                                                    <img
                                                        src="../assets/pin.png"
                                                        style={bookmarkmode ? { display: 'none' } : null}
                                                        onClick={() => {
                                                            toogleBookmark();
                                                            setBookmarkSate(!bookmarkState);
                                                        }}
                                                        className="mx-2"
                                                        alt="bookmarked"
                                                    />
                                                ) : (
                                                    <img
                                                        src="../assets/bookmarkempt.png"
                                                        style={bookmarkmode ? { display: 'none' } : null}
                                                        className="mx-2"
                                                        onClick={() => {
                                                            toogleBookmark();
                                                            setBookmarkSate(!bookmarkState);
                                                        }}
                                                        alt="bookmark"
                                                    />
                                                )}
                                            </div>

                                            {chatbox || testUsers.length == 1 ? null : (
                                                <div className="hidebtns">
                                                    <Button className="hidemsg" onClick={() => setShowmsg(!showmsg)}>
                                                        {showmsg ? ' Hide Messages' : 'Show Messages'}
                                                    </Button>
                                                    {showmsg ? <img src="../assets/chat.png" onClick={() => setChatbox(!chatbox)} className="ps-2 chat" width="50px" alt="" /> : null}
                                                </div>
                                            )}

                                            <img src="../assets/chevron-left.svg" className="ps-2 tezt-left-arrow" onClick={() => previousQuestion()} alt="" />
                                            <img src="../assets/chevron-right.svg" className="ps-2 tezt-right-arrow" onClick={() => nextQuestion()} alt="" />
                                            {showA ? <HintBox show={!showA} onClose={toggleShowA} /> : null}
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                            <div className="counter">
                                {countdown ? (
                                    <CountdownCircleTimer isPlaying duration={duration} onComplete={() => timerRunsOut()} strokeWidth={4} size={80} colors={['#fff', '#fff']} colorsTime={[100, 50]}>
                                        {renderTime}
                                    </CountdownCircleTimer>
                                ) : null}
                            </div>
                        </Container>
                    )}
                    <HintModel
                        show={modalShow}
                        onHide={() => {
                            setModalShow(false);
                            setShowA(true);
                        }}
                    />
                </>
            )}
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
        </div>
    );
};

<<<<<<< HEAD
export default TeztAdminMode;
=======
export default  TeztAdminMode;

>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
