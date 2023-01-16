import React from 'react';
import { Form } from 'react-bootstrap';
import '../../css/main.css';
const TabContent = () => {
    return (
        <>
            <div className="my-4  text-white d-flex">
                <div className="me-3">
                    <img src="../assets/teztus-user.png" className="me-2 subprofile-user" />
                </div>
                <div style={{ width: '100%' }}>
                    <Form.Control type="text" placeholder="Make a post" />
                </div>
                <hr />
            </div>
            <div className="mb-2 mt-5 d-flex">
                <div className="me-3">
                    <img src="../assets/teztus-user.png" className="me-2 subprofile-user" />
                </div>
                <div className="text-white">
                    <p className="mb-0">
                        <strong>User X Wau</strong>
                    </p>
                    <p>feb 12- 2022</p>
                </div>
            </div>
            <Form.Control as="textarea" rows={15} />
        </>
    );
};

export default TabContent;
