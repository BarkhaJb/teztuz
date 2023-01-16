import React, { useEffect, useState, useRef } from 'react';
import { Container, Button, Form, Col, Row, Modal } from 'react-bootstrap';
import '../../../css/main.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Circle } from 'rc-progress';
import { ToastContainer, toast } from 'react-toastify';

const GpaBlock = ({ gpa, scale, setToggle, toggle, setGPA, setScale }) => {
    const [unLock, setUnLock] = useState(false);
    const [unLockPass, setUnLockPass] = useState(false);
    const [lock, setLock] = useState(false);
    const [removeLock, setRemoveLock] = useState(false);
    const [myPass, setPass] = useState('');
    const [showPercentage, setShowPercentage] = useState();
    const [gradetoggle, setGradeToggle] = useState(true);

    const createDocPasss = useRef();
    const unLockDocPasss = useRef();
    const removeDocPasss = useRef();

    useEffect(() => {
        setPass(localStorage.getItem('LockDoc'));
        if ('LockDoc' in localStorage) {
            setUnLock(true);
        } else setUnLock(false);
    }, []);

    useEffect(() => {
        gpatopercent();
    }, [gpa, scale, toggle, setToggle]);

    const gpatopercent = () => {
        let percentage;
        if (scale === 'percentage') {
            percentage = gpa;
            let value = percentage.toPrecision(4);
            setShowPercentage(value);
            setGradeToggle(!gradetoggle);
        }
    };
    const PassWordModal = () => {
        return (
            <div className={unLock ? 'paswordcreation' : 'paswordcreation-hidden'}>
                <UnLockDocument />
            </div>
        );
    };
    const PassCreateWordModal = () => {
        return (
            <div className={unLockPass ? 'PassCreateWordModal' : 'PassCreateWordModal-hidden'}>
                <CreatePassWord />
            </div>
        );
    };
    const RemoveLockModel = () => {
        return (
            <div className={removeLock ? 'RemoveLockModel' : 'RemoveLockModel-hidden'}>
                <RemoveLock />
            </div>
        );
    };

    // ######Modal Form1##################
    const UnLockDocument = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(unLockDocPasss.current.value, myPass);
            if (unLockDocPasss.current.value == myPass) {
                setLock(true);
                setUnLock(false);
            } else
                toast.error('Wrong Pass', {
                    position: 'top-right',
                    theme: 'colored',
                    autoClose: 2000,
                    hideProgressBar: false
                });
        };
        return (
            <>
                <Form noValidate onSubmit={handleSubmit} className="Payment-Form">
                    <div>
                        <div className="text-center text-white mb-5">
                            <h5>ENTER PASSWORD TO UNLOCK DOCUMENT</h5>
                        </div>
                        <Form.Group className="unclockdocs" controlId="unclockdoc">
                            <Form.Control type="text" placeholder="" ref={unLockDocPasss} name="unlockpass" defaultValue="" />
                        </Form.Group>
                    </div>
                    {/* <p type="button" className="mt-3 pt-1 me-2 back text-white forgot">
                        Forgot password
                    </p> */}
                    <div className="text-center">
                        <Button type="submit" className="mt-3 removebtn">
                            Unlock
                        </Button>
                    </div>
                </Form>
            </>
        );
    };
    // ################################################       RemoveLock #################
    const RemoveLock = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(removeDocPasss.current.value, myPass);
            if (removeDocPasss.current.value == myPass) {
                setPass(localStorage.removeItem('LockDoc'));
                setRemoveLock(false);
                setLock(!lock);
            } else
                toast.error('Wrong Pass', {
                    position: 'top-right',
                    theme: 'colored',
                    autoClose: 2000,
                    hideProgressBar: false
                });
        };

        return (
            <div className="form-step-2">
                <div className="text-center text-white mb-5">
                    <h5>ENTER PASSWORD TO REMOVE LOCK</h5>
                </div>

                <Form noValidate onSubmit={handleSubmit} className="Payment-Form">
                    <Form.Group controlId="removelock">
                        <Form.Control type="text" placeholder="" name="removelock" ref={removeDocPasss} />
                    </Form.Group>
                    <div className="text-center">
                        <Button className="mt-3 me-3 cancelbtn d-inline" onClick={() => setRemoveLock(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="me-3 mt-3 lockcontinue d-inline">
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        );
    };
    // ################

    const CreatePassWord = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(createDocPasss.current.value, myPass);
            localStorage.setItem('LockDoc', createDocPasss.current.value);
            setLock(!lock);
            setUnLockPass(false);
        };
        return (
            <Form noValidate onSubmit={handleSubmit} className="Payment-Form">
                <div>
                    <div className="text-center text-white mb-5">
                        <div>
                            <img src="../assets/lockk.svg" alt="createpass" className="middel" />
                            <span className="ms-3">LOCK DOCUMENT</span>
                        </div>
                        <p className="mt-4">Create password</p>
                    </div>
                    <Form.Group className="createpassword" controlId="creatpass">
                        <Form.Control type="text" placeholder="" ref={createDocPasss} name="createpass" defaultValue="" />
                    </Form.Group>
                </div>
                <div className="text-center">
                    <Button type="submit" className="mt-3 cancelbtn d-inline">
                        Cancel
                    </Button>
                    <Button type="submit" className="mt-3 ms-3 create d-inline">
                        Create
                    </Button>
                </div>
            </Form>
        );
    };
    return (
        <>
            <div className="gp-block">
                <Container>
                    <Row>
                        <Col xs={6} md={9}>
                            <h1>
                                <b>GPA Calculator</b>
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus consequatur quos fugit nihil, voluptas quae enim necessitatibus corrupti maiores ex ut sunt dolorem,
                                soluta quo repellat eius in odit ullam.
                            </p>
                        </Col>

                        <Col xs={6} md={3}>
                            <div className="mx-2 position-relative rt-box gpablock">
                                <Circle
                                    percent={scale == '4.0' ? (gpa.toFixed(2) * 100) / 4 : (gpa.toFixed(2) * 100) / 4.3}
                                    strokeWidth="4"
                                    strokeColor={{
                                        '0%': '#114281',
                                        '80%': '#00bbf3'
                                    }}
                                />
                                {!toggle === true ? (
                                    <h6 className="prof-val67">
                                        <span>{gpa.toFixed(2)}</span> <br /> GPA
                                    </h6>
                                ) : (
                                    <h6 className="prof-val67">
                                        <span>
                                            {' '}
                                            {showPercentage} <br /> %
                                        </span>
                                    </h6>
                                )}

                                {/* <button onClick={toggletoPercent}>%</button> */}
                                <div className="locks">
                                    {lock ? (
                                        <img src="../assets/lockk.svg" alt="lock" onClick={() => setRemoveLock(true)} />
                                    ) : (
                                        <img src="../assets/unlock.svg" alt="lock" onClick={() => setUnLockPass(true)} />
                                    )}
                                </div>
                                {/* <div>
                                    <img className="percenttogl" src="../assets/percent.svg" onClick={toggletoPercent}></img>
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
                <PassWordModal show={unLock} onHide={() => setUnLock(false)} className="PassWordModal" />
                <PassCreateWordModal show={unLockPass} onHide={() => setUnLockPass(false)} className="PassCreateWordModal" />
                <RemoveLockModel show={removeLock} onHide={() => setRemoveLock(false)} className="RemoveLockModel" />
            </div>
        </>
    );
};

export default GpaBlock;
