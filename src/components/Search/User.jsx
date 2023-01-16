import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Container, InputGroup, Tabs, Tab } from 'react-bootstrap';
import '../../css/main.css';
import { Link } from 'react-router-dom';
import Folders from './Folders';
import Tezts from './CourseData';
import SearchProfessorData from './ProfessorData';
import Posts from './Posts';
import Footer from '../../Layouts/Footer';
import axiox from 'axios';
import { ApiUrl } from '../../config';

const User = () => {
    const SearchHeader = () => {
        const [key, setKey] = useState('Users');
        return (
            <>
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 search-tabs">
                    <Tab eventKey="Users" title="Users">
                        <div className="usersearches">
                            <SearchUserData />
                        </div>
                    </Tab>
                    <Tab eventKey="Folders" title="Resources">
                        <div>
                            <Folders />
                        </div>
                    </Tab>
                    <Tab eventKey="Tezts" title="Tezts">
                        <div>
                            <Tezts />
                        </div>
                    </Tab>
                    <Tab eventKey="Professors" title="Professors">
                        <div>
                            <SearchProfessorData />
                        </div>
                    </Tab>

                    <Tab eventKey="Posts" title="Questions">
                        <div>
                            <Posts />
                        </div>
                    </Tab>
                </Tabs>
            </>
        );
    };
    const SearchUserData = () => {
        const [searchitem, setSearchvalue] = useState('');
        const [users, setUsers] = useState([]);

        useEffect(() => {
            const fetchStudySets = async () => {
                const res = await axiox.get(`${process.env.REACT_APP_BASE_URL}/api/users/searchBar`, { params: { keyword: searchitem } });
                setUsers(res.data);
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

                    {users.map((val, index) => {
                        return (
                            <div className="d-flex AllUser" key={index}>
                                <div className="me-3">
                                    <Link to={`/profile/${val._id}`}>
                                        <img src="../assets/user.png" alt="" />
                                    </Link>
                                </div>
                                <div>
                                    <p className="mb-1 username">{`${val.firstName} ${val.lastName}`}</p>
                                    <p>Studying at {val.school} </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <div className="Search">
            <h1 className="src-h1 search-mobile text-white">
                <div className="container searchh">
                    <span className="tex-white pe-2 search-back">
                        <Link to={'/feed'}>
                            <img src="../assets/leftt.svg" alt="close" width="35px" />
                        </Link>
                    </span>
                    <b>Search</b>
                </div>
            </h1>
            <Container className="pb-5">
                <Row>
                    <Col xs={12}>
                        <div className="pb-4">
                            <div className="text-white">
                                <SearchHeader />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default User;
