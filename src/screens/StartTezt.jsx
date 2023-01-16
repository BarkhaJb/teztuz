import React, { useContext, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Flash from '../components/Study/Flash';
import Streak from '../components/Study/Streak';
import General from '../components/Study/General';
import { getLoggedUser } from '../helpers/utils';
import axios from 'axios';

const StartTezt = () => {
    const navigate = useNavigate();
    const [toggle, setToggle] = React.useState(false);
    const [teztStarted, setTeztStarted] = React.useState(false);
    let location = useLocation();
    const user = getLoggedUser();
    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            const query = new URLSearchParams(location.search);
            const uuid = query.get('uid');
            localStorage.setItem('TeztUrl', `${location.pathname}?uid=${uuid}`);
            // navigate('/signin');
        }
    }, []);

    const ifTeztSatrted = async () => {
        const query = new URLSearchParams(location.search);

        const uuid = query.get('uid');
        if (uuid) {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/teztInvitation/${uuid}`);
            if (res.data.hasSenderStarted) {
                setTeztStarted(true);
            } else {
                waitingForTezt(res.data.sender);
            }

            location.state = { ...res.data.teztData, sender: res.data.sender, hasSenderStarted: res.data.hasSenderStarted };
            setToggle(!toggle);
        } else setTeztStarted(true);
    };
    const waitingForTezt = (receiver) => {
        const payload = {
            sender: user.username,
            receivers: [receiver]
        };
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/studySets/waitingTezt/`, payload);
    };

    useEffect(async () => {
        ifTeztSatrted();
    }, [localStorage.state]);

    useEffect(() => {
        if (location.state?.hasSenderStarted == false || location.state?.hasSenderStarted == undefined) {
            ifTeztSatrted();
        }
    }, []);

    return (
        <>
            <div className="">
                <div className="Header" id="SignuP">
                    <Container>
                        <Header />
                    </Container>
                </div>
            </div>
            <div className="questionsection " style={{ minHeight: '100vh' }}>
                <Container className="pt-5">
                    <p className="backbtn" onClick={() => navigate(-1)}>
                        <Button type="submit" className="exit">
                            Exit
                        </Button>
                    </p>
                    <div>
                        {location?.state?.mode === 'Flash' && <Flash />}
                        {location?.state?.mode === 'Streak' && <Streak />}
                        {(location?.state?.mode === 'General' || location?.state?.mode === 'Improve') && <General />}

                        {/* {(location?.state?.mode === 'Flash' || location?.state?.mode === 'Improve') && <Flash />}
                        {(location?.state?.mode === 'Streak' || location?.state?.mode === 'Improve') && <Streak />}
                        {(location?.state?.mode === 'General' || location?.state?.mode === 'Improve') && <General />} */}
                    </div>
                </Container>
            </div>
            <div className="bg-dark">
                <Footer />
            </div>
        </>
    );
};

export default StartTezt;
