import React, { useState } from 'react';
import { Container, Button, Col, Row, Table, Modal } from 'react-bootstrap';
import '../../css/main.css';

const ProfileDocument = () => {
    const [modalShow, setModalShow] = useState(false);
    const [tezt, setTezt] = useState([
        {
            icons: "",
            name: "",
        }, {
            icons: "",
            name: "",
        }, {
            icons: "",
            name: "",
        }, {
            icons: "",
            name: "",
        }
    ])

    const AddElement = () => {
        setTezt([...tezt, { icons: "", name: "" }])
    }
    return (
        <>
            <div className="Document mt-4">
                <Container>
                    <div className="d-flex justify-content-between">
                        <h5 className="text-white">Documents</h5>
                        <p>
                            <Button className="viemore global-btn">View More</Button>
                        </p>
                    </div>
                    <div>
                        <Row>
                            {/* Blur odd elements with css  */}
                            <Col xs={6} md={3} className="my-3 docment resr p-4">
                                <div onClick={() => setModalShow(true)}>
                                    <div className="resource-gradid">
                                        <img src="../assets/new/Add Document.png" />
                                    </div>
                                    <Button className="mt-2">UPLOAD DOCUMENT</Button>
                                </div>
                            </Col>
                        </Row>
                        <hr className="hr" />
                    </div>
                </Container>
            </div>
        </>
    );
};
export default ProfileDocument;