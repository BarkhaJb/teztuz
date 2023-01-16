import React, { useState, useMemo, useEffect } from 'react';
import { Container, Button, Modal, Row, Col } from 'react-bootstrap';
import '../../../css/main.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import AddEventForm from './AddEvents';
import axios from 'axios';
import { ApiUrl } from '../../../config';
const Calender = () => {
    const [stringg, setString] = useState();
    const EventDataModal = ({ show, onHide, selected }) => {
        const { allDay, category, description, enddate, endtime, repeat, startdate, starttime, title, user } = selected;

        return (
            <Container className="evntsmodal">
                <Modal
                    show={show}
                    onHide={onHide}
                    // {...props}
                    className="events"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'white' }}>
                            Event
                        </Modal.Title>
                    </Modal.Header>
                    <Container>
                        <div className="events-added">
                            <Modal.Body>
                                <h4 style={{ fontSize: '21px !important' }}>{title}</h4>
                                {/* <div>
                                <h4>Day</h4>
                                <p className="event-data">{allDay}</p>
                            </div> */}
                                <Row>
                                    <Col className="pl-0">
                                        <h4>Start Date</h4>
                                        <p className="event-data">{new Date(startdate).toDateString()}</p>
                                    </Col>
                                    <Col>
                                        <h4>End Date</h4>
                                        <p className="event-data">{new Date(enddate).toDateString()}</p>
                                    </Col>
                                    <div className="hr-style">
                                        <hr className="line-hrizontal" />
                                    </div>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Start Time</h4>
                                        <p className="event-data">{`${starttime} ${new Date(startdate).getHours() > 12 ? 'AM' : 'PM'}`}</p>
                                    </Col>
                                    <Col>
                                        <h4>End Time</h4>
                                        <p className="event-data">{`${endtime} ${new Date(startdate).getHours() < 12 ? 'AM' : 'PM'}`}</p>
                                    </Col>
                                    <div className="hr-style">
                                        <hr className="line-hrizontal" />
                                    </div>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>User</h4>
                                        <p className="event-data">{user}</p>
                                    </Col>
                                    <Col>
                                        <h4>Repeat</h4>
                                        <p className="event-data">{repeat}</p>
                                    </Col>
                                    <div className="hr-style">
                                        <hr className="line-hrizontal" />
                                    </div>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Description</h4>
                                        <p className="event-data">{description?.replace(/(<([^>]+)>)/gi, '')}</p>
                                    </Col>
                                    <div className="hr-style">
                                        <hr className="line-hrizontal" />
                                    </div>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Category</h4>
                                        <p className="event-data">{category}</p>
                                    </Col>
                                </Row>
                            </Modal.Body>
                        </div>
                    </Container>
                </Modal>
            </Container>
        );
    };
    const localizer = momentLocalizer(moment);
    const [modalShow, setModalShow] = React.useState(false);
    const now = new Date();
    const [events, setEvents] = React.useState([]);
    const { defaultDate, scrollToTime } = useMemo(
        () => ({
            defaultDate: new Date(2015, 3, 12),
            scrollToTime: new Date(1970, 1, 1, 6)
        }),
        []
    );

    const getEvents = async () => {
        try {
            let user = localStorage.getItem('user');
            let parsedUser = JSON.parse(user);
            // console.log(parsedUser.email);
            // console.log(parsedUser.email);

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

    useEffect(() => {
        getEvents();
    }, []);

    // const myEventsList = [{ start: new Date('June 12 2022'), end: new Date('June 16 2022'), title: 'My Events' }];
    const AddEvents = (props) => {
        return (
            <Container className="evntsmodal">
                <Modal {...props} aria-labelledby="" size="" centered className="events">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="text-white">
                            Add Events
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddEventForm setModalShow={setModalShow} setEvents={setEvents} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide} className="event-cancel">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    };
    const [eventDataModal, setEventModal] = useState(false);
    const [eventData, setEventData] = useState({});
    return (
        <>
            <div className="position-relative">
                <Button variant="primary" className="addevents-btn" onClick={() => setModalShow(true)}>
                    <img src="../assets/plus-c.svg" alt="addevents" /> Add Events
                </Button>
                <Calendar
                    events={events}
                    onSelectEvent={(event) => {
                        setEventData(event);
                        setEventModal(true);
                        console.log(event, 'csxczxczx');
                    }}
                    localizer={localizer}
                    selectable
                    scrollToTime={scrollToTime}
                    startAccessor="startdate"
                    endAccessor="enddate"
                    // style={{ height: '100vh', background: '#5c92bd' }}
                    style={{ height: '100vh', background: 'linear-gradient(180deg, #5786BA 9%, #9CBEDF 100%)' }}
                />
            </div>
            <EventDataModal show={eventDataModal} onHide={() => setEventModal(false)} selected={eventData} />
            <AddEvents show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default Calender;
