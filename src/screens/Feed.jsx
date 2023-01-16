import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Layouts/Header';
import '../css/main.css';
import FeedMain from '../components/feed/FeedMain';
import FeedSidebar from '../components/feed/Sidebar';
import MyDate from '../components/feed/Date';
import { useNavigate } from 'react-router-dom';
function Feed() {
    const [teztCheck, setTeztCheck] = React.useState(true);
    const navigate = useNavigate();
    let userName;
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            navigate('/signin');
        }
    }, []);
    userName = JSON.parse(window.localStorage.getItem('user'));
    return (
        <>
            <div className="Header Home" id="main-header">
                <Container>
                    <Header />
                </Container>
            </div>

            <div>
                <section id="map" className="position-relative" style={teztCheck ? { filter: 'opacity(0.16)', pointerEvents: 'none' } : null}>
                    <Container fluid className="p-0">
                        <div className="feed">
                            <div id="main">
                                <div className="feed-content text-white py-4">
                                    <h3>
                                        <strong>Hello {userName.username}</strong>
                                    </h3>
                                    <MyDate />
                                    <hr />
                                </div>
                                <FeedMain userName={userName.username} />
                            </div>
                            <FeedSidebar />
                        </div>
                    </Container>
                </section>
                {teztCheck ? (
                    <div className="checktztmain">
                        <div className="checktezt feed-page" style={{ fontWeight: '600' }}>
                            <p className="m-auto">This feature is not available yet.</p>
                        </div>
                    </div>
                ) : null}
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Feed;
