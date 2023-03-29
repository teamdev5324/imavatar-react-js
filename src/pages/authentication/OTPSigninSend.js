import React, { useEffect, useState } from 'react';
import {
  downFlower,
  logoImage,
  upFlower,
} from '../../constants/imageConstants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainLinkButton from '../../components/buttons/MainLinkButton';
import { decrypt, encrypt } from '../../crypto';
import api from '../../api';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import * as yup from 'yup';
import { useFormik } from 'formik';
import apiCall from '../onboarding/apiCall';

const OTPSigninSent = () => {
  const [resend, setResend] = useState(false);
  const [resentActive, setResentActive] = useState(null);
  const [userId, setUserId] = useState(null);
  const [myNumber, setMyNumber] = useState(null);
  const [change, setChange] = useState(false);
  const [newMobileNumber, setNewMobileNumber] = useState(null);
  const [myEmail, setMyEmail] = useState(null);
  const [uid, setUid] = useState(null);
  // const [mm, setMm] = useState(null);

  const { username } = useParams();

  // const handleChange = (value) => {
  //     setOtp(value);
  // };

  // const dispatch =
  // useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  const navigate = useNavigate();

  const initialValues = {
    otp: '',
  };

  const validationSchema = yup.object({
    otp: yup
      .string()
      .required('OTP can not be empty')
      .min(4, 'Please enter valid OTP'),
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldError,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async () => {
      const { otp } = values;

      const data__ = JSON.stringify({
        otp: values.otp,
        userName: username,
        userType: '6',
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://52.90.60.5:8080/api/user/noAuth/loginByOTP',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data__,
      };

      const { data } = await axios(config);
      console.clear();
      console.log(data);
      if (data.statusCode === '200') {
        // navigate('/profile/details');

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: '/user/auth/getUserInfo',
          headers: {
            Authorization: 'Bearer ' + data.data,
          },
        };

        let { data: userData } = await api(config);
        userData = userData.data;
        console.log(userData);

        localStorage.setItem('token', data.data);
        // localStorage.setItem('userData', encrypt(JSON.stringify(userData)));

        // console.log(data);

        axios
          .get(
            'http://52.90.60.5:8080/api/user/noAuth/getUserInfo/' + userData.id
          )
          .then(async (res) => {
            console.log(res.data.data);
            localStorage.setItem(
              'userData',
              encrypt(JSON.stringify(res.data.data))
            );
            if (res.data.data.emailVerified && res.data.data.phoneVerified) {
              const { verificationStatus } = await apiCall();
              console.log(verificationStatus);
              if (verificationStatus === 'WIP') {
                navigate('/onboarding/verified');
              } else if (verificationStatus === 'DRAFT') {
                navigate('/onboarding/details');
              } else if (verificationStatus === 'APPROVED') {
                navigate('/profile/details');
              } else if (verificationStatus === 'REJECTED') {
                navigate('/onboarding/details');
              }
            } else {
              navigate('/mobileotp');
            }
          });
      } else {
        toast.error(data.statusMessage, {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setFieldValue('otp', null);
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setResentActive((timer) => (timer > 0 ? timer - 1 : timer));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sendOtp = async () => {
    // const userData = JSON.parse(decrypt(localStorage.getItem('userData')));
    // console.log(userData);
    // const { id: uid, userCode: userName, phoneNumber, emailId } = userData;
    // setUserId(uid);
    const params = {
      partnerType: 'admin',
      userName: username,
      userType: '6',
    };

    api
      .post('http://52.90.60.5:8080/api/user/MP/noAuth/sendOTP/login', params)
      .then(async (res) => {
        res = res.data;
        console.log(res);
        setUid(res.data);
        setResentActive(60);
        if (res.status === 'SUCCESS') {
          toast.success('OTP sent successfully', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          // let res2 = await axios.get(`http://52.90.60.5:8080/api/user/noAuth/getUserInfo/${res.data}`);
          // res2 = res2.data.data;
          // console.log(res2);

          const isPhoneNumber = (input_str) => {
            var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            return re.test(input_str);
          };

          setMyEmail(username);
          if (isPhoneNumber(username)) {
            const num = username.split('');
            setMyNumber('+91 *******' + num[7] + num[8] + num[9]);
          } else {
            setMyNumber(username);
          }
        } else {
          toast.error('User not found', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          console.log(res);
          navigate('/otp-signin', { replace: true });
        }
      });
  };

  useEffect(() => {
    sendOtp();
  }, []);

  const styles = {
    cover: {
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99,
    },
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
      marginHorizontal: 200,
    },
  };

  useEffect(() => {
    if (resentActive === 0) {
      toast.warn('OTP has been expired', {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setFieldValue('otp', null);
    }
  }, [resentActive]);

  return (
    <>
      <div className="flogs2">
        <img src={downFlower} />
      </div>
      <div className="flogs1">
        <img src={upFlower} />
      </div>
      <div className="logo">
        <div className="row">
          <div className="col-md-12">
            <div className="log">
              <img src={logoImage} className="img-fluid" />
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
                <p>Enter the OTP sent to {myNumber}</p>
                <div className="welcome-form">
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
                        isDisabled={resentActive === 0 ? true : false}
                      />
                      {errors.otp && (
                        <div
                          className="err"
                          style={{ marginTop: '10px !important' }}
                        >
                          {errors.otp}
                        </div>
                      )}
                    </div>
                    {resentActive && resentActive !== 0 ? (
                      <div className="col-md-12 frmss mb-2">
                        <label for="checkbox">
                          Code expires in{' '}
                          {resentActive === 60
                            ? '01:00'
                            : resentActive < 10
                            ? '00:' + '0' + resentActive
                            : '00:' + resentActive}
                        </label>
                      </div>
                    ) : null}
                    {resentActive === 0 && (
                      <div className="col-md-12 frmss mb-3">
                        <p className="resend">
                          <a onClick={() => sendOtp()}>Resend OTP</a>{' '}
                        </p>
                      </div>
                    )}

                    <div className="col-md-12 frmss mb-4">
                      <input
                        type="button"
                        className="btn btn1"
                        value="Confirm"
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

export default OTPSigninSent;
