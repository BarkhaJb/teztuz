import React from 'react';
import { Container } from 'react-bootstrap';
import FoldersMain from '../components/subjects/FolderMain';
import Header from '../Layouts/Header';
const Folders = () => {
    return (
        <>
            <div>
                <div className="Header Home" id="main-header">
                    <Container>
                        <Header />
                    </Container>
                </div>

                <FoldersMain />
            </div>
        </>
    );
};

export default Folders;
