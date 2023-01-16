import React, { useState } from 'react';
import { Row, Col, Container, Tabs, Tab, Button } from 'react-bootstrap';
import '../../css/main.css';
import TeztContent from './TeztContent';
import PostDocument from './PostDocument';
import FeedFolder from './FeedFolder';
import FeedPersonal from './FeedPersonal';
import QuestionContent from './Questioncontent';
import ProfessorRating from './ProfessorRating';
const CreatePost = () => {
    return (
        <div className="">
            <Container className="study-modes" fluid>
                <Row className="invite-friend">
                    <Col sm={12} className="col-fs">
                        <h3 className="m-3 ps-4 text-white">Create a Post</h3>
                        <Tabs defaultActiveKey="question" id="uncontrolled-tab-example" className="mb-3 mk-post">
                            <Tab eventKey="professor" title="Professor">
                                <ProfessorRating />
                            </Tab>
                            <Tab eventKey="question" title="Question">
                                <QuestionContent />
                            </Tab>
                            <Tab eventKey="tezt" title="Tezts">
                                <TeztContent />
                            </Tab>
                            <Tab eventKey="folder" title="Resources">
                                <FeedFolder />
                            </Tab>
                            <Tab eventKey="document" className="profile-tezt mpostdoc" title="Document">
                                <PostDocument />
                            </Tab>
                            <Tab eventKey="personal-update" className="profile-tezt" title="Personal Update">
                                <FeedPersonal />
                            </Tab>
                            <Tab eventKey="other" className="profile-tezt" title="Other">
                                <p className="" style={{ height: '200px' }}></p>

                                <Button type="text" className="post my-4 d-block ms-auto">
                                    Post
                                </Button>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default CreatePost;
