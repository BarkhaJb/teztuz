import React from 'react';
import User from '../components/Search/User';
import '../css/main.css';
import Header from '../Layouts/Header';

const Search = () => {
    return (
        <>
            <div className="Header connects-header" id="courses-main">
                <div className="container">
                    {' '}
                    <Header />
                </div>
            </div>
            <div className="pt-5">
                <User />
            </div>
        </>
    );
};

export default Search;
