import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import '../../css/main.css';
import axios from 'axios';
import { ApiUrl } from '../../config';

const SearchCoursesData = () => {
    const [searchitem, setSearchvalue] = useState('');
    const [studySets, setStudySets] = useState([]);

    useEffect(() => {
        console.log(searchitem);
        const fetchStudySets = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/studySets/searchBar`, { params: { keyword: searchitem } });
            console.log(res.data);
            setStudySets(res.data);
        };
        if (searchitem.length > 1) {
            fetchStudySets();
        }
    }, [searchitem]);

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

                {studySets.map((val, index) => {
                    return (
                        <div className="d-flex AllUser" key={index}>
                            <div className="me-3">
                                <img src="../assets/22.png" className="rounded-circle" alt="target" />
                            </div>
                            <div>
                                <p className="mb-1 username">{val.title}</p>
                                <p>{val.creatorName} </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default SearchCoursesData;
