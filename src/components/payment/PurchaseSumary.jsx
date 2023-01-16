import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
const PurchaseSummary = (props) => {
    const [refers, setReferrs] = useState([{ referrs: 'You referred M_Wau' }, { referrs: 'You referred M_Wau' }, { referrs: 'You referred M_Wau' }]);
    const steps = props.Form;
    const payopt = props.pay;

    const navigate = useNavigate();
    return (
        <>
            <div className="form-step-3">
                <div className="text-center text-white mb-5">
                    <h2>Purchase Summary</h2>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="text-white">
                        <h5>Science Course</h5>
                        <p>10 videos</p>
                    </div>
                    <div className="text-white">{payopt === 'referrals' ? <h5>3 referrals</h5> : <h5>$60</h5>}</div>
                </div>
                {refers.map((val, index) => {
                    return (
                        <>
                            <div className="d-flex referrs">
                                <div className="text-white me-4">
                                    <img src="../assets/user.png" style={{ minWidth: '50px' }} alt="user-referred" />
                                </div>
                                <div className="text-white">
                                    <h5 className="mb-1">{val.referrs}</h5>
                                    <p>Feb 17 2022</p>
                                </div>
                            </div>
                        </>
                    );
                })}
                <div className="d-flex justify-content-between">
                    <div className="text-white py-2">
                        <h5>Subtotals:</h5>
                    </div>
                    <div className="text-white">
                        <h5>$ 0.00</h5>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="text-white py-2">
                        <h5>Total:</h5>
                    </div>
                    <div className="text-white">
                        <h5>$ 0.00</h5>
                    </div>
                </div>
                <Button type="button" onClick={steps} className="mt-3 me-3 back">
                    Back
                </Button>
                <Button type="submit" className="mt-3 next" onClick={() => navigate('/all-subject')}>
                    {payopt === 'referrals' ? 'Cash In' : 'Purchase'}
                </Button>
            </div>
        </>
    );
};

export default PurchaseSummary;
