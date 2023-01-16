import React, { useState } from 'react';
import { Row, Col, Form, Container } from 'react-bootstrap';
import '../../css/main.css';
import { Circle } from 'rc-progress';

const TeztusScore = () => {
    let score = 80;
    return (
        <>
            <div className="teztScore">
                <Container className="w-100">
                    <h3 className="text-white">MY TEZTUS SCORE</h3>
                    <div className="teztscore mb-3" style={{ maxWidth: '400px' }}>
                        <div className="text-center position-relative" style={{ float: 'left' }}>
                            <div className="">
                                <Circle
                                    percent={score}
                                    strokeWidth="4"
                                    strokeColor={{
                                        '0%': '#114281',
                                        '80%': '#00bbf3'
                                    }}
                                />
                                <div className="score-info">
                                    <p className="mb-0">0</p>
                                    <p>Posts</p>
                                </div>
                            </div>
                            <p className="mt-3">Teztus Score</p>
                        </div>
                        <div className="text-center position-relative" style={{ float: 'right' }}>
                            <div className="">
                                <Circle
                                    percent={score}
                                    strokeWidth="4"
                                    strokeColor={{
                                        '0%': '#114281',
                                        '80%': '#00bbf3'
                                    }}
                                />
                                <div className="score-info hor">
                                    <p className="mb-0 mt-2">0 hrs</p>
                                </div>
                            </div>
                            <p className="mt-3">Total Hours Studied</p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
export default TeztusScore;
