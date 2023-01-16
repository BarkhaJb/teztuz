import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className="footer bg-dark">
                <Container>
                    <div className="footer-links">
                        <p style={{ paddingTop: '8px' }}>TeztUs © 2022</p>
                        <Nav.Link as={Link} to="/create-studySet">
                            create-studySet
                        </Nav.Link>
                        <Nav.Link as={Link} to="/study-session">
                            Studysession
                        </Nav.Link>
                        <Nav.Link as={Link} to="/invite">
                            Invite
                        </Nav.Link>
                        <Nav.Link as={Link} to="/start-tezt">
                            starttezt
                        </Nav.Link>
                        <Nav.Link as={Link} to="/grades-tezt">
                            gradestezt
                        </Nav.Link>
                        <Nav.Link as={Link} to="/tezt-summary">
                            teztsumary
                        </Nav.Link>
                        <Nav.Link as={Link} to="/user-analytics">
                            useranlytics
                        </Nav.Link>
                        <Nav.Link href="/subjects">subjects</Nav.Link>
                        <Nav.Link as={Link} to="/referal">
                            referal
                        </Nav.Link>
                        <Nav.Link as={Link} to="/sub-profile">
                            subprofile
                        </Nav.Link>
                        <Nav.Link as={Link} to="/courses">
                            courses
                        </Nav.Link>
                        <Nav.Link as={Link} to="/all-subject">
                            Alsubjects
                        </Nav.Link>
                        {/* <Nav.Link as={Link} to="/planer">
                            Planer
                        </Nav.Link> */}
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link as={Link} to="/payment">
                            Payments
                        </Nav.Link>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Footer;
