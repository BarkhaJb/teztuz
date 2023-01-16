import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Col, Row, Container, Tab, Tabs, Modal } from 'react-bootstrap';
import CourseInfo from '../components/course/CourseInfo';
import CourseVideos from '../components/course/CourseVideos';
import ReactPlayer from 'react-player';
import Header from '../Layouts/Header';
import videojs from 'video.js';
import { useState } from 'react';
import { getLoggedUser } from '../helpers/utils';
import '@videojs/themes/dist/sea/index.css';
import 'videojs-seek-buttons';
import axios from 'axios';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.min.js';
import AllSubjectResources from '../components/AllSubjects/AllSubjectsResources';
import 'react-toastify/dist/ReactToastify.css';
const Course = (props) => {
    const navigate = useNavigate();
    const user = getLoggedUser();
    const [userId, setUserId] = useState('');
    const { courseId } = useParams();
    const [course, setCourse] = useState();
    const [start, setStart] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const Course_Title = query.get('title');
    // Check if there is a user already logged in

    const VideoJS = (props) => {
        const videoRef = React.useRef(null);
        const playerRef = React.useRef(null);
        const { options, onReady } = props;

        React.useEffect(() => {
            if (!playerRef.current) {
                const videoElement = videoRef.current;

                if (!videoElement) return;

                const player = (playerRef.current = videojs(videoElement, options, () => {
                    videojs.log('player is ready');
                    onReady && onReady(player);
                }));
            } else {
            }
        }, [options, videoRef]);
        React.useEffect(() => {
            const player = playerRef.current;

            return () => {
                if (player) {
                    player.dispose();
                    playerRef.current = null;
                }
            };
        }, [playerRef]);

        return (
            <div data-vjs-player>
                <video ref={videoRef} className="video-js vjs-big-play-centered vjs-theme-sea" data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }' />
            </div>
        );
    };

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
        const fetchUserId = async (email) => {
            try {
                const url = `${process.env.REACT_APP_BASE_URL}/api/users/email/` + email;
                const id = await axios.get(url);
                setUserId(id.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (user) {
            fetchUserId(user.email);
        }
        if (start) {
            // alert('Allowed');
            // Swal.fire('Congratulation You have UnLocket the Course!');
            // toast.success('Congratulation You have UnLocked the Course!', {
            //     position: 'top-right',
            //     theme: 'colored',
            //     autoClose: 2000,
            //     hideProgressBar: false
            // });
        }
    }, [user]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/courses/` + courseId);
                setCourse(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userId !== '') {
            fetchCourse();
        }
    }, [userId]);

    const [trailer, setTrailer] = React.useState(false);
    function WatchTrailer(props) {
        const playerRef = React.useRef(null);

        const videoJsOptions = {
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [
                {
                    src: '../assets/video.mp4',
                    type: 'video/mp4'
                }
            ],
            plugins: {
                hotkeys: {
                    volumeStep: 0.1,
                    seekStep: 5,
                    enableModifiersForNumbers: false
                },
                seekButtons: {
                    forward: 5,
                    back: 5
                }
            }
        };
        const handlePlayerReady = (player) => {
            playerRef.current = player;
            player.on('waiting', () => {
                videojs.log('player is waiting');
            });
            player.on('dispose', () => {
                videojs.log('player will dispose');
            });
        };

        return (
            <Modal {...props} fullscreen={true} aria-labelledby="contained-modal-title-vcenter" className="signlecoursetrailer" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>
            <div className="coursesmain">
                <div className="bgimage-div">
                    <Container>
                        <Row className="refers-cols border-0">
                            <Col xs={12} className="crhead">
                                <h1>
                                    <strong>{Course_Title ? Course_Title : 'SAT'}</strong>
                                </h1>
                                <h4 className="my-4 mt-0">VIDEOS</h4>
                                <p>Lorem ipsum, dolor sit amet consectetur. </p>
                                <div className="trailer">
                                    {/* <Link to="/courses"> */}
                                    <Button onClick={() => setTrailer(true)}>TRAILER</Button>
                                    {/* </Link> */}

                                    <Button onClick={() => (localStorage.getItem('paid') == 'true' ? navigate('/payment') : setStart(true))}>START</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div className="gredient-line my-5" style={{ height: '2px' }}></div>
                </div>
                <div className="sub-tabs-block allsubjects" style={!start ? { filter: 'opacity(0.1)', pointerEvents: 'none' } : null}>
                    <Container style={{ position: 'relative' }}>
                        <Row className="m-0" style={{ maxWidth: '100%' }}>
                            <Col xs={12} md={12} className="subject md-py-5 px-0">
                                <Tabs defaultActiveKey="Info" id="uncontrolled-tab-example" className="mb-3 videoss">
                                    <Tab eventKey="Info" title="INFO">
                                        <CourseInfo paidCourse={start} courseId={courseId} course={course} userId={userId} />
                                    </Tab>
                                    <Tab eventKey="video" title="VIDEOS">
                                        <CourseVideos Course_Title={Course_Title} />
                                    </Tab>
                                    <Tab eventKey="Resource" title="RESOURCES">
                                        <div className="section ALL-SUB" id="science-resource">
                                            <AllSubjectResources />
                                        </div>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <WatchTrailer show={trailer} onHide={() => setTrailer(false)} />

                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Course;
