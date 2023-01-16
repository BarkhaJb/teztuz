import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Courses from '../components/Home/Courses';
import Create from '../components/Home/Create';
import Main from '../components/Home/Main';
import Map from '../components/Home/Map';
import Plan from '../components/Home/Plan';
import '../css/main.css';
import Header from '../Layouts/Header';
import ReactFullpage from '@fullpage/react-fullpage';
import Footer from '../Layouts/Footer';

const Home = () => {

    const navigate = useNavigate();

    // Check if there is a user already logged in
    useEffect(() => {
        if (localStorage.getItem('jwt')){
            navigate("/subjects");
        }
    }, [])

    return (
        <>
            <div>
                <div className="Header Home" id="main-header">
                    <Container>
                        <Header />
                    </Container>
                </div>
                {/* <ReactFullpage
                    licenseKey={'YOUR_KEY_HERE'}
                    scrollingSpeed={1000}
                    render={({ state, fullpageApi }) => {
                        return (
                            <ReactFullpage.Wrapper>
                                <div className="section">
                                    <Main />
                                </div>
                                <div className="section">
                                    <Courses />
                                </div>
                                <div className="section">
                                    <Create />
                                </div>
                                <div className="section">
                                    <Map />
                                </div>
                                <div className="section">
                                    <Plan />
                                </div>
                                <div className="footer-home">
                                    <Footer />
                                </div>
                            </ReactFullpage.Wrapper>
                        );
                    }}
                /> */}
                <div className="section">
                    <Main />
                </div>
                <div className="section">
                    <Courses />
                </div>
                <div className="section">
                    <Create />
                </div>
                <div className="section">
                    <Map />
                </div>
                <div className="section position-relative">
                    <Plan />
                    <div className="footer-home">
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
