import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
const Folders = () => {
    const [searchitem, setSearchvalue] = useState('');
    const Users = [
        { name: 'Chemistry', Course: 'Studying CS at NYU' },
        { name: 'Ionic Compounds', Course: 'Studying CS at NYU' },
        { name: 'Chemistry', Course: 'Studying CS at NYU' },
        { name: 'Ionic Compounds', Course: 'Studing CS at MTB' },
        { name: 'Chemistry', Course: 'Studing CS at PBc' }
    ];
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
                        <div className="d-flex AllUser" key={index}>
                            <div className="me-3">
                                <img src="../assets/folder1.png" alt="folder1" style={{ maxWidth: '60px' }} />
                            </div>
                            <div>
                                <p className="mb-1 username">{val.name}</p>
                                <p>{val.Course} </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Folders;
