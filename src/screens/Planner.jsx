import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Deadline from '../components/subjects/Deadlines';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Callender from '../components/Planner/Main/Calender';
import Semester from '../components/Planner/Main/Semester';
import GpaBlock from '../components/Planner/Main/GPABlock';

const Planner = () => {
    const Deadlines = () => {
        return (
            <>
                <div>
                    <Deadline />
                </div>
            </>
        );
    };

    return (
        <>
            <div>
                <div className="Header Home" id="main-header">
                    <Container>
                        <Header />
                    </Container>
                </div>
            </div>
            <Deadline />
            <Callender />
            <div className="position-relative">
                <GpaBlock />
                <Semester />
            </div>
            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default Planner;