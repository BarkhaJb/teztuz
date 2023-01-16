import React, { useMemo, useState, useEffect } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import '../../css/main.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import PaymentOption from './Payments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import csc from 'country-state-city';
import PurchaseSummary from './PurchaseSumary';
const PaymentSteps = () => {
    const options = useMemo(() => countryList().getData(), []);
    const [value, setValue] = useState('');
    const [video, setVideo] = useState(false);

    // const addressFromik = useFormik({
    //     initialValues: {
    //         country: 'India',
    //         state: null,
    //         city: null
    //     }
    //     // onSubmit: (values) => console.log(JSON.stringify(values))
    // });
    const updatedStates = (countryId) => csc.getStatesOfCountry(countryId).map((state) => ({ label: state.name, value: state.id, ...state }));
    const updatedCities = (stateId) => csc.getCitiesOfState(stateId).map((city) => ({ label: city.name, value: city.id, ...city }));

    // const { values, handleSubmit, setFieldValue, setValues } = addressFromik;

    // useEffect(() => {}, [values]);

    const countries = csc.getAllCountries();
    const updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.id,
        ...country
    }));

    // const [refers, setReferrs] = useState([{ referrs: 'You referred M_Wau' }, { referrs: 'You referred M_Wau' }, { referrs: 'You referred M_Wau' }]);
    const notify = () =>
        toast.success('Thanks You', {
            position: 'top-right',
            theme: 'colored',
            autoClose: 2000,
            hideProgressBar: false
        });
    const schema = yup.object().shape({
        address: yup.string().required('This field is required'),
        city: yup.string(),
        unit: yup.string(),
        province: yup.string(),
        postalcode: yup.string()
    });

    const handleSubmit = (values) => {
        alert(JSON.stringify(values), 'Payment');
        notify();
        setVideo(true);
    };

    const [formStep, setformstep] = React.useState(0);
    // Next step
    const cmpFrom = () => {
        setformstep((cur) => cur + 1);
    };
    // previous step
    const cmpFrom1 = () => {
        setformstep((cur) => cur - 1);
    };
    const changeHandler = (valuee) => {
        setValue(value);
    };
    const formButton = () => {
        if (formStep > 1) {
            return undefined;
        } else if (formStep === 1) {
            return (
                <>
                    <Button type="button" onClick={cmpFrom} className="mt-3">
                        Purchase
                    </Button>
                </>
            );
        } else if (formStep === 2) {
            return (
                <>
                    <Button type="button" onClick={cmpFrom1} className="mt-3 back">
                        Back
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <Button type="button" onClick={cmpFrom} className="mt-3 next">
                        Continue
                    </Button>
                </>
            );
        }
    };
    const IntroVideo = () => {
        return (
            <iframe
                width="90%"
                height="500"
                src="https://www.youtube.com/embed/videoseries?list=PLexagO6P8kJdVzTkh_5kte5Ss3277BRAw"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="allowfullscreen"
            ></iframe>
        );
    };
    return (
        <>
            {!video ? (
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        payment_method: 'credit',
                        address: '',
                        city: '',
                        unit: '',
                        province: '',
                        postalcode: '',
                        country: 'Pakistan',
                        state: null,
                        city: null
                    }}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, setFieldValue, setValues }) => (
                        <Form noValidate onSubmit={handleSubmit} className="Payment-Form">
                            {formStep === 0 && (
                                <div>
                                    <div className="text-center text-white mb-5">
                                        <h2>Payment Details</h2>
                                        <p>Choose you preferred method of payment</p>
                                    </div>
                                    <Form.Group className="d-flex payblock" controlId="credit">
                                        <Form.Label className="d-flex">
                                            {' '}
                                            <div className="me-3 pt-3">
                                                <Form.Check
                                                    column
                                                    sm="4"
                                                    name="payment_method"
                                                    type="radio"
                                                    isInvalid={!!errors.credit}
                                                    value="credit"
                                                    defaultChecked={values.payment_method == 'credit'}
                                                    onChange={handleChange}
                                                    isValid={touched.credit && !errors.credit}
                                                    // id="payment-1"
                                                />
                                            </div>
                                            <div className="text-white">
                                                <h5>Credit Card</h5>
                                                <p>Pay with a credit or authorized debt card</p>
                                            </div>
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group className="d-flex payblock" controlId="referrals">
                                        <Form.Label className="d-flex">
                                            <div className="me-3 pt-3">
                                                <Form.Check
                                                    column
                                                    sm="4"
                                                    name="payment_method"
                                                    type="radio"
                                                    // id="payment-2"
                                                    isInvalid={!!errors.referrals}
                                                    value="referrals"
                                                    defaultChecked={values.payment_method == 'referrals'}
                                                    onChange={handleChange}
                                                    isValid={touched.referrals && !errors.referrals}
                                                />
                                            </div>
                                            <div className="text-white">
                                                <h5>Referal Code</h5>
                                                <p>Pay with a credit or authorized debt card</p>
                                            </div>
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group className="d-flex payblock" controlId="referals">
                                        <Form.Label className="d-flex">
                                            <div className="me-3 pt-3">
                                                <Form.Check
                                                    column
                                                    sm="4"
                                                    disabled
                                                    name="teztus"
                                                    type="radio"
                                                    // id="payment-3"
                                                    isInvalid={!!errors.teztus}
                                                    value={values.teztus}
                                                    onChange={handleChange}
                                                    isValid={touched.teztus && !errors.teztus}
                                                />
                                            </div>
                                            <div className="text-white">
                                                <h5>Teztus Points</h5>
                                                <p>Currently not available</p>
                                            </div>
                                        </Form.Label>
                                    </Form.Group>
                                </div>
                            )}
                            {formStep === 1 && (
                                <div className="form-step-2">
                                    <div className="text-center text-white mb-5">
                                        <h2 className="mt-4">Enter your payment details</h2>
                                    </div>
                                    <PaymentOption />
                                    <Form.Group className="" controlId="streetaddress">
                                        <Form.Control
                                            type="text"
                                            placeholder="Stree address"
                                            name="address"
                                            isInvalid={!!errors.address}
                                            value={values.address}
                                            onChange={handleChange}
                                            isValid={touched.address && !errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="" controlId="unit">
                                        <Form.Control type="text" placeholder="Apt, unit, suit, etc, (Optional)" value={values.unit} name="unit" onChange={handleChange} />
                                    </Form.Group>
                                    {/* <Select options={options} value={valuee} onChange={changeHandler} /> */}

                                    <Select
                                        id="country"
                                        name="country"
                                        label="country"
                                        options={updatedCountries}
                                        value={values.country}
                                        // onChange={value => {
                                        //   setFieldValue("country", value);
                                        //   setFieldValue("state", null);
                                        //   setFieldValue("city", null);
                                        // }}
                                        onChange={(value) => {
                                            setValues({ country: value, state: null, city: null }, false);
                                        }}
                                    />

                                    <Row className="">
                                        <Col sm={12} md={6} className="m-auto">
                                            <Form.Group className="" controlId="streetaddress">
                                                {/* <Form.Control type="text" placeholder="City" name="city" value={values.city} onChange={handleChange} /> */}

                                                <Select
                                                    id="state"
                                                    name="state"
                                                    options={updatedStates(values.country ? values.country.value : null)}
                                                    value={values.state}
                                                    onChange={(value) => {
                                                        setValues({ state: value, city: null }, false);
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={12} md={3} className="m-auto">
                                            <div>
                                                {/* <select class="form-select" aria-label="Default select example" value={values.province} name="province" onChange={handleChange}>
                                                    <option disabled selected>
                                                        Province
                                                    </option>
                                                    <option value="toronto">Toronto</option>
                                                    <option value="florida">Florida</option>
                                                    <option value="canada">Canada</option>
                                                </select> */}
                                                <Select
                                                    id="city"
                                                    name="city"
                                                    options={updatedCities(values.state ? values.state.value : null)}
                                                    value={values.city}
                                                    onChange={(value) => setFieldValue('city', value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col sm={12} md={3} className="">
                                            <Form.Group className="" controlId="streetaddress">
                                                <Form.Control type="text" name="postalcode" placeholder="Postal code" value={values.postalcode} onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button type="submit" onClick={cmpFrom1} className="mt-3 me-3 back">
                                        Back
                                    </Button>
                                </div>
                            )}
                            {formStep === 2 && <PurchaseSummary pay={values.payment_method} Form={cmpFrom1} />}

                            {formButton()}
                        </Form>
                    )}
                </Formik>
            ) : (
                <IntroVideo />
            )}
        </>
    );
};

export default PaymentSteps;
