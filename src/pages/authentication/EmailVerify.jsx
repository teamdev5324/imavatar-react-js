import React, { useEffect, useState } from 'react';
import {
  downFlower,
  logoImage,
  upFlower,
} from '../../constants/imageConstants';
import { Link, useNavigate } from 'react-router-dom';
// import MainLinkButton from '../../components/buttons/MainLinkButton';
// import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import OTPInput from 'react-otp-input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../services/profile/getUserData';
import { decrypt, encrypt } from '../../crypto';
import api from '../../api';
import { toast } from 'react-toastify';

const EmailVerify = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const uid = useSelector(state => state.profile.user.id);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const [time, setTime] = useState(null);
  const [userId, setUserId] = useState(null);
  const [change, setChange] = useState(false);
  const [myEmail, setMyEmail] = useState(null);
  const [newEmailValue, setNewEmailValue] = useState(null);

  useEffect(() => {
    if (time === 0) {
      toast.warn("OTP has been expired", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
  }, [time]);

  useEffect(() => {
    const intervel = setInterval(() => {
      setTime(time => (time > 0 ? time - 1 : time));
    }, 1000);
    return () => clearInterval(intervel);
  }, []);

  const initialValues = {
    otp: '',
  };

  const validationSchema = yup.object({
    otp: yup.string().required("OTP can not be empty").min(4, 'Please enter valid OTP'),
  });

  const { values, errors, handleChange, handleSubmit, setFieldError, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async () => {
      const { otp } = values;

      const { data } = await axios.get(`http://35.170.79.161:8080/api/user/userVerification/email/${otp}/${userId}`)
      console.log(data);

      if (data.statusCode === '200') {
        axios.get('http://35.170.79.161:8080/api/user/noAuth/getUserInfo/' + JSON.parse(decrypt(localStorage.getItem('userData'))).id)
          .then(async res => {
            localStorage.setItem('userData', encrypt(JSON.stringify(res.data.data)));
            const data = JSON.stringify({
              "emailVerified": true,
              "user_id": JSON.parse(decrypt(localStorage.getItem('userData'))).id,
            });

            const config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'http://35.170.79.161:8080/api/user/v2/noAuth/updateUser',
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
              },
              data: data
            };

            let res_ = await axios(config);
            res_ = res_.data;
            console.log(res_);
            localStorage.setItem('userData', encrypt(JSON.stringify(res_)));
            navigate('/email-verified');
          })
      } else {
        toast.error(data.statusMessage, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setFieldValue('otp', null);
      }
    }
  });

  const sendOtp = () => {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(decrypt(localStorage.getItem('userData')));
      console.log(userData);
      const { id: uid, userCode: userName, phoneNumber } = userData;
      setUserId(uid);
      const params = {
        partnerType: "admin",
        userName: phoneNumber,
        userType: "6",
      };

      api.post('http://35.170.79.161:8080/api/user/MP/noAuth/sendOTP/emailVerification', params)
        .then(res => {
          res = res.data;
          if (res.status === 'SUCCESS') {
            setTime(60);
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
            toast.error("Can not send OTP", {
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
    } else {
      window.location.assign('/signin')
    }
  }

  useEffect(() => {
    sendOtp();
    const userData = JSON.parse(decrypt(localStorage.getItem('userData')));
    setMyEmail(userData.emailId)
  }, []);

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
      {change && (
        <>
          <div style={styles.cover} onClick={() => setChange(false)}></div>
          <form className='change-form' onSubmit={async e => {
            e.preventDefault();
            const res__ = await axios.get('http://35.170.79.161:8080/api/user/MP/noAuth/userExists/' + newEmailValue)

            console.log(res__.data.status);

            if (res__.data.status === 'SUCCESS') {
              toast.error('User already exists with this email', {
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
              const data = JSON.stringify({
                "email": newEmailValue,
                // "phoneNumber": "8141692859",
                "user_id": JSON.parse(decrypt(localStorage.getItem('userData'))).id,
              });

              const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://35.170.79.161:8080/api/user/v2/noAuth/updateUser',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'Content-Type': 'application/json'
                },
                data: data
              };

              axios(config)
                .then(function (res) {
                  res = res.data;
                  if (res) {
                    toast.success('Email ID changed successfully', {
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    setChange(false);
                    sendOtp();
                  } else {
                    toast.error('Something went wrong', {
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
                })
                .catch(function (error) {
                  console.log(error);
                  toast.error('Something went wrong', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                });
            }
          }}>
            <span>New Email ID</span>
            <input type='email' placeholder='Your new email id' className='form-control' required
              onChange={text => {
                text = text.currentTarget.value;
                setNewEmailValue(text);
              }}
              value={newEmailValue}
            />
            <input type='submit' className='edit' />
          </form>
        </>
      )}
      <div className='flogs2'>
        <img src={downFlower} />
      </div>
      <div className='flogs1'>
        <img src={upFlower} />
      </div>
      <div className='logo'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='log'>
              <Link to='/'><img src={logoImage} className='img-fluid' /> </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='clearfix'></div>
      <div className='mob pt-md-5 pb-md-5 '>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='login-left lts'>
                <h2><span>Email Verification </span></h2>
                <p>Enter OTP sent to  {myEmail}  <a onClick={() => setChange(true)}> Change</a></p>
                <div className='welcome-form'>
                  <form>
                    <div className="col-md-12 frmss">
                      <OTPInput
                        value={values.otp}
                        onChange={handleChange('otp')}
                        numInputs={4}
                        className="frmotp otp-input"
                        separator={<span style={{ width: '10px' }} />}
                        isInputNum={true}
                        containerStyle={{
                          justifyContent: 'center',
                        }}
                        isDisabled={time === 0 ? true : false}
                      />
                      {errors.otp && (<div className='err' style={{ marginTop: '10px !important' }}>{errors.otp}</div>)}
                    </div>
                    {time && time !== 0 ? (
                      <div className='col-md-12 frmss mb-2'>
                        <label>Code expires in {time === 60 ? '01:00' : ('00:' + (time < 10 ? '0' + time : time))}</label>
                      </div>
                    ) : null}
                    {time === 0 && (
                      <div className='col-md-12 frmss mb-3'>
                        <p className='resend' onClick={sendOtp}>Resend OTP</p>
                      </div>
                    )}

                    <div className='col-md-12 frmss mb-4'>
                      <input type='button' value='Confirm' className='btn btn1' onClick={() => handleSubmit()} />
                    </div>
                    {/* <div className='col-md-12 frmss mb-4'>
                      <a href='email_verified.html'> <input type='button' className='btn btn1' value='Next' /> </a>
                    </div> */}
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

export default EmailVerify;
