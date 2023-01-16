import React, { useState } from 'react';
import { Container, Button, Col, Row, Form, Modal } from 'react-bootstrap';
import '../../css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';

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
                                <Link to="/courses" className="tezt-btn">
                                    <div>
                                        <div className="resource-gradic">
                                            <img src="../assets/new/Add Courses.png" alt="Add Courses.png" />
                                        </div>
                                        <Button className="mt-2 purchase">PURCHASE COURSE</Button>
                                    </div>
                                </Link>
                            </Col>

                            {courses.map((val, index) => {
                                return (
                                    <Col xs={6} md={3} className="my-3 docment p-4 resr" key={val.id}>
                                        <div>
                                            <div className="resource-gradic">
                                                <img src="../assets/new/Video.png" alt="video" />
                                            </div>
                                            <p className="text-center text-white">Add Title</p>
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

export default ProfileCourses;
