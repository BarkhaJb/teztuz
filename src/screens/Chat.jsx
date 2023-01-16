import React from 'react';
import ChatBox from '../components/chat/chatbox';
import '../css/main.css';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';

const Chat = () => {
    return (
        <>
            <div className="Header connects-header" id="courses-main">
                <div className="container">
                    {' '}
                    <Header />
                </div>
            </div>
            <div className="pt-5">
                <ChatBox />
            </div>
        </>
    );
};

export default Chat;
