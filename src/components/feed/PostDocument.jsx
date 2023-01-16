import React, { useState } from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import '../../css/main.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const PostDocument = () => {
    const [subject, setSubject] = useState([
        { subject: 'Chemistry', id: 0 },
        { subject: 'Math', id: 0 },
        { subject: 'English', id: 0 },
        { subject: 'Chemistry', id: 0 }
    ]);

    return (
        <div className="">
            <Container className="" fluid>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            {subject.map((val, index) => {
                                return (
                                    <>
                                        <Col xs={6} className="my-3 docment">
                                            <div key={index}>
                                                <p className="doc mkpost"></p>
                                                <Button>Chemistry</Button>
                                            </div>
                                        </Col>
                                    </>
                                );
                            })}
                        </Row>
                    </Col>
                    <Col xs={12} md={6} className="tezt-ck">
                        <Form>
                            <CKEditor
                                editor={ClassicEditor}
                                data=""
                                onReady={(editor) => {}}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                }}
                            />
                            <Form.Select className="form-control form-select private" onChange={(e) => alert(e.target.value)} size="lg">
                                <option value="Private">Private</option>
                                <option value="public">Public</option>
                                <option value="other">Other</option>
                            </Form.Select>

                            <Button type="submit" className="post my-4 d-block ms-auto">
                                Post
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default PostDocument;
