import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import '../../css/main.css';
import { Link } from 'react-router-dom';
import videojs from 'video.js';
import 'videojs-seek-buttons';
import 'video.js/dist/video-js.css';
import 'videojs-hotkeys';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.min.js';
import '@videojs/themes/dist/sea/index.css';

const Subjectscards = (props) => {
    const bgimage = props.bgimages;
    const [trailer, setTrailer] = React.useState(false);

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
                <video ref={videoRef} id="card-video" className="video-js vjs-big-play-centered vjs-theme-sea" data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }' />
            </div>
        );
    };

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
            <Modal {...props} size="lg" fullscreen={true} aria-labelledby="contained-modal-title-vcenter" className="card-course" centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <>
            <div className="container-image">
                <div>
                    <img src={bgimage} alt="Avatar" className="image" />
                </div>
                <div className="dsply-text">
                    <h1>
                        <strong>{props.title}</strong>
                        <p className="whitelinedsc"></p>
                    </h1>
                    <p className="course-descr">{props.description}</p>
                    {JSON.parse(localStorage.getItem('user')).userId ? (
                        <>
                            <img
                                className="edit-course"
                                onClick={() => {
                                    props.setpostCourseModal(true);
                                    props.setPostId(props.id);
                                }}
                                src="../images/edit-2.svg"
                                alt="del course"
                            />
                            <img className="trashh-course" onClick={() => props.deleteCourse(props.id)} src="../assets/trash.svg" alt="del course" />
                        </>
                    ) : null}
                </div>
                <div className="overlay">
                    <div className="text trailer-btn">
                        <Button className="trailer-btnn" onClick={() => setTrailer(true)}>
                            {props.watch}
                        </Button>

                        <Link
                            to={`/course/${props.id}?title=${props.title}`}
                            onClick={() => {
                                localStorage.setItem('paid', props.coursePrice == 'Paid' ? true : false);
                            }}
                        >
                            <Button className="cours-view">{props.View}</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <WatchTrailer show={trailer} onHide={() => setTrailer(false)} />
        </>
    );
};

export default Subjectscards;
