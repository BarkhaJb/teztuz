import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Modal, Spinner } from 'react-bootstrap';
import '../../css/main.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicExtended from 'ckeditor5-build-classic-extended';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const StudyQuestion = ({ data, setData }, props) => {
    const [modalShow, setModalShow] = useState(false);
    const [noofQuestion, setnoofQuestion] = useState(1);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedQuesSection, setSelectedQuesSecton] = useState(null);
    const [newState, setStatus] = useState(false);
    const [deletedQ, setDeletedQ] = useState(null);
    const [questionAdded, setQuestionAdded] = useState(false);
    const [questionValues, setQuestionValues] = useState([]);

    console.log('QESTOP', questionValues, questionIndex);

    let { id } = useParams();
    useEffect(() => {
        if (questionAdded === true) addField();
    }, [questionAdded]);

    const setEditData = () => {
        // setQuestionValues(data?.map((val) => val));
        setQuestionValues(data.map((val, i) => ({ ...val, id: i + 1 })));
    };
    useEffect(() => {
        if (!id) {
            setQuestionValues([
                {
                    question: '',
                    answer: '',
                    id: 1,
                    files: []
                },
                {
                    question: '',
                    answer: '',
                    id: 2,
                    files: []
                }
            ]);
        }
    }, []);
    useEffect(() => {
        if (data?.length) {
            setEditData();
        }
    }, [data]);

    const handleChange = (val, id, type) => {
        // setDeletedQ();
        const questions = questionValues.map((q) => {
            if (q.id === id) {
                q[type] = val;
                return q;
            }
            return q;
        });
        setQuestionValues(questions);
        setData({ ...data, questions: questions });
    };

    const addField = () => {
        setDeletedQ(null);

        const questions = [...questionValues];
        if (questions.length === 0 || null || undefined) {
            questions.push({
                question: '',
                answer: '',
                id: 1,
                files: []
            });
            setnoofQuestion(questions.length);
        } else {
            for (let i = 1; i <= noofQuestion; i++) {
                questions.push({
                    question: '',
                    answer: '',
                    id: questionValues.length + i,
                    files: []
                });
            }
        }
        setQuestionValues(questions);
    };

    const setDeletedQNMedia = (id, i) => {
        console.log(id, i, 'sxsxsxscd');
        const questions = [...questionValues];
        questions.map((question) => {
            if (question.id == id) {
                question.files.splice(i, 1);
            }
            return question;
        });
        addField();
        setQuestionValues(questions);
    };
    const checkdelete = async (fid, id) => {
        setDeletedQ(fid);
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/questions/${id._id}`).then(() => ({ status: 'Delete successful' }));
        toast.success('Question Deleted!', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 2000,
            hideProgressBar: false
        });
    };
    const deleteField = (id) => {
        setQuestionIndex(0);
        setQuestionValues(questionValues.filter((q) => q.id !== id));
        setData({ ...data, questions: questionValues.filter((q) => q.id !== id) });
    };
    useEffect(() => {
        if (deletedQ) {
            const question = questionValues.find((q) => q.id === deletedQ);
            if (question) {
                deleteField(deletedQ);
            }
            setDeletedQ(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deletedQ, questionValues]);

    const EditerField = (index) => {
        setModalShow(true);
        setQuestionIndex(index);
    };

    const CloseModal = () => {
        setModalShow(false);
        setStatus(!newState);
        setQuestionIndex(questionIndex);
    };

    const tobackquestion = () => {
        if (questionIndex <= 0) {
            setQuestionIndex(0);
        } else {
            setQuestionIndex((prev) => prev - 1);
        }
    };
    const tonextquestion = () => {
        if (questionIndex >= questionValues.length - 1) {
            setQuestionIndex(questionIndex);
        } else {
            setQuestionIndex((prev) => prev + 1);
        }
    };

    const handleClose = () => setModalShow(false);

    return (
        <>
            <Form noValidate>
                <div>
                    {questionValues?.map((field, index) => (
                        <Row className="question-row question-classic" key={field?._id}>
                            <Col sm={1} className=" text-end">
                                <p className="text-white qindexs">{index + 1}</p>
                            </Col>
                            <Col sm={10} md={5} className="questionblock questnss" key={field?.id + 'col'}>
                                <Form.Group rows={20}>
                                    <CKEditor
                                        key={field?.id}
                                        id="myediter"
                                        editor={ClassicExtended}
                                        data={field?.question}
                                        rows={13}
                                        onReady={(editor) => {
                                            if (index === questionValues.length - 1) {
                                                setQuestionAdded(false);
                                            }
                                        }}
                                        config={{
                                            placeholder: 'Question',
                                            toolbar: ['bold', 'italic', 'underline', 'numberedList', 'bulletedList', '|', 'link', 'blockQuote', 'mediaEmbed']
                                        }}
                                        onChange={(event, editor) => {
                                            if (!modalShow) {
                                                const data = editor.getData();
                                                handleChange(data, field.id, 'question');
                                            }
                                        }}
                                    />
                                    <div className="d-flex up-media">
                                        {field.files?.map((file, i) => {
                                            if (file.type?.includes('image')) {
                                                return (
                                                    <p className="position-relative up-media" key={i}>
                                                        <img src={URL.createObjectURL(file)} height="50" width="50" />
                                                        <span onClick={() => setDeletedQNMedia(field.id, i)}>x</span>
                                                    </p>
                                                );
                                            } else if (file.type?.includes('video')) {
                                                return (
                                                    <p className="position-relative up-media" key={i}>
                                                        <video style={{ maxWidth: '110px' }} playsInline loop muted controls alt="All the devices" src={URL.createObjectURL(file)} />
                                                        <span onClick={() => setDeletedQNMedia(field.id, i)}>x</span>
                                                    </p>
                                                );
                                            }
                                        })}
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col sm={10} md={5}>
                                <Form.Group className="sameansques">
                                    <div className="sameansques">
                                        <Form.Control
                                            className="sameansques"
                                            value={field?.answer}
                                            onChange={(event) => {
                                                handleChange(event.target.value, field.id, 'answer');
                                            }}
                                            placeholder="Answer"
                                            as="textarea"
                                            rows={13}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col sm={1} className="">
                                <img src="../assets/trash.svg" className="d-block questn-icons cursor-pointer" onClick={() => checkdelete(field.id, field)} />
                                <img
                                    src="../assets/maximize.svg"
                                    className="d-block questn-icons mt-2 cursor-pointer"
                                    onClick={() => {
                                        setSelectedQuesSecton(field);
                                        EditerField(index);
                                    }}
                                />
                            </Col>
                        </Row>
                    ))}

                    <Row className="mb-3">
                        <div className="text-center mt-5">
                            <Form.Group className="mb-3 d-flex align-items-center justify-content-center" controlId="">
                                <Button
                                    className="addquestion me-2"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setQuestionAdded(true);
                                    }}
                                >
                                    {questionAdded ? <Spinner animation="border" variant="light" /> : '+'} ADD QUESTION
                                </Button>
                                <Form.Select style={{ maxWidth: '80px' }} className=" noofquestions" onChange={(e) => setnoofQuestion(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Row>
                </div>
            </Form>

            <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" className="questionmodells" onHide={handleClose} centered>
                <Modal.Header className="questnheader">
                    <Button onClick={CloseModal}>Exit Fullscreen</Button>
                </Modal.Header>
                <Modal.Body className=".gradesmodelbody">
                    <Container className="gradesmodelbox">
                        <Row className=" question-row p-4">
                            <Col sm={10} md={6} className="questionblock position-relative">
                                <>
                                    <Form.Group className="mb-3" controlId="file">
                                        <Form.Label for="file" className="customfile">
                                            <img src="../assets/gallery.png" alt="" />
                                        </Form.Label>

                                        <Form.Control
                                            rows={15}
                                            style={{ display: 'none' }}
                                            type="file"
                                            required
                                            multiple
                                            name="file"
                                            accept="image/png, image/jpeg,image/jpg,image/svg,video/*,audio/*"
                                            onChange={(e) => {
                                                const fileNames = Object.keys(e.target.files);
                                                if (fileNames.find((file) => !['image', 'video', 'audio'].includes(e.target.files[file].type.split('/')[0]))) {
                                                    alert('File Type not Supported!');
                                                    handleClose();
                                                } else if (fileNames.find((file) => e.target.files[file].size > 10000000)) {
                                                    alert('File is too big!\nMax File Size 10mb');
                                                    handleClose();
                                                } else {
                                                    const newQ = questionValues;
                                                    newQ[questionIndex].files = [...questionValues[questionIndex].files, ...e.target.files];
                                                    setQuestionValues(newQ);
                                                    setData({ ...data, questions: newQ });
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                    <CKEditor
                                        editor={ClassicExtended}
                                        rows={13}
                                        data={questionValues[questionIndex]?.question}
                                        onReady={(editor) => {}}
                                        config={{
                                            placeholder: 'Question',
                                            toolbar: ['bold', 'italic', 'underline', '|', 'alignment', '|', 'numberedList', 'bulletedList', '|', 'link', '|', 'redo']
                                        }}
                                        onBlur={(event, editor) => {}}
                                        onFocus={(event, editor) => {}}
                                        key={questionValues[questionIndex]?.id}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            handleChange(data, selectedQuesSection?.id, 'question');
                                        }}
                                    />
                                    {questionValues[questionIndex]?.files?.map((file) => {
                                        if (file.type?.includes('image')) {
                                            return <img src={URL.createObjectURL(file)} height="40" width="40" />;
                                        } else if (file.type?.includes('video')) {
                                            return <video style={{ maxWidth: '30%' }} playsInline loop muted controls alt="All the devices" src={URL.createObjectURL(file)} />;
                                        }
                                    })}
                                </>
                            </Col>
                            <Col sm={10} md={6}>
                                <Form.Group className="sameansques">
                                    <div className="answermodel">
                                        <Form.Control
                                            id="file"
                                            className="answerinModal "
                                            value={questionValues[questionIndex]?.answer}
                                            key={questionValues[questionIndex]?.id}
                                            onChange={(event) => {
                                                const data = event.target.value;
                                                const questions = [...questionValues];
                                                questions[questionIndex]['answer'] = data;
                                                setQuestionValues(questions);
                                            }}
                                            placeholder="Answer"
                                            as="textarea"
                                            rows={13}
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <p className="prev">
                            <img src="../assets/w-left.svg" alt="" onClick={() => tobackquestion()} />
                        </p>
                        <p className="next">
                            <img src="../assets/w-right.svg" alt="" onClick={() => tonextquestion()} />
                        </p>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default StudyQuestion;
