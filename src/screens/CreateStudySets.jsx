import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import StudyForm from '../components/Signup/StudyForm';
import StudyQuestion from '../components/Signup/StudyQuestion';
import { ToastContainer, toast } from 'react-toastify';
import '../css/main.css';
import Header from '../Layouts/Header';
import { useNavigate, useParams } from 'react-router-dom';
import CreateStudySet from '../components/Study/CreateStudySet';
import { getLoggedUser } from '../helpers/utils';
import axios from 'axios';
import { ObjectID } from 'bson';
const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CreateStudySets = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const user = getLoggedUser();
    const [userId, setUserId] = useState('');
    const [studySetId, setStudySetId] = useState('');
    const [toggle, setToggle] = useState(false);
    const [userName, setUserName] = useState('');
    const [pendingFolders, setPendingFolders] = useState([]);
    const [pendingIndexes, setPendingIndexes] = useState([]);
    const [parsedData, setParsedData] = useState();

    // Check if there is a user already logged in
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
        fetchUserId(user.email);
        const newObjectId = new ObjectID();
        setStudySetId(newObjectId.toString());
    }, [toggle]);
    let userfName = localStorage.getItem('user');
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/user/` + userId);
                setUserName(`${res.data.firstName} ${res.data.lastName}`);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId !== '') {
            fetchUserName();
        }
    }, [userId, toggle]);

    const fetchUserId = async (email) => {
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
            const id = await axios.get(url);
            setUserId(id.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addToFolders = () => {
        try {
            for (var i = 0; i < pendingFolders.length; i++) {
                assignToFolder(studySetId, pendingFolders[i]._id);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const assignToFolder = async (teztId, folderId) => {
        try {
            const data = {
                teztId: teztId,
                folderId: folderId
            };
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/folders/${folderId}/addTezt`, data);
        } catch (err) {
            console.log(err);
        }
    };
    let { id } = useParams();
    useEffect(async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/questions/studySets/${id}`);
            setData(res.data);
            setParsedData(res.data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    const editTezt = async () => {
        const upDatedStudySet = {
            title: data.title,
            userId: userId,
            SchoolName: data.SchoolName,
            description: data.description,
            CourseName: data.CourseName,
            editable: data.editable,
            visibility: data.visibility
        };

        await axios.put(`${process.env.REACT_APP_BASE_URL}/api/studySets/${id}`, upDatedStudySet);

        await axios.put(`${process.env.REACT_APP_BASE_URL}/api/questions/studySets/${id}`, {
            questions: data?.questions === null || data?.questions === undefined || data?.questions === {} ? parsedData : data.questions?.map((q) => ({ ...q, files: '', studySetId: id }))
        });

        toast.success('Study Set Updated!', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 2000,
            hideProgressBar: false
        });
        navigate('/');
    };
    const createTezt = async () => {
        const newStudySet = {
            _id: studySetId,
            userId: userId,
            title: data.title,
            creatorName: userName || JSON.parse(userfName).username,
            SchoolName: data.SchoolName || '',
            description: data.description || '',
            CourseName: data.CourseName || '',
            editable: data.editable || '',
            visibility: data.visibility || ''
        };
        if (typeof newStudySet.title == 'undefined') {
            toast.error('Fill Form to Create Study Set!', {
                position: 'top-right',
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false
            });
        } else {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/studySets`, newStudySet);
            // Add teztUs points
            await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/user/addTeztUsPoints`, { userId: userId, pointsToAdd: 10 });
            addToFolders();

            data.questions.forEach(async (question) => {
                const formData = new FormData();
                formData.append('studySetId', studySetId);
                formData.append('question', question.question);
                formData.append('answer', question.answer);
                question.files.forEach((file, i) => {
                    formData.append(`file${i}`, file);
                });
                console.log(formData, 'sssformData');
                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/questions`, formData);
            });
            const newRecord = {
                studySetId: studySetId,
                userId: userId
            };
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/userStudySetRecord`, newRecord);

            toast.success('Study Set created!', {
                position: 'top-right',
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false
            });
            navigate('/');
        }
    };

    const submitData = async () => {
        // Create new study set and upload

        if (id) {
            editTezt();
        } else if (data == 'undefined' || data.length === 0) {
            console.log(data, 'data');
            toast.error('Fill Form & Add Questions to Create Study Set!', {
                position: 'top-right',
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false
            });
            setToggle(!toggle);
        } else if (Object.keys(data).length === 0 || typeof data.questions === 'undefined') {
            console.log(data, 'data');
            toast.error('Add Questions to Create Study Set!', {
                position: 'top-right',
                theme: 'colored',
                autoClose: 2000,
                hideProgressBar: false
            });
        } else createTezt();
    };
    return (
        <>
            <div>
                <div className="Header" id="SignuP">
                    <Header />
                </div>
                <div className="study-content">
                    <Container>
                        <div className="studydivform">
                            <div className="study-block">
                                <p className="backbtn" onClick={() => navigate(-1)}>
                                    <img src="../assets/leftt.svg" alt="go back" />
                                </p>
                                <h1 className="text-white text-center my-4">Create a New Study Set</h1>
                                <StudyForm data={data} setData={setData} />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="questionsection">
                <Container>
                    <StudyQuestion data={data} setData={setData} />
                </Container>
            </div>

            <CreateStudySet
                pendingFolders={pendingFolders}
                setPendingFolders={setPendingFolders}
                studySetId={studySetId}
                coursename={data.title ? data.title : 'Title'}
                username={user ? user.username : 'Username'}
                userId={userId ? userId : 'Null'}
                btntextt={id ? 'Update' : 'Create'}
                title="title"
                submitData={submitData}
                pendingIndexes={pendingIndexes}
                setPendingIndexes={setPendingIndexes}
            />

            {/* <div className="bg-dark">
                <Footer />
            </div> */}
        </>
    );
};

export default CreateStudySets;
