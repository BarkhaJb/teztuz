import React from 'react';

const Progress = () => {
    return (
        <div className="main-progress">
            <div className="progress-content">
                <h3 className="text-center mb-3 fs-4">PROGRESS</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit adipisicing elit. Rem suscipit arc</p>
                <div className="progrss-refers">
                    <div className="cricl">
                        <div className="cont-flex">
                            <p className="text-center mb-1 p-count">3/3</p>
                            <p className="m-0 text-center">Referals</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="rfrs text-center">You have a total of 5 referals</p>
                </div>
            </div>
        </div>
    );
};

export default Progress;
