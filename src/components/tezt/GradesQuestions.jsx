import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Modal, Button, Container } from 'react-bootstrap';
import '../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import GradesModel from './GradesModel';
import { useLocation } from 'react-router-dom';
const GradesQuestion = ({ setScore, correct, setCorrect }) => {
    const location = useLocation();
    const [modalShow, setModalShow] = useState(false);
    const [questionFields, setQuestionField] = useState([]);
    const [selectedField, setSelectedField] = useState({});

    useEffect(() => {
        setQuestionField([]);
        for (var i = 0; i < location.state.questions.length; i++) {
            const question = {
                question: location.state.questions[i].question,
                answer: location.state.userAnswers[i]
            };
            setQuestionField((questionFields) => [...questionFields, question]);
        }

        setCorrect(Array(location.state.questions.length).fill());
    }, [location.state, setCorrect]);

    // Test checked and crossed
    useEffect(() => {
        setScore(correct.filter((value) => value === true).length);
    }, [correct, setScore]);

  

    const toogleCheck = (index) => {
        const arr = [...correct];
        arr[index] = arr[index] ? undefined : true;
        setCorrect(arr);
    };

    const toggleCross = (index) => {
        const arr = [...correct];
        arr[index] = arr[index] === undefined || arr[index] === true ? false : undefined;
        setCorrect(arr);
    };

    const DataCheck = (field) => {
        setSelectedField(field);
        setModalShow(true);
    };

    function FormExample() {
       

        return (
            <Form>
                <div>
                    {questionFields.map((questionfield, index) => (
                        <Row className="question-row justify-content-center" key={index}>
                            <Col sm={10} md={1} className="questionblock ">
                                <h5 className="text-white ps-2">{index + 1}</h5>
                                <img src="../assets/max.png" className="me-2 cursor-pointer" onClick={() => DataCheck(questionfield)} />
                            </Col>
                            <Col sm={10} md={5} className="questionblock">
                                <Form.Group controlId={questionfield.question}>
                                    <Form.Label className="text-white">Question</Form.Label>
                                    <div
                                        style={{ minHeight: 300, color: '#fff', borderTop: '1px solid #fff' }}
                                        name={(questionfield.question, index, 'question')}
                                        dangerouslySetInnerHTML={{
                                            __html: questionfield.question
                                        }}
                                        // value={questionfield.question}
                                        placeholder="Question"
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={10} md={5}>
                                <Form.Group controlId={questionfield.question}>
                                    <Form.Label className="text-white">Answer</Form.Label>
                                    <Form.Control disabled type="text" as="textarea" value={questionfield.answer} rows={5} name={questionfield.answer} placeholder="answer" />
                                </Form.Group>
                            </Col>
                            <Col sm={1} className="studyanswers check-cros">
                                {correct[index] ? (
                                    <img src="../assets/check-mark (1).png" className="me-2 cursor-pointer" onClick={() => toogleCheck(index)} alt="check" />
                                ) : (
                                    <img src="../assets/check-mark.png" className="me-2 cursor-pointer" onClick={() => toogleCheck(index)} alt="check" />
                                )}
                                {!correct[index] && correct[index] !== undefined ? (
                                    <img src="../assets/xg.png" className="cursor-pointer" onClick={() => toggleCross(index)} alt="cross" />
                                ) : (
                                    <img src="../assets/x.png" className="cursor-pointer" onClick={() => toggleCross(index)} alt="cross" />
                                )}
                            </Col>
                        </Row>
                    ))}
                </div>
            </Form>
        );
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="questnheader" closeButton>
                    <Button onClick={() => setModalShow(false)}>Exit Fullscreen</Button>
                </Modal.Header>
                <Modal.Body className="gradesmodelbody">
                    <Form style={{ width: '100%' }}>
                        <Container className="gradesmodelbox">
                            <Row className=" question-row">
                                <Col sm={10} md={6} className="questionblock">
                                    <Form.Group controlId="" className="">
                                        <div
                                            style={{ minHeight: 300, color: '#fff', borderTop: '1px solid #fff' }}
                                            // name={(questionfield.question, index, 'question')}
                                            dangerouslySetInnerHTML={{
                                                __html: selectedField.question
                                            }}
                                            // value={questionfield.question}
                                            placeholder="Question"
                                        />
                                        {/* <Form.Control disabled value={selectedField.question} type="text" as="textarea" rows={15} name="question" placeholder="Question" /> */}
                                    </Form.Group>
                                </Col>
                                <Col sm={10} md={6} className="answerinmodel">
                                    <Form.Group controlId="answer" className="">
                                        <Form.Control value={selectedField.answer} disabled type="text" as="textarea" rows={15} name="answer" placeholder="answer" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Col sm={{ span: 2, offset: 10 }} className="studyanswers">
                                {selectedField.mark ? (
                                    <img src="../assets/check-mark (1).png" className="me-2 cursor-pointer" onClick={() => toogleCheck(selectedField.id)} alt="check" />
                                ) : (
                                    <img src="../assets/check-mark.png" className="me-2 cursor-pointer" onClick={() => toogleCheck(selectedField.id)} alt="check" />
                                )}

                                {selectedField.mark === false ? (
                                    <img src="../assets/xg.png" className="cursor-pointer" onClick={() => toogleCheck(selectedField.id)} alt="cross" />
                                ) : (
                                    <img src="../assets/x.png" className="cursor-pointer" onClick={() => toogleCheck(selectedField.id)} alt="cross" />
                                )}
                            </Col>
                        </Container>
                        <p className="prev">
                            <img src="../assets/w-left.svg" alt="" />
                        </p>
                        <p className="next">
                            <img src="../assets/w-right.svg" alt="" />
                        </p>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <FormExample />
            <MyVerticallyCenteredModal show={modalShow} fullscreen onHide={() => setModalShow(false)} />
        </>
    );
};

export default GradesQuestion;
