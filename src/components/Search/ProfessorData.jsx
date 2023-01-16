import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
import { Line, Circle } from 'rc-progress';

const SearchProfessorData = () => {
    const [searchitem, setSearchvalue] = useState('');
    const Users = [
        { name: 'User X', Course: 'Studying CS at NYU', score: '40' },
        { name: 'Wali', Course: 'Studying CS at NYU', score: '30' },
        { name: 'Jackson', Course: 'Studying CS at NYU', score: '90' },
        { name: 'User X', Course: 'Studing CS at MTB', score: '20' },
        { name: 'Jackson', Course: 'Studing CS at PBc', score: '80' }
    ];

    let score = 80;
    return (
        <>
            <div className="searcuser">
                <Form>
                    <Form.Group className="search-friend grp1" controlId="firendsearch">
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                                <img src="../assets/search-w.svg" />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search" onChange={(e) => setSearchvalue(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="search-friend optional grp2" controlId="firendsearch">
                        <InputGroup hasValidation>
                            <Form.Control type="text" placeholder="School (Optional)" onChange={(e) => setSearchvalue(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                </Form>

                {Users.filter((val) => {
                    if (searchitem === '') {
                        return val;
                    } else if (val.name.toLowerCase().includes(searchitem.toLowerCase())) {
                        return val;
                    } else if (val.Course.toLowerCase().includes(searchitem.toLowerCase())) {
                        return val;
                    }
                }).map((val, index) => {
                    return (
                        <div className="d-flex AllUser " key={index}>
                            <div className="me-3 py-2 professors">
                                <div>
                                    <img src="../assets/user.png" alt="" className="middle me-4" />
                                    <p className="d-inline-block">
                                        <b>{val.Course} </b>
                                    </p>
                                </div>
                                <div className="prof-progress">
                                    <Circle
                                        percent={val.score}
                                        strokeWidth="4"
                                        strokeColor={{
                                            '0%': '#114281',
                                            '80%': '#00bbf3'
                                        }}
                                    />
                                    <h5 className="prof-val">{val.score}</h5>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
export default SearchProfessorData;
