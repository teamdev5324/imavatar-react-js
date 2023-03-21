import React, { useEffect, useState } from 'react';
import {
  downFlower,
  logoImage,
  upFlower,
} from '../../constants/imageConstants';
import { Link, useNavigate } from 'react-router-dom';
import MainLinkButton from '../../components/buttons/MainLinkButton';
import { decrypt, encrypt } from '../../crypto';
import api from '../../api';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import axios from 'axios';

const MobileVerify = () => {
  const [otp, setOtp] = useState(null);
  const [resend, setResend] = useState(false);
  const [resentActive, setResentActive] = useState(null);
  const [userId, setUserId] = useState(null);
  const [myNumber, setMyNumber] = useState(null);
  const [change, setChange] = useState(false);
  const [newMobileNumber, setNewMobileNumber] = useState(null);

  const handleChange = (value) => {
    setOtp(value);
  };

  // const dispatch =
  // useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setResentActive((timer) => (timer > 0 ? timer - 1 : timer));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (resentActive === 0) {
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
      setOtp(null);
    }
  }, [resentActive]);

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

    api.post('http://35.170.79.161:8080/api/user/MP/noAuth/sendOTP/phoneVerification', params)
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

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      sendOtp();
      const num = JSON.parse(decrypt(localStorage.getItem('userData'))).phoneNumber.split('');
      setMyNumber('*******' + num[7] + num[8] + num[9])
    } else {
      window.location.assign('/signin');
    }
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

            if (newMobileNumber.split('').length === 10 && newMobileNumber.match(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)) {

              const res__ = await axios.get('http://35.170.79.161:8080/api/user/MP/noAuth/userExists/' + newMobileNumber)

              console.log(res__.data.status);

              if (res__.data.status === 'SUCCESS') {
                toast.error('User already exists with this mobile number', {
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
                  // "email": newMobileNumber,
                  "phoneNumber": newMobileNumber,
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
                      toast.success('Mobile number changed successfully', {
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

            } else {
              toast.error('Enter valid mobile number', {
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
          }}>
            <span>New Mobile Number</span>
            <input type='number' placeholder='Your new mobile number' className='form-control' required
              onChange={text => {
                text = text.currentTarget.value;
                setNewMobileNumber(text);
              }}
              value={newMobileNumber}
            />
            <input type='submit' className='edit' />
          </form>
        </>
      )}
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
              <Link to="/">
                <img src={logoImage} className="img-fluid" alt="Brand Logo" />{' '}
              </Link>
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
                <h2>Mobile Number Verification</h2>
                <p>
                  OTP sent to +91 {myNumber} <a onClick={() => setChange(true)}>Change</a>
                </p>
                <div className="welcome-form">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // dispatch(partnerMobileVerify(otp, navigate));
                      const { data } = await api.get(`/user/userVerification/phone/${otp}/${userId}`);
                      console.log(data);
                      if (data.statusCode == 200) {
                        // alert('OTP verified successfully');
                        axios.get('http://35.170.79.161:8080/api/user/noAuth/getUserInfo/' + JSON.parse(decrypt(localStorage.getItem('userData'))).id)
                          .then(async res => {
                            localStorage.setItem('userData', encrypt(JSON.stringify(res.data.data)));
                            const data = JSON.stringify({
                              "phoneVerified": true,
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

                            navigate('/mobileverified');
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
                      }
                    }}
                  >
                    <div className="col-md-12 frmss">
                      <OTPInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={4}
                        className="frmotp otp-input"
                        separator={<span style={{ width: '10px' }} />}
                        isInputNum={true}
                        containerStyle={{
                          justifyContent: 'center',
                        }}
                        isDisabled={resentActive === 0 ? true : false}
                      />
                    </div>
                    {resentActive && resentActive !== 0 ? (
                      <div className="col-md-12 frmss mb-2">
                        <label htmlFor="checkbox">
                          Code expires in {resentActive === 60 ? ('01:00') : ('00:' + (resentActive < 10 ? '0' + resentActive : resentActive))}
                        </label>
                      </div>
                    ) : null}
                    {resentActive === 0 && (
                      <div className="col-md-12 frmss mb-3">
                        <p className="resend">
                          <a onClick={sendOtp}>Resend OTP</a>
                        </p>
                      </div>
                    )}

                    <MainLinkButton title="Confirm" />
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

export default MobileVerify;
