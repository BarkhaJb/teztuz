import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import '../../css/main.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Circle } from 'rc-progress';
const ProfessorRating = () => {
    const [profValue, setProfValue] = useState('');
    const [diffValue, setDiffValue] = useState(4);
    const [gradValue, setGradeValue] = useState('');
    return (
        <div className="in-userlist">
            <Form>
                <Form.Select size="lg" className="form-control form-select my-4" onChange={(e) => alert(e.target.value)} style={{ borderRadius: '25px' }}>
                    <option value="May-wau">User X Wau</option>
                    <option value="Jackson">Jackson</option>
                    <option value="Simon">Simon</option>
                </Form.Select>

                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onReady={(editor) => {}}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                    }}
                />
                <div className="d-flex profratings justify-content-evenly" style={{ maxWidth: '700px', margin: 'auto' }}>
                    <div className="position-relative rt-box">
                        <Circle
                            percent={profValue}
                            strokeWidth="7"
                            strokeColor={{
                                '0%': '#114281',
                                '80%': '#00bbf3'
                            }}
                        />
                        <h6 className="prof-val6">
                            <Form.Control type="text" className="absfield d-flex" placeholder="0" onChange={(e) => setProfValue(e.target.value)} />
                            <span className="addgradval">/10</span>
                        </h6>
                        <h5 className="mt-2">Professors Rating</h5>
                    </div>
                    <div className="mx-2 position-relative rt-box">
                        <Circle
                            percent={diffValue}
                            strokeWidth="7"
                            strokeColor={{
                                '0%': '#114281',
                                '80%': '#00bbf3'
                            }}
                        />
                        <h6 className="prof-val6">
                            <Form.Control type="text" className="absfield" defaultValue={4} placeholder="0" onChange={(e) => setDiffValue(e.target.value)} />
                            <span className="addgradval">/10</span>
                        </h6>
                        <h5 className="mt-2">Difficulty</h5>
                    </div>
                    <div className="position-relative rt-box">
                        <Circle
                            percent={gradValue}
                            strokeWidth="7"
                            strokeColor={{
                                '0%': '#114281',
                                '80%': '#00bbf3'
                            }}
                        />
                        <h6 className="prof-val6">
                            <Form.Control type="text" className="absfield" value="--" placeholder="--" onChange={(e) => setGradeValue(e.target.value)} />
                            <span className="addgradval">/10</span>
                        </h6>
                        <h5 className="mt-2">Grade Optional</h5>
                    </div>
                </div>
                <Button type="submit" className="post my-4 d-block ms-auto">
                    Post
                </Button>
            </Form>
        </div>
    );
};
export default ProfessorRating;
