import React, { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Table, Modal, Form } from 'react-bootstrap';
import '../../css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../helpers/utils';
import axios from 'axios';
import { ApiUrl } from '../../config';

const Folders = () => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    const [userId, setUserId] = useState();
    const [folders, setFolders] = useState();
    const [folderRemoved, setFolderRemove] = useState();
    const [indexFolder, setIndexFolder] = useState();

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
        const fetchUserId = async (email) => {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/${email}`;
                const id = await axios.get(url);
                setUserId(id.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserId(user.email);
    }, [user.email, navigate]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/folders/user/` + userId);
                setFolders(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (userId) {
            fetchFolders();
        }
    }, [userId]);

    const changeTitle = async (id, title) => {
        try {
            axios.put(`${process.env.REACT_APP_BASE_URL}/api/folders/" + id`, { title: title });
        } catch (err) {
            console.log(err);
        }
    };

    const AddElement = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/folders`, { userId: userId, title: '' });
            console.log('Folder created');
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/folders/user/` + userId);
            setFolders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const FilterModal = (index) => {
        setFolderRemove(true);
        setIndexFolder(index);
    };

    const FolderRemove = (props) => {
        const deleteFolder = async () => {
            console.log(indexFolder);
            try {
                await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/folders/` + indexFolder);
                setFolderRemove(false);
            } catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/folders/user/` + userId);
                setFolders(res.data);
            } catch (err) {
                console.log(err);
            }

            window.location.reload();
        };
        return (
            <Modal {...props} size="" backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" className="passwordmodels" centered>
                <Modal.Body>
                    <div className="text-center confirm-model">
                        <p>Are You sure you want to delete folder?</p>
                        <Button className="cancel" onClick={props.onHide}>
                            Cancel
                        </Button>
                        <Button className="delete" onClick={() => deleteFolder()}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    };
    return (
        <>
            <div className="resourses">
                <div>
                    <Row>
                        {/* Blur odd elements with css  */}
                        <Col xs={6} md={3} className="my-3 docment resr p-4">
                            <div onClick={AddElement}>
                                <div className="resource-gradi">
                                    <img src="../assets/new/Add Folder.png" alt="dd" />
                                </div>
                                <Button>CREATE FOLDER</Button>
                            </div>
                        </Col>

                        {folders &&
                            folders.map((val, index) => {
                                return (
                                    <Col xs={6} md={3} className="my-3 docment p-4 resr" key={val.id}>
                                        <div>
                                            <div className="resource-gradi">
                                                <p className="">
                                                    <Link to={`/folders/${val._id}`}>
                                                        <img src="../assets/new/Folders.png" alt="Folder" onClick={() => console.log('Go to folder page')} />
                                                    </Link>
                                                </p>
                                            </div>
                                            <Form.Control
                                                type="text"
                                                name="add"
                                                defaultValue={val.title}
                                                className="resfield"
                                                placeholder="Add Title"
                                                onChange={(e) => changeTitle(val._id, e.target.value)}
                                            />
                                            <img src="../assets/trash.svg" alt="trash" className="trashff" onClick={() => FilterModal(val._id)} />
                                        </div>
                                    </Col>
                                );
                            })}
                    </Row>
                </div>
                <FolderRemove show={folderRemoved} onHide={() => setFolderRemove(false)} />
            </div>
        </>
    );
};

export default Folders;
