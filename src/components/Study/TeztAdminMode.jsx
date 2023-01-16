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
            filteredQuestions = [];
            for (const rawQuestion of rawQuestions) {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/uqAttempts/`, { params: { userId: userId, questionId: rawQuestion._id } });
                const questionAnalytics = res.data;
                const accuracy = (questionAnalytics.correct / questionAnalytics.attempts) * 100;
                if (accuracy < 60) filteredQuestions.push(rawQuestion);
            }
            setQuestions(filteredQuestions);
            setNoOfQuestions(filteredQuestions.length);

            filteredQuestions.forEach((question) => {
                setSlides((state) => [...state, { question: question.question, files: question.files }, question.answer]);
            });
        } else if (location.state.q_type == 'bookmark') {
            let newFilteredQuestions = res.data.filter((val) => val.bookmark == true);
            setNoOfQuestions(newFilteredQuestions.length);
            setQuestions(newFilteredQuestions);
            setBookmarkmode(true);
            newFilteredQuestions.forEach((question) => {
                setSlides((state) => [...state, { question: question.Question, files: question.files }, question.Answer]);
            });
        } else {
            if (filteredQuestions[0].bookmark == true) {
                setBookmarkSate(true);
            }
            setNoOfQuestions(filteredQuestions.length);
            setQuestions(filteredQuestions);

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

    const toogleBookmark = async () => {
        try {
            const currentQuestion = questions[currentQuestionIndex - 1] || {};

            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/questions/bookmark/`, { id: currentQuestion._id, studySetId: currentQuestion.studySetId, bookmark: bookmark });
            setBookmark((prevbookmark) => !prevbookmark);
        } catch (err) {
            console.log(err);
        }
    };

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
        </div>
    );
};

export default TeztAdminMode;
