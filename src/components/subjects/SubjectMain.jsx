import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import '../../css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ProfileTezt from '../Profile/ProfileTeztus';
import ProfileDocument from '../Profile/ProfileDocument';
import ProfileCourses from '../Profile/ProfileCourses';
import Folders from '../Profile/ProfileFolder';
const SubjectMain = (props) => {
    const [resource, setrources] = useState();

    useEffect(() => {}, []);
    useEffect(() => {
        if (props.subjectMain) {
            setrources(true);
        } else {
            setrources(false);
        }
    }, []);
    return (
        <>
            <section className="semester-credit profile-education pt-4" id="resources-sub">
                <div className="resourse-component">
                    <div className="container">
                        <h3 className="text-white">
                            <b>Tezts</b>
                        </h3>
                    </div>
                    <ProfileTezt userId={props.userId} />
                    {/* <Tabs defaultActiveKey="Folder" id="uncontrolled-tab-example" className="mb-3 mk-post ">
                        <Tab eventKey="Folder" title="Folder">
                            <Folders subjects={props.subject} setSubjectMain={resource} />
                        </Tab>
                        <Tab eventKey="Tezt" title="Tezt">
                            <ProfileTezt userId={props.userId} />
                        </Tab>

                        <Tab className={props.subject ? 'dddss' : 'sciencepage'} eventKey="Document" title="Document">
                            <ProfileDocument subjects={props.subject} setSubjectMain={resource} />
                        </Tab>

                        {props.subjectMain ? (
                            <Tab eventKey="Courses" title="Courses">
                                <ProfileCourses subjects={props.subject} setSubjectMain={resource} />
                            </Tab>
                        ) : null}
                        {props.subject ? (
                            <Tab eventKey="Courses" title="Courses">
                                <ProfileCourses setSubjectMain={resource} />
                            </Tab>
                        ) : null}
                    </Tabs> */}
                </div>
            </section>
        </>
    );
};

export default SubjectMain;
