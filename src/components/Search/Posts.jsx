import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
const Posts = () => {
    const [searchitem, setSearchvalue] = useState('');
    const Users = [
        { name: 'kkk', Course: 'Studying CS at NYU' },
        { name: 'ppp', Course: 'Studying CS at NYU' },
        { name: 'trt', Course: 'Studying CS at NYU' },
        { name: 'kghd', Course: 'Studing CS at MTB' },
        { name: 'kjgf', Course: 'Studing CS at PBc' }
    ];

    return (
        <>
            <div className="searcuser my-5">
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
                                <img src="../assets/user.png" alt="" />
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

export default Posts;
