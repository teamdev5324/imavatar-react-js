import React, { useEffect, useState } from 'react';
import {
    downFlower,
    logoImage,
    upFlower,
} from '../../constants/imageConstants';
import { Link, useNavigate } from 'react-router-dom';
import MainLinkButton from '../../components/buttons/MainLinkButton';
import { decrypt } from '../../crypto';
import api from '../../api';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';

const OTPSignin = () => {
    const [otp, setOtp] = useState('');
    const [resend, setResend] = useState(false);
    const [resentActive, setResentActive] = useState(null);
    const [userId, setUserId] = useState(null);
    const [myNumber, setMyNumber] = useState(null);
    const [change, setChange] = useState(false);
    const [newMobileNumber, setNewMobileNumber] = useState(null);
    const [otpSent, setOtpSent] = useState(false);

    // const handleChange = (value) => {
    //     setOtp(value);
    // };

    // const dispatch =
    // useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

    const navigate = useNavigate();

    const initialValues = {
        email: '',
    };

    const validationSchema = yup.object({
        email: yup.string().required().test('email_or_phone', 'Enter valid Email ID or Phone Number', (value) => {
            return validateEmail(value) || validatePhone(value);
        }),
    });

    const validateEmail = (email) => {
        return yup.string().email().isValidSync(email);
    };

    const validatePhone = (phone) => {
        return yup.string().required().matches(/^[789]\d{9}$/).min(10).max(10).isValidSync(phone);
    };

    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: () => {
            navigate('/otp-signin/otp/' + values.email);
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setResentActive((timer) => (timer > 0 ? timer - 1 : timer));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     if (localStorage.getItem('userData')) {
    //         sendOtp();
    //         const num = JSON.parse(decrypt(localStorage.getItem('userData'))).phoneNumber.split('');
    //         setMyNumber('********' + num[8] + num[9])
    //     } else {
    //         window.location.assign('/signin');
    //     }
    // }, []);

    const styles = {
        cover: { width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, zIndex: 99 },
        form: {
            width: 400,
            maxWidth: '100%',
            backgroundColor: '#fff',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: 999,
            transform: 'translate(-50%, -50%)',
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            marginHorizontal: 200
        }
    }

    return (
        <>
            <div className="flogs2">
                <img src={downFlower} alt="Flower Background" />
            </div>
            <div className="flogs1">
                <img src={upFlower} alt="Flower Background" />
            </div>
            <div className="logo">
                <div className="row">
                    <div className="col-md-12">
                        <div className="log">
                            <img src={logoImage} className="img-fluid" alt="Brand Logo" />{' '}
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="mob pt-md-5 pb-md-5 ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="login-left lts">
                                <h2>Login With OTP</h2>
                                <div className="welcome-form">
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                        }}>
                                        <div className="col-md-12 frmss" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                            <input type='text' placeholder='Email ID or Phone Number' className='form-control form-padding' style={{ maxWidth: 400 }}
                                                onChange={handleChange('email')}
                                            />
                                            {errors.email && (<div className='error'>{errors.email}</div>)}
                                        </div>
                                        <div
                                            className="col-md-12 frmss mb-3"
                                        // onClick={() => {
                                        //   const phoneNumber = getItem(APP_CONSTANTS.USER);
                                        //   const otpParams = {
                                        //     partnerType: 'admin',
                                        //     userName: phoneNumber,
                                        //     userType: '6',
                                        //   };

                                        //   if (resentActive <= 0) {
                                        //     setResend(!resend);
                                        //     setResentActive(60);
                                        //     // dispatch(sendVerificationOtp(otpParams));
                                        //   }
                                        // }}
                                        >
                                        </div>

                                        <div
                                            className="col-md-12 frmss mb-4"
                                        >
                                            <input
                                                type="submit"
                                                className='btn btn1'
                                                value='Confirm'
                                                onClick={() => handleSubmit()}
                                            />


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OTPSignin;
