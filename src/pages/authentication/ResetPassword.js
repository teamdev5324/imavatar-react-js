import React, { useEffect, useState } from 'react';
import {
    downFlower,
    lockIcon,
    logoImage,
    upFlower,
    hide, show
} from '../../constants/imageConstants';
import { Link, useNavigate } from 'react-router-dom';
import MainLinkButton from '../../components/buttons/MainLinkButton';
import { decrypt, encrypt } from '../../crypto';
import api from '../../api';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import * as yup from 'yup';
import { useFormik } from 'formik';

const ResetPassword = () => {
    const [resend, setResend] = useState(false);
    const [resentActive, setResentActive] = useState(null);
    const [userId, setUserId] = useState(null);
    const [myNumber, setMyNumber] = useState(null);
    const [change, setChange] = useState(false);
    const [newMobileNumber, setNewMobileNumber] = useState(null);
    const [myEmail, setMyEmail] = useState(null);

    // const handleChange = (value) => {
    //     setOtp(value);
    // };

    // const dispatch =
    // useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

    const navigate = useNavigate();

    const initialValues = {
        password: '',
        confirmPassword: '',
    }

    const validationSchema = yup.object({
        password: yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            `Your password must have:
 - Between 9-16 characters
 - Uppercase characters A-Z
 - Lowercase characters a-z
  - Numbers (0-9)
 - Special characters ! @ # $ % & ^ ( ) _ - + =; : ? / , .`),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Password and confirm password do not match'),
    });

    const { values, errors, handleChange, handleSubmit, setFieldError, touched } = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async () => {

            const __data = JSON.stringify({
                "email": JSON.parse(decrypt(localStorage.getItem('userData'))).emailId,
                "password": values.password,
                "userId": JSON.parse(decrypt(localStorage.getItem('userData'))).id,
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://35.170.79.161:8080/api/user/noAuth/changePassword',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: __data
            };

            const { data } = await axios(config);

            console.log(data);

            if (data.statusCode === '200') {
                toast.success('Password changed successfully', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/signin');
            } else {
                toast.error('Invalid OTP', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setResentActive((timer) => (timer > 0 ? timer - 1 : timer));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const sendOtp = () => {
        const userData = JSON.parse(decrypt(localStorage.getItem('userData')));
        console.log(userData);
        const { id: uid, userCode: userName, phoneNumber } = userData;
        setUserId(uid);
        const params = {
            partnerType: "admin",
            userName: phoneNumber,
            userType: "6",
        };

        api.post('http://35.170.79.161:8080/api/user/noAuth/forgetPswd', params)
            .then(res => {
                res = res.data;
                console.log(res);
                setResentActive(60);
                if (res.status === 'SUCCESS') {
                    toast.success('OTP sent successfully', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error("Can not sent OTP", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(res);
                }
            })
    }

    // useEffect(() => {
    //     if (localStorage.getItem('userData')) {
    //         sendOtp();
    //         const num = JSON.parse(decrypt(localStorage.getItem('userData'))).phoneNumber.split('');
    //         setMyNumber('********' + num[8] + num[9]);
    //         setMyEmail(JSON.parse(decrypt(localStorage.getItem('userData'))).emailId)
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
    };

    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    return (
        <>
            <div class="flogs2">
                <img src={downFlower} />
            </div>
            <div class="flogs1">
                <img src={upFlower} />
            </div>
            <div class="logo">
                <div class="row">
                    <div class="col-md-12">
                        <div class="log">
                            <img src={logoImage} class="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="mob pt-md-5 pb-md-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="login-left lts">
                                <h2>Reset Your Password</h2>
                                <div class="welcome-form">
                                    <form class="reset">
                                        <div class="col-md-12 frmss mb-4">
                                            <img src={lockIcon} class="img-fluid" />
                                            <input type={showPass ? 'text' : 'password'} class="form-control" placeholder="New Password *" style={{ paddingLeft: 50, paddingRight: 35 }} onChange={handleChange('password')} />
                                            <img src={showPass ? hide : show} style={{ width: 25, height: 25, opacity: 0.2, cursor: 'pointer', left: 'auto', right: 5, top: 7 }}
                                                onClick={() => {
                                                    if (showPass) {
                                                        setShowPass(false);
                                                    } else {
                                                        setShowPass(true);
                                                    }
                                                }}
                                            />
                                            {touched.password && errors.password && (<div className='error'>{errors.password}</div>)}
                                        </div>
                                        <div class="col-md-12 frmss mb-4">
                                            <img src={lockIcon} class="img-fluid" />
                                            <input type={showPass2 ? 'text' : 'password'} class="form-control" placeholder="Confirm Password *" style={{ paddingLeft: 50, paddingRight: 35 }} onChange={handleChange('confirmPassword')} />
                                            <img src={showPass2 ? hide : show} style={{ width: 25, height: 25, opacity: 0.2, cursor: 'pointer', left: 'auto', right: 5, top: 7 }}
                                                onClick={() => {
                                                    if (showPass2) {
                                                        setShowPass2(false);
                                                    } else {
                                                        setShowPass2(true);
                                                    }
                                                }}
                                            />
                                            {touched.confirmPassword && errors.confirmPassword && (<div className='error'>{errors.confirmPassword}</div>)}
                                        </div>
                                        <div class="col-md-12 frmss mb-4">
                                            <input type="button" class="btn btn1" value="Confirm" onClick={() => handleSubmit()} />
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

export default ResetPassword;
