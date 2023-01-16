import React, { useState } from 'react';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const QuestionContent = () => {
    const [searchitem, setSearchvalue] = useState('');

    return (
        <div className="in-userlist create-question">
            <Form>
                <Form.Group className="mb-5 search-friend" controlId="firendsearch">
                    <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="" className="questionmakepost" onChange={(e) => setSearchvalue(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onReady={(editor) => {}}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                    }}
                />

                <Button type="submit" className="post my-4 d-block ms-auto">
                    Post
                </Button>
            </Form>
        </div>
    );
};
export default QuestionContent;
