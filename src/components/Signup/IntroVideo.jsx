import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/main.css';
const IntroVideo = (props) => {
    useEffect(() => {
        // modalShow(true);
    });

    const ConfirmmBox = () => {
        Swal.fire({
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonText: 'Watch Later',

            cancelButtonText: 'Skip',
            showCancelButton: true,
            showCloseButton: true
        });
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            {/* <Modal.Header onClick={(ConfirmmBox(), props.onHide)}></Modal.Header> */}
            <Modal.Header className="justify-content-end">
                <Link to="/subjects">
                    <img src="../assets/x-circlew.svg" alt="x-circlew.svg" className="video-close" />
                </Link>
            </Modal.Header>
            <Modal.Body>
                <iframe width="100%" height="500" allowfullscreen="allowfullscreen" src="https://www.youtube.com/embed/LTXD6XZXc3U"></iframe>
            </Modal.Body>
        </Modal>
    );
};

export default IntroVideo;
