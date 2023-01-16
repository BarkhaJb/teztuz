import { Col, Container, Row, Button, Modal, ProgressBar, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import FileBase64 from 'react-file-base64';
import '../../css/main.css';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-hotkeys';
import 'videojs-markers';
import 'videojs-seek-buttons';
import 'videojs-offset';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoggedUser } from '../../helpers/utils';
import 'videojs-markers/dist/videojs.markers.css';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.min.js';

import '@videojs/themes/dist/sea/index.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
const CourseVideos = () => {
    const [postCourseModal, setpostCourseModal] = useState(false);
    const [courseVideos, setCourseVideos] = useState([]);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [userId, setUserId] = useState('');
    const user = getLoggedUser();
    const navigate = useNavigate();
    const location = useLocation();
    let player;
    let pausedAt;

    const fetchUserId = async (email) => {
        try {
            const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
            const id = await axios.get(url);
            setUserId(id.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
        fetchUserId(user.email);
    }, []);
    var intervall;

    // ------------------------- Episodes-----------

    const handleStart = () => {
        var player = playerRef.current;
        intervall = setInterval(() => {
            if (player) {
                let payload = {
                    courseId: courseId,
                    topicId: topicId,
                    videoPath: videoPath._id,
                    totalEpisodeDuartion: player.duration(),
                    viewprogress: player.currentTime()
                };
                axios.put(`${process.env.REACT_APP_BASE_URL}/api/courses/${courseId}/${topicId}/${videoPath._id}/duration`, payload);
            }

            // clearInterval(intervall);
        }, 3000);
    };
    const handleReset = () => {
        clearInterval(intervall); // increment is undefined
    };
    useEffect(() => {
        handleStart();
    }, []);

    const [toggle, setToggle] = useState(false);
    const { courseId } = useParams();
    const getCourses = async () => {
        let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/courses/${courseId}`);
        try {
            setCourseVideos(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const [videoEpisode, setVideoEpisode] = useState();
    const [videoPath, setVideotoPath] = useState({});
    const [videoPlaying, setvideoPlaying] = useState(false);
    useEffect(() => {
        getCourses();
    }, [toggle, videoPlaying]);
    const deleteCourse = (topicId) => {
        let res = axios.put(`${process.env.REACT_APP_BASE_URL}/api/courses/${courseId}/videos/${topicId}`);
        setCourseVideos(res.data);
        setToggle(!toggle);
    };

    const [edit, setEdit] = useState(false);
    const [videos, setVideos] = useState([{ title: '', media: {} }]);
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [topicThumbnail, setTopicThumbnail] = useState();
    const [topicId, setTopicId] = useState();

    const [topicDescription, setTopicDescription] = useState();

    const [videoDuration, setVideoDuration] = useState();
    const [mainTopic, setMainTopic] = useState();
    //    ########## here videosj

    const OpenModalPlayingVideo = (episode, topic) => {
        setVideotoPath(episode);
        setTopicId(topic._id);
        setTopicDescription(topic.description);
        setVideoEpisode(topic.episodes);
        setMainTopic(topic);
        var player = playerRef.current;
        setvideoPlaying(true);
        setVideoDuration(episode.viewprogress);
        if (player) player.currentTime(episode.viewprogress);
    };

    const topicsEditing = (topic) => {
        setEdit(true);
        setVideos(topic.episodes);
        setTopic(topic.title);
        setDescription(topic.description);
        setTopicThumbnail(topic.thumbnail);
        setTopicId(topic._id);
        setpostCourseModal(true);
    };
    return (
        <>
            <div className="videomain">
                <Container fluid>
                    <div className="text-end mb-3">
                        {JSON.parse(localStorage.getItem('user')).userId && (
                            <Button
                                onClick={() => {
                                    setpostCourseModal(true);
                                    setEdit(false);
                                    setVideos([{ title: '', media: {} }]);
                                    setTopic('');
                                    setTopicThumbnail();
                                }}
                                className="upload-topics-btn"
                            >
                                Upload Topic
                            </Button>
                        )}
                    </div>
                    <Row className="m-0 videos-playlist w-100" style={{ maxWidth: '100%' }}>
                        {courseVideos?.topics?.map((topic, index) => {
                            return (
                                <Col xs={12} sm={6} md={6} lg={4} xl={3} key={index} className="position-relative">
                                    {JSON.parse(localStorage.getItem('user')).userId ? (
                                        <>
                                            <img
                                                className="edit-course"
                                                src="../images/edit-2.svg"
                                                alt="del course"
                                                onClick={() => {
                                                    topicsEditing(topic);
                                                }}
                                            />
                                            <img className="trashh-course" onClick={() => deleteCourse(topic._id)} src="../assets/trash.svg" alt="del course" />
                                        </>
                                    ) : null}
                                    <div className="list-maincard">
                                        <img src={topic.thumbnail} className="" width="100%" />

                                        <p className="courname">1: {topic.title}</p>
                                        <div className="ep-list">
                                            {topic?.episodes?.map((episode, i) => {
                                                return (
                                                    <div className="playlist" key={i}>
                                                        <p className="ps-2 mb-1" onClick={() => OpenModalPlayingVideo(episode, topic)} style={{ cursor: 'pointer' }}>
                                                            {episode.title}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
                <UploadVideosModal
                    show={postCourseModal}
                    onHide={() => setpostCourseModal(false)}
                    setpostCourseModal={setpostCourseModal}
                    topic={topic}
                    setTopic={setTopic}
                    description={description}
                    setDescription={setDescription}
                    topicThumbnail={topicThumbnail}
                    setTopicThumbnail={setTopicThumbnail}
                    edit={edit}
                    setEdit={setEdit}
                    videos={videos}
                    setVideos={setVideos}
                    courseId={courseId}
                    topicId={topicId}
                    setToggle={setToggle}
                    toggle={toggle}
                />

                <VideoPlayer show={videoPlaying} onHide={() => setvideoPlaying(false)} topic={mainTopic} episode={videoPath} />
            </div>
        </>
    );
};

const UploadVideosModal = (props) => {
    const handleSubmit = async (e, i) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('topicTitle', props.topic);
        formData.append('topicThumbnail', props.topicThumbnail);
        formData.append('topicDescription', props.description);
        props.videos.forEach((video) => {
            formData.append('topicEpisodes', video.media);
        });
        try {
            if (props.edit) {
                await axios.put(`${process.env.REACT_APP_BASE_URL}/api/courses/${props.courseId}/topics/${props.topicId}`, formData);
            } else await axios.put(`${process.env.REACT_APP_BASE_URL}/api/courses/${props.courseId}/videos`, formData);
            props.setToggle(!props.toggle);
            props.setpostCourseModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const addField = () => {
        props.setVideos((pre) => [...pre, { title: '', media: {} }]);
    };
    const deleteEpisode = (videoId) => {
        props.setVideos((pre) => pre.filter((_, index) => videoId !== index));
    };

    return (
        <Modal {...props} size="" aria-labelledby="contained-modal-title-vcenter" className="course-Modal" centered>
            <Modal.Header closeButton onClick={() => props.setVideos([{ title: '', media: {} }])}>
                {!props.edit ? 'Add Topic' : 'Edit Topic'}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="course-form">
                    <Row>
                        <Form.Group as={Col} md="12" controlId="titile" className="position-relative">
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Course Topic"
                                value={props.topic}
                                onChange={(e) => {
                                    props.setTopic(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="12" controlId="titile" className="position-relative mt-2">
                            <Form.Control
                                maxLength="250"
                                as="textarea"
                                rows={3}
                                type="text"
                                name="description"
                                placeholder="Course Description"
                                value={props.description}
                                onChange={(e) => {
                                    props.setDescription(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group id="formFileLg" className="my-3">
                            <FileBase64
                                type="file"
                                value={props.topicThumbnail}
                                name="thumbnail"
                                multiple={false}
                                accept="image/png, image/jpeg,image/jpg,image/svg,image/webp"
                                onDone={({ base64 }) => props.setTopicThumbnail(base64)}
                            />
                        </Form.Group>

                        {props.videos?.map((video, i) => {
                            return (
                                <div key={i}>
                                    <hr />
                                    {/* {props.edit && (
                                        <p className="text-end">
                                            <img src="../assets/trashblack.svg" onClick={() => deleteEpisode(i)} alt="" />
                                        </p>
                                    )} */}
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder={`Episode title ${i + 1}`}
                                            name="videoTitle"
                                            defaultValue={video.title}
                                            onChange={(e) => {
                                                video.title = e.target.value;
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId={`file${i}`}>
                                        <Form.Label htmlFor={`file${i}`} className="customfi">
                                            Upload Videos
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            name="media"
                                            required={props.edit}
                                            accept="video/*"
                                            onChange={(e) => {
                                                video.media = new File([e.target.files[0]], video.title);
                                            }}
                                        />
                                        {props.edit ? <span className="red">This field is required</span> : null}
                                    </Form.Group>
                                </div>
                            );
                        })}
                    </Row>
                    <img src="../assets/plus-add.svg" style={{ maxWidth: '60px' }} className="mb-2" onClick={addField} />
                    <Button type="submit">{!props.edit ? 'Add Topic' : 'Edit Topic'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CourseVideos;
