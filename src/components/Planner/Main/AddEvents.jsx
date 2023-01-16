import React, { useState } from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import '../../../css/main.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicExtended from 'ckeditor5-build-classic-extended';
import axios from 'axios';
import { ApiUrl } from '../../../config';
import { toast } from 'react-toastify';

const AddEventForm = (props) => {
    const { setEvents, events, show, setModalShow } = props;
    console.log(props, 'casacxsacsa');
    const [ckValue, setCkValue] = useState();
    const schema = yup.object().shape({
        category: yup.string(),
        startdate: yup.date().required('This field is required'),
        starttime: yup.string(),
        enddate: yup.date(),
        endtime: yup.string(),
        title: yup.string().required('This field is required'),
        color: yup.string(),
        repeat: yup.string(),
        description: yup.string(),
        alert: yup.string(),
        allDay: yup.bool().required()
    });
    const getEvents = async () => {
        try {
            let user = localStorage.getItem('user');
            let parsedUser = JSON.parse(user);
            console.log(parsedUser.email);
            console.log(parsedUser.email);

            const resData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/events/getMyEvents/${parsedUser.email}`, {
                validateStatus: () => true
            });
            let editedEvents = resData.data.map((e) => {
                return {
                    title: e.title,
                    startdate: new Date(e.startdate),
                    enddate: new Date(e.enddate),
                    allDay: e.allDay,
                    category: e.category,
                    starttime: e.starttime,
                    endtime: e.endtime,
                    description: e.description,
                    repeat: e.repeat,
                    user: e.user
                };
            });
            setEvents(editedEvents);
        } catch (error) {
            console.log(error);
        }
    };
    const EventSuccess = () =>
        toast.success('Event Added Successfully', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 2000,
            hideProgressBar: false
        });

    const handleSubmit = async (values) => {
        try {
            let user = localStorage.getItem('user');
            let parsedUser = JSON.parse(user);
            console.log(parsedUser.email);
            const resData = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/events`,
                { ...values, user: parsedUser.email, description: ckValue },
                {
                    validateStatus: () => true
                }
            );
            console.log(resData, 'cdscdsacsac');
            if (resData.status !== 200) {
                toast(`${resData.data.message && resData.data.message}`);
            }
            setModalShow(false);
            if (resData.status && resData.status === 200) {
                EventSuccess();
            }
        } catch (error) {
            console.log(error.response, 'cdscdsacsac');
        }

        // let newValues = [{ ...values, ['eventDetail']: ckValue }];
        // alert(JSON.stringify(newValues), 'data');
        getEvents();
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                category: '',
                title: '',
                allDay: false,
                color: '',
                startdate: '',
                starttime: '',
                enddate: '',
                endtime: '',
                repeat: '',
                alert: '',
                description: ''
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, touched, errors }) => (
                <Form Validate onSubmit={handleSubmit} className="study-modes eventsform">
                    <Container fluid>
                        <Row>
                            <Col sm={12}>
                                <Form.Group controlId="newevent">
                                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                    <Form.Control type="text" name="title" placeholder="Event Name" className="new-event mb-3" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="category" className="mb-3">
                                    <Form.Select size="lg" className="form-control form-select evtnslect" name="category" required as="select" placeholder="Select" onChange={handleChange}>
                                        <option defaultValue="None" hidden>
                                            Select Category
                                        </option>
                                        <option value="calculus">Calculus</option>
                                        <option value="english">English</option>
                                        <option value="history">History</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={5}>
                                {/* <Row> */}

                                <div className="all-day">
                                    <div className="d-flex">
                                        <Form.Label>All Day</Form.Label>
                                        <Form.Check
                                            name="allDay"
                                            label=""
                                            className="m-2"
                                            onChange={handleChange}
                                            isInvalid={!!errors.allDay}
                                            feedback={errors.allDay}
                                            feedbackType="invalid"
                                            id="validationFormik00"
                                        />
                                    </div>

                                    <Form.Group controlId="color" className="startdate colorfild d-flex justify-content-between">
                                        <Form.Control type="color" name="color" className="mx-1" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik01" className="startdate d-flex justify-content-between">
                                        <Form.Label>Starts:</Form.Label>
                                        <p className="mb-0">
                                            <Form.Control type="date" name="startdate" className="mx-1" onChange={handleChange} isValid={touched.startdate && !errors.startdate} />
                                            <Form.Control.Feedback type="invalid">{errors.startdate}</Form.Control.Feedback>
                                        </p>
                                        <p className="mb-0">
                                            <Form.Control type="time" name="starttime" onChange={handleChange} isValid={touched.starttime && !errors.starttime} />
                                            <Form.Control.Feedback type="invalid">{errors.starttime}</Form.Control.Feedback>
                                        </p>
                                    </Form.Group>
                                    <Form.Group controlId="validationFormik01" className="d-flex my-1">
                                        <Form.Label>End</Form.Label>
                                        <p className="mb-0">
                                            {' '}
                                            <Form.Control type="date" name="enddate" className="mx-1" onChange={handleChange} isValid={touched.endtime && !errors.enddate} />{' '}
                                            <Form.Control.Feedback type="invalid">{errors.enddate}</Form.Control.Feedback>
                                        </p>
                                        <p className="mb-0">
                                            <Form.Control type="time" name="endtime" onChange={handleChange} isValid={touched.endtime && !errors.endtime} />{' '}
                                            <Form.Control.Feedback type="invalid">{errors.endtime}</Form.Control.Feedback>
                                        </p>
                                    </Form.Group>

                                    <Form.Group controlId="alert" className="day-select d-flex">
                                        <Form.Label className="me-3 mt-3">Alert</Form.Label>
                                        <Form.Control name="alert" required as="select" placeholder="Select" onChange={handleChange}>
                                            <option defaultValue="None">None</option>
                                            <option value="At time of event">At time of event</option>
                                            <option value="5 mints before">5 mints before</option>
                                            <option value="10 mints before">10 mints before</option>
                                            <option value="15 mints before">15 mints before</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="repeat" className="day-select d-flex">
                                        <Form.Label className="me-3">Repeat</Form.Label>
                                        <Form.Control name="repeat" required as="select" placeholder="Select" onChange={handleChange}>
                                            <option defaultValue="None">None</option>
                                            <option value="Every Day">Every Day</option>
                                            <option value="Every Week">Every Week</option>
                                            <option value="Every Month">Every Month</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.repeat}</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <Form.Group controlId="" className="my-3">
                                    <Link to="/invite" className="invitelink">
                                        <div className="invtfr text-white">
                                            Invite a Connection <span className="inviteplus"> + </span>
                                        </div>
                                    </Link>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={7} className="event-ck events">
                                <CKEditor
                                    editor={ClassicExtended}
                                    data=""
                                    config={{
                                        placeholder: 'Add Event',
                                        toolbar: ['bold', 'italic', 'underline', 'strikethrough', '|', 'alignment', '|', 'numberedList', 'bulletedList', '|', 'link', 'blockQuote', '|', 'undo', 'redo']
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setCkValue(data);
                                    }}
                                />
                            </Col>
                        </Row>
                        <div className="d-flex mb-4 justify-content-end">
                            <Button onClick={() => props.hideEvent(false)} className="event-cancel mt-3 me-1">
                                Cancel
                            </Button>
                            <Button type="submit" className="mt-3 add-eventsubmit">
                                Add Event
                            </Button>
                        </div>
                        {/* <ToastContainer /> */}
                    </Container>
                </Form>
            )}
        </Formik>
    );
};

export default AddEventForm;
