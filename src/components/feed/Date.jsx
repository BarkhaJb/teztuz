import React from 'react';
const MyDate = () => {
    // const current = new Date();
    var today = new Date();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    var date = today.toLocaleDateString('en-US', options);
    return <p className="dated mb-1">{date}</p>;
};
export default MyDate;
