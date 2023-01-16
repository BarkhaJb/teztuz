import React from 'react';
import { Button, Row, Col, Container, Modal } from 'react-bootstrap';
import '../../css/main.css';
import MyDate from '../feed/Date';

import TeztFolder from './TeztFolder';
const CreateStudy = ({ setPendingFolders, pendingFolders, studySetId, btntextt, submitData, coursename, username, userId, pendingIndexes, setPendingIndexes }) => {
    const [modalShow, setModalShow] = React.useState(false);

    const InviteModel = (props) => {
        return (
            <>
                <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" className="invitemyfriend teztfolder" centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <TeztFolder
                            modalShow={modalShow}
                            pendingFolders={pendingFolders}
                            setPendingFolders={setPendingFolders}
                            userId={userId}
                            studySetId={studySetId}
                            closeFolder={setModalShow}
                            setPendingIndexes={setPendingIndexes}
                            pendingIndexes={pendingIndexes}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide} className="cancel">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    return (
        <div className="py-5 bg-black">
            <Container>
                <Row>
                    <Col xs={12} md={6} className="bottom-create">
                        <h1 className="mb-1">{coursename}</h1>

                        <MyDate />

                        <p>{username}</p>
                    </Col>
                    <Col xs={12} md={6} className="text-end createbtn">
                        <div className="gradient-border me-3">
                            <Button onClick={submitData}>{btntextt}</Button>
                        </div>
                        {/* <p className="mt-2 text-white pointer assign-tofolder" onClick={() => setModalShow(true)}>
                            Assign to Folder +
                        </p> */}
                    </Col>
                </Row>

                <InviteModel show={modalShow} onHide={() => setModalShow(false)} />
            </Container>
        </div>
    );
};

export default CreateStudy;
