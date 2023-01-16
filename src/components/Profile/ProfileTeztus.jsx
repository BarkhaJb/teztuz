import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Button, Col, Row, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/main.css';
import tezt from '../../images/Add Tezt.png';
import axios from 'axios';
import { ApiUrl } from '../../config';

const ProfileTezt = ({ userId }) => {
    console.log('user', userId);
    const navigate = useNavigate();
    const [studySets, setStudySets] = useState();
    const [TeztRemoved, setTeztRemove] = useState();
    // id of the tezt to be deleted
    const [indexTezt, setIndexTezt] = useState();
    const [noOfTezts, setNoOfTezts] = useState(0);

    const fetchStudySets = async () => {
        debugger;
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/user/` + userId);

            setStudySets(res.data);
            setNoOfTezts(res.data.length);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchStudySets();
    }, [userId, noOfTezts]);

    const startStudySession = async (studySetId) => {
        navigate('/study-session/' + studySetId);
    };

    const redirectToCreate = () => {
        navigate('/create-studySet');
    };

    const EditTezt = async (id) => {
        navigate('/edit-studySet/' + id);
    };

    const FilterModal = (id) => {
        setTeztRemove(true);
        setIndexTezt(id);
    };

    const deleteStudySet = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/studySets/${indexTezt}`);
            console.log('Study Set deleted');
            setTeztRemove(false);
            setNoOfTezts(noOfTezts - 1);
        } catch (err) {
            console.log(err);
        }
        fetchStudySets();
    };

    // const fordelete = (value) => {
    //     setIndexTezt(value);
    //     deleteStudySet();
    // };

    const TeztRemove = (prop) => {
        return (
            <Modal {...prop} backdrop="static" keyboard={false} size="" aria-labelledby="contained-modal-title-vcenter" className="passwordmodels" centered>
                <Modal.Body>
                    <div className="text-center confirm-model">
                        <p>Are You sure you want to delete Tezt?</p>
                        <Button className="cancel" onClick={prop.onHide}>
                            Cancel
                        </Button>
                        <Button className="delete" onClick={() => deleteStudySet(prop.id)}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    };

    return (
        <>
            <div className="Tezts mt-4" style={{ borderTop: '1px solid #fff' }}>
                <Container>
                    <div className="mt-4">
                        <Row id="all-tezt">
                            <Col xs={6} md={3} className="my-3 docment resr p-4">
                                <Link to="/create-studySet" className="tezt-btn">
                                    <div>
                                        <div className="resource-gradii">
                                            <img src={tezt} alt="" onClick={() => redirectToCreate()} />
                                        </div>
                                        <Button onClick={() => redirectToCreate()}>CREATE TEZT</Button>
                                    </div>
                                </Link>
                            </Col>
                            {studySets &&
                                studySets
                                    ?.filter((s) => s.userId === userId)
                                    .map((val, index) => {
                                        return (
                                            <Col xs={6} md={3} className="my-3 docmenttt p-4 resr" key={index}>
                                                <div>
                                                    <p>
                                                        <img src="../assets/22.png" alt="puzle" className="rounded-pill p-3" width="100%" onClick={() => startStudySession(val._id)} />
                                                    </p>
                                                    <Form.Control type="text" name="tezt" value={val.title} className="resfield" placeholder="Add Title" />
                                                    <img src="../assets/trash.svg" alt="trash" className="trashff" onClick={() => FilterModal(val._id)} />
                                                    <img src="../images/edit-2.svg" alt="trash edit" className="trashff edit" onClick={() => EditTezt(val._id)} />
                                                </div>
                                            </Col>
                                        );
                                    })}
                        </Row>
                    </div>
                    <TeztRemove show={TeztRemoved} onHide={() => setTeztRemove(false)} />
                </Container>
            </div>
        </>
    );
};

export default ProfileTezt;
