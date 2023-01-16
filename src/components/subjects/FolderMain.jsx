import React, { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Table, Tabs, Tab, Form, Modal } from 'react-bootstrap';
import '../../css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ProfileDocument from '../Profile/ProfileDocument';
import ProfileCourses from '../Profile/ProfileCourses';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../Layouts/Footer';
import { getLoggedUser } from '../../helpers/utils';
import axios from 'axios';

const FoldersMain = () => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    const [userId, setUserId] = useState();
    const { folderId } = useParams();
    const [folder, setFolder] = useState();

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
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
    }, [user.email, navigate]);

    useEffect(() => {
        const fetchFolder = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/folders/` + folderId);
                setFolder(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId) {
            fetchFolder();
        }
    }, [userId]);

    const ProfileTezt = (props) => {
        const [TeztRemoved, setTeztRemove] = useState();
        const [indexTezt, setIndexTezt] = useState('');
        const [tezts, setTezts] = useState([]);

        useEffect(() => {
            const fetchTezts = async () => {
                console.log(props.tezts.length);
                try {
                    var updatedTezts = [];
                    for (var i = 0; i < props.tezts.length; i++) {
                        console.log(props.tezts[i]);
                        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/studySet/` + props.tezts[i]);
                        updatedTezts = [...updatedTezts, res.data];
                        setTezts(updatedTezts);
                    }
                } catch (err) {
                    console.log(err);
                }
            };

            console.log(props.tezts);
            if (props.tezts.length > 0) {
                fetchTezts();
            }
        }, [props.tezts]);

        // Remove a tezt from a folder
        const DeleteObj = async (index) => {
            setTeztRemove(false);
            try {
                await axios.put(`${process.env.REACT_APP_BASE_URL}/api/folders/${folderId}/removeTezt`, {
                    folderId: folderId,
                    teztId: index
                });
                props.tezts.splice(props.tezts.indexOf(index), 1);
            } catch (err) {
                console.log(err);
            }
            window.location.reload();
        };

        const FilterModal = (index) => {
            setTeztRemove(true);
            setIndexTezt(index);
        };
        const TeztRemove = (props) => {
            return (
                <Modal {...props} backdrop="static" keyboard={false} size="" aria-labelledby="contained-modal-title-vcenter" className="passwordmodels" centered>
                    <Modal.Body>
                        <div className="text-center confirm-model">
                            <p>Are You sure you want to remove Tezt from this folder?</p>
                            <Button className="cancel" onClick={props.onHide}>
                                Cancel
                            </Button>
                            <Button className="delete" onClick={() => DeleteObj(indexTezt)}>
                                Delete
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            );
        };

        return (
            <>
                <div className="Tezts mt-4">
                    <Container>
                        <div className="mt-4">
                            <Row>
                                <Col xs={6} md={3} className="my-3 docment resr p-4">
                                    <div>
                                        <div className="resource-gradii">
                                            <img src="../assets/new/Add Tezt.png" alt="" onClick={() => navigate('/create-studySet')} />
                                        </div>
                                        <p className="tezt-btn" onClick={() => navigate('/create-studySet')}>
                                            <Button>CREATE TEZT</Button>
                                        </p>
                                    </div>
                                </Col>
                                {tezts
                                    ? tezts.map((val, index) => {
                                          return (
                                              <Col xs={6} md={3} className="my-3 docmenttt p-4 resr" key={val._id}>
                                                  <div>
                                                      <p>
                                                          <img src="../assets/22.png" alt="puzle" className="rounded-pill p-3" width="100%" onClick={() => navigate('/study-session/' + val._id)} />
                                                      </p>
                                                      {/* <p className='text-white'>{val.name}</p> */}
                                                      <Form.Control type="text" name="tezt" value={val.title} className="resfield" placeholder="Add Title" />
                                                      <img src="../assets/trash.svg" alt="trash" className="trashff" onClick={() => FilterModal(val._id)} />
                                                  </div>
                                              </Col>
                                          );
                                      })
                                    : ''}
                            </Row>
                        </div>
                        <TeztRemove show={TeztRemoved} onHide={() => setTeztRemove(false)} />
                    </Container>
                </div>
            </>
        );
    };
    const ProfileDocument = () => {
        const [indexDoc, setIndexDoc] = useState('');
        const [DocRemoved, setDocRemove] = useState();
        const [tezt, setTezt] = useState([
            {
                id: 1,
                icons: '',
                name: ''
            },
            {
                id: 2,
                icons: '',
                name: ''
            },
            {
                id: 3,
                icons: '',
                name: ''
            }
        ]);

        const AddElement = () => {
            setTezt([...tezt, { icons: '', name: '' }]);
        };

        const DeleteObj = () => {
            let filteredArr = tezt.filter((docs) => docs.id !== indexDoc);
            setTezt(filteredArr);
            setDocRemove(false);
        };

        const FilterModal = (index) => {
            setDocRemove(true);
            setIndexDoc(index);
        };
        const DocRemove = (props) => {
            return (
                <Modal {...props} backdrop="static" keyboard={false} size="" aria-labelledby="contained-modal-title-vcenter" className="passwordmodels" centered>
                    <Modal.Body>
                        <div className="text-center confirm-model">
                            <p>Are You sure you want to delete Doc?</p>
                            <Button className="cancel" onClick={props.onHide}>
                                Cancel
                            </Button>
                            <Button className="delete" onClick={() => DeleteObj(indexDoc)}>
                                Delete
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            );
        };

        return (
            <>
                <div className="Document mt-4 resourse-doc">
                    <Container>
                        <div>
                            <Row>
                                {/* Blur odd elements with css  */}
                                <Col xs={6} md={3} className="my-3 docment resr p-4">
                                    <div onClick={AddElement}>
                                        <div className="resource-gradid">
                                            <img src="../assets/new/Add Document.png" alt="" />
                                        </div>
                                        <Button className="mt-2">Add Document</Button>
                                    </div>
                                </Col>

                                {tezt.map((val, index) => {
                                    return (
                                        <Col xs={6} md={3} className="my-3 docment p-4 resr" key={val.id}>
                                            <div>
                                                <div className="resource-gradid">
                                                    <img src="../assets/new/Document.png" alt="ddd" />
                                                </div>
                                                <Form.Control type="text" name="" defaultValue="Add Title" className="resfield" placeholder="Add Title" />
                                                <img src="../assets/trash.svg" alt="trash" className="trashff" onClick={() => FilterModal(val.id)} />
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                        <DocRemove show={DocRemoved} onHide={() => setDocRemove(false)} />
                    </Container>
                </div>
            </>
        );
    };
    const ProfileCourses = () => {
        const [CourseRemoved, setCourseRemove] = useState();
        const [indexCourse, setIndexCourse] = useState('');

        const [courses, setCourses] = useState([
            {
                id: 1,
                icons: '',
                name: ''
            },
            {
                id: 2,
                icons: '',
                name: ''
            },
            {
                id: 3,
                icons: '',
                name: ''
            }
        ]);
        const AddElement = () => {
            setCourses([...courses, { icons: '', name: '' }]);
        };
        const DeleteCoursesObj = () => {
            let filteredArr = courses.filter((docs) => docs.id !== indexCourse);
            setCourses(filteredArr);
            setCourseRemove(false);
        };

        const Filter2Modal = (index) => {
            setCourseRemove(true);
            setIndexCourse(index);
        };
        const CourseRemove = (props) => {
            return (
                <Modal {...props} backdrop="static" keyboard={false} size="" aria-labelledby="contained-modal-title-vcenter" className="passwordmodels" centered>
                    <Modal.Body>
                        <div className="text-center confirm-model">
                            <p>Are You sure you want to delete Course?</p>
                            <Button className="cancel" onClick={props.onHide}>
                                Cancel
                            </Button>
                            <Button className="delete" onClick={() => DeleteCoursesObj(indexCourse)}>
                                Delete
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            );
        };

        return (
            <>
                <div className="Document mt-4">
                    <Container>
                        <div>
                            <Row>
                                <Col xs={6} md={3} className="my-3 docment resr p-4">
                                    <div onClick={AddElement}>
                                        <div className="resource-gradic">
                                            <img src="../assets/new/Add Courses.png" alt="Add Courses.png" />
                                        </div>

                                        <Link to="/courses" className="tezt-btn">
                                            <Button className="mt-2">ADD COURSE</Button>
                                        </Link>
                                    </div>
                                </Col>

                                {courses.map((val, index) => {
                                    return (
                                        <Col xs={6} md={3} className="my-3 docment p-4 resr" key={val.id}>
                                            <div>
                                                <div className="resource-gradic">
                                                    <img src="../assets/new/Video.png" alt="video" />
                                                </div>
                                                <Form.Control type="text" name="title" defaultValue="Add Title" className="resfield" placeholder="Add Title" />
                                                <img src="../assets/trash.svg" alt="trash" className="trashff" onClick={() => Filter2Modal(val.id)} />
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                        <CourseRemove show={CourseRemoved} onHide={() => setCourseRemove(false)} />
                    </Container>
                </div>
            </>
        );
    };
    return (
        <>
            <div className="semester-credit profile-education pt-5 ">
                <div className="resourse-component">
                    <div className="container mt-3">
                        <div className="d-flex align-items-center position-relative ps-5">
                            <div className="me-3">
                                <img src="../assets/folder1.png" alt="folder" style={{ maxWidth: '190px' }} />
                            </div>
                            <div>
                                <h3 className="text-white">{folder && folder.title}</h3>
                                <p className="text-start text-white">Folder</p>
                            </div>
                            <p onClick={() => navigate(-1)}>
                                <img src="../assets/leftt.svg" alt="folder" className="backbutton" />
                            </p>
                        </div>
                    </div>
                    {/* <div className="container">
                        <br />
                        <h3 className="res-ht">Folders</h3>
                        <Folders />
                    </div> */}
                    <hr className="hr-white" />
                    <div className="container">
                        <h3 className="res-ht">Tezt</h3>
                        <br />
                        {folder && <ProfileTezt tezts={folder.tezts} />}
                    </div>
                    <hr className="hr-white" />
                    <div className="container">
                        <h3 className="res-ht">Document</h3>
                        <br />
                        {folder && <ProfileDocument documents={folder.documents} />}
                    </div>
                    <hr className="hr-white" />
                    <div className="container">
                        <h3 className="res-ht">Courses</h3>
                        <br />
                        {folder && <ProfileCourses courses={folder.courses} />}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default FoldersMain;
