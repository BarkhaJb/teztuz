import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Container, ProgressBar, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Subjectscards from '../components/course/cards';
import Header from '../Layouts/Header';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import FileBase64 from 'react-file-base64';
const Courses = () => {
    const username = 'User X';
    const [paidCourse, setPaidCourse] = useState(false);
    const [courses, setCourses] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [postId, setPostId] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
    }, []);

    const schema = yup.object().shape({
        title: yup.string().required('This field is required'),
        description: yup.string(),
        coursePrice: yup.string(),
        courseFile: yup.mixed()
    });
    useEffect(async () => {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/courses`);
        try {
            setCourses(res.data);
        } catch (error) {
            console.log(error);
        }
    }, [toggle]);
    const deleteCourse = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/courses/${id}`);
            alert('Course Deleted');
            setToggle(!toggle);
        } catch (error) {
            console.log(error);
        }
    };
    const [postCourseModal, setpostCourseModal] = useState(false);
    function PostCourseModal(props) {
        const [coursesFile, setCoursesFile] = useState();
        const handleSubmit = (values) => {
            let data = { title: values.title, description: values.description, courseFile: coursesFile, coursePrice: values.coursePrice };
            if (postId) {
                setpostCourseModal(true);
                try {
                    axios.put(`${process.env.REACT_APP_BASE_URL}/api/courses/${postId}`, data);
                    setpostCourseModal(false);
                    setCourses(courses);
                    setToggle(!toggle);
                } catch (error) {
                    console.log(error);
                }
            } else
                try {
                    axios.post(`${process.env.REACT_APP_BASE_URL}/api/courses`, data);

                    setpostCourseModal(false);
                    setCourses(courses);
                    setToggle(!toggle);
                } catch (error) {
                    console.log(error);
                }
        };
        let initialValues = { title: '', description: '', coursePrice: '', courseFile: '' };

        return (
            <Modal {...props} size="" aria-labelledby="contained-modal-title-vcenter" className="course-Modal" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={initialValues}>
                        {({ handleSubmit, handleChange, values, errors }) => (
                            <Form onSubmit={handleSubmit} className="course-form">
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="titile" className="position-relative">
                                        <Form.Control type="text" name="title" placeholder="Course Title" isInvalid={errors.title} value={values.title} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" controlId="description" className="my-3 position-relative">
                                        <Form.Control as="textarea" rows={5} name="description" placeholder="Course Description" value={values.description} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" className="mb-3">
                                        <Form.Select aria-label="Default select example" onChange={handleChange} name="coursePrice">
                                            <option defaultValue="Free">Free</option>
                                            <option value="Paid">Paid</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group id="formFileLg" className="mb-3">
                                        <FileBase64 type="file" multiple={false} accept="png" onDone={({ base64 }) => setCoursesFile(base64)} />
                                    </Form.Group>
                                </Row>
                                <Button type="submit">{postId ? 'Update' : 'Create'}</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        );
    }
    return (
        <>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>
            <div className="referals coursesmain courses">
                <Container className="">
                    <Row className="refers-cols">
                        <Col xs={12} md={3} className="crhead">
                            <h2 className="pe-1">
                                <b>Lorem ipsum, dolor sit amet consectetur sit amet sit. </b>
                            </h2>
                        </Col>
                        <Col xs={12} md={9} className="mute-bell m-auto">
                            <Row className="cr-userblock">
                                <Col xs={8} className="crhead">
                                    <b> Refer 3 people & get to a free course or Tezts points</b>
                                </Col>
                                <Col xs={4} className="crhead text-end">
                                    <b>
                                        Username: <span className="cr-usernames">{username}</span>
                                    </b>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <div className="gredient-line my-4"></div>
                <Container className="py-1">
                    <div className="course-card">
                        {JSON.parse(localStorage.getItem('user')).userId ? (
                            <Button
                                onClick={() => {
                                    setPostId();
                                    setpostCourseModal(true);
                                }}
                                className="addcourse-btn"
                            >
                                Add Course
                            </Button>
                        ) : null}
                        <Row className="mycards">
                            {courses.map((item, i) => {
                                return (
                                    <Col xs={12} md={6} lg={3} key={i} className="card-1">
                                        <Subjectscards
                                            paidCourse={paidCourse}
                                            watch="WATCH TRAILER"
                                            View="VIEW COURSE"
                                            bgimages={item.courseFile ? item.courseFile : '../assets/cours.jpg'}
                                            title={item.title}
                                            id={item._id}
                                            description={item.description}
                                            coursePrice={item.coursePrice}
                                            deleteCourse={deleteCourse}
                                            setPostId={setPostId}
                                            setpostCourseModal={setpostCourseModal}
                                        />
                                        <ProgressBar now={30} className="my-3 courseprogress two-progress" style={{ height: '7px' }} />
                                        <Button className="text-center free">{item.coursePrice ? item.coursePrice : 'Free'}</Button>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                    <PostCourseModal show={postCourseModal} onHide={() => setpostCourseModal(false)} />
                </Container>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Courses;
