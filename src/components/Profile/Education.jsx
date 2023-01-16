import React, { useState } from 'react';
import { Container, Button, Col, Row, Table, Tabs, Tab, Form, Modal } from 'react-bootstrap';
import '../../css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Folders from './ProfileFolder';
import ProfileTezt from './ProfileTeztus';
import Footer from '../../Layouts/Footer';
import DocumentModel from './DocumentModel';
import { Link } from 'react-router-dom';

const Education = () => {
    const [modalShow, setModalShow] = useState(false);
    const [DocRemoved, setDocRemove] = useState();
    const [indexDoc, setIndexDoc] = useState('');
    const [CourseRemoved, setCourseRemove] = useState();
    const [indexCourse, setIndexCourse] = useState('');

    const [semester, setSemester] = useState([
        {
            refername: 'M_',
            Date: 'Feb 12 2022',
            total_refers: 5,
            time_passed: 2
        }
    ]);
    const [tezt, setTezt] = useState([
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        }
    ]);
    const [courses, setCourses] = useState([
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        },
        {
            icons: '',
            name: ''
        }
    ]);
    const AddElement = () => {
        setTezt([...tezt, { icons: '', name: '' }]);
    };

    const DeleteObj = (val) => {
        let filteredArr = tezt.filter((tezt, index) => index !== val);
        setTezt(filteredArr);
        setDocRemove(false);
    };
    const DeleteCoursesObj = (val, index) => {
        const filteredArr = [...courses];
        filteredArr.splice(index, 1);
        setCourses(filteredArr);
        setCourseRemove(false);
    };

    const InviteModel = (props) => {
        return (
            <>
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="invitemyfriend educations" centered>
                    <Modal.Header></Modal.Header>
                    <Modal.Body>
                        <DocumentModel closeDocument={setModalShow} />
                    </Modal.Body>
                </Modal>
            </>
        );
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
                        <p>Are You sure you want to delete folder?</p>
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

    const ProfileDocument = () => {
        return (
            <>
                <div className="Document mt-4">
                    <Container>
                        <div className="d-flex justify-content-between">
                            <h5 className="text-white">Documents</h5>
                            <p>
                                <Button className="viemore global-btn">View More</Button>
                            </p>
                        </div>
                        <div>
                            <Row>
                                {/* Blur odd elements with css  */}
                                <Col xs={6} md={3} className="my-3 docment resr p-4">
                                    <div>
                                        <div className="resource-gradient docs">
                                            <p className="documentblckk">
                                                <img src="../assets/pluse.svg" alt="puzle" className="rounded-pill m-auto p-3" />
                                            </p>
                                        </div>

                                        <Button onClick={() => setModalShow(true)} className="mt-2">
                                            Upload Document
                                        </Button>
                                    </div>
                                </Col>

                                {tezt.map((val, index) => {
                                    return (
                                        <Col xs={6} md={3} className="my-3 docment p-4 resr" key={index}>
                                            <div>
                                                <p className="documentblck">Aa</p>
                                                <Form.Control type="text" name="" defaultValue="Add Title" className="resfield" placeholder="Add Title" />
                                                <img src="../assets/trash.svg" alt="trash" className="trashff" onClick={() => FilterModal(index)} />
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                            <hr className="hr" />
                        </div>
                    </Container>
                </div>
            </>
        );
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
                        <p>Are You sure you want to delete folder?</p>
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
    const Courses = () => {
        return (
            <>
                <div className="Document mt-4">
                    <Container>
                        <div className="d-flex justify-content-between">
                            <h5 className="text-white">Documents</h5>
                            <p>
                                <Button className="viemore global-btn">View More</Button>
                            </p>
                        </div>
                        <div>
                            <Row>
                                <Col xs={6} md={3} className="my-3 docment resr p-4">
                                    <div>
                                        <div className="resource-gradient docs courses">
                                            <p className="documentblckk">
                                                <img src="../assets/pluse.svg" alt="puzle" className="rounded-pill m-auto p-3" />
                                            </p>
                                        </div>

                                        {/* <Button onClick={() => setModalShow(true)} className="mt-2">PURCHASE COURSE</Button> */}
                                        <Link to="/courses" className="tezt-btn">
                                            {' '}
                                            <Button className="mt-2">PURCHASE COURSE</Button>
                                        </Link>
                                    </div>
                                </Col>

                                {courses.map((val, index) => {
                                    return (
                                        <Col xs={6} md={3} className="my-3 docment p-4 resr" key={index}>
                                            <div>
                                                {/* {index} */}
                                                <div className="resource-gradient">
                                                    {' '}
                                                    <p className="">
                                                        <img src="../assets/play.svg" alt="Folder" />
                                                    </p>
                                                </div>
                                                <Form.Control type="text" name="title" defaultValue="Add Title" className="resfield" placeholder="Add Title" />
                                                <img src="../assets/trash.svg" alt="trash" className="trashff" onClick={() => Filter2Modal(index)} />
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                            <hr className="hr" />
                        </div>
                    </Container>
                </div>
            </>
        );
    };
    return (
        <>
            <div className="semester-credit profile-education pt-5 ">
                <Container>
                    <div>
                        <h3 className="text-white">EDUCATION</h3>
                        <p className="text-white border-bottom pb-3 mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi</p>
                    </div>
                    {semester.map((val, index) => {
                        return (
                            <Table size="sm" key={index}>
                                <thead>
                                    <tr>
                                        <th className="ps-0">Education Level</th>
                                        <th className="ps-0">Courses</th>
                                        <th className="ps-0">Final Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h5>School Name</h5>
                                            Programe Name <p>Date Attended</p>
                                        </td>
                                        <td>
                                            <span>
                                                <img src="../assets/plus-c.svg" alt="plus-add" className="pluss-palner" />
                                            </span>
                                            Add Course Name
                                        </td>
                                        <td className="sml-btn">
                                            - <Button>Add Grade</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        );
                    })}
                    <Table size="sm">
                        <thead>
                            <tr className="acadamic">
                                <td colSpan={5}>
                                    <span>
                                        <img src="../assets/plus-c.svg" alt="plus-add" className="pluss-palner" />
                                    </span>
                                    Add Academic Award
                                </td>
                            </tr>
                        </thead>
                    </Table>

                    <hr className="hr" />
                    <p className="add-semster pb-5" style={{ paddingLeft: '15px' }}>
                        <img src="../assets/plus-c.svg" alt="plus-add" className="pluss-palner" />
                        Add School
                    </p>
                </Container>
                <div className="resourse-component">
                    {' '}
                    <div className="container">
                        <h3 className="text-white">Resourses</h3>
                    </div>
                    <Tabs defaultActiveKey="Folder" id="uncontrolled-tab-example" className="mb-3 mk-post ">
                        <Tab eventKey="Folder" title="Folder">
                            <Folders />
                        </Tab>
                        <Tab eventKey="Tezt" title="Tezt">
                            <ProfileTezt />
                        </Tab>
                        <Tab eventKey="Document" title="Document">
                            <ProfileDocument />
                        </Tab>
                        <Tab eventKey="Courses" title="Courses">
                            <Courses />
                        </Tab>
                    </Tabs>
                    {/* <Folders />
                            <ProfileTezt />
                            <ProfileDocument /> */}
                    <InviteModel show={modalShow} onHide={() => setModalShow(false)} />
                    <DocRemove show={DocRemoved} onHide={() => setDocRemove(false)} />
                    <CourseRemove show={CourseRemoved} onHide={() => setCourseRemove(false)} />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Education;
