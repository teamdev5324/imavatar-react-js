import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  lockIcon,
  messageIcon,
  signImage,
  show,
  hide
} from '../../constants/imageConstants';
import AuthWrapper from './AuthWrapper';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import MainLinkButton from '../../components/buttons/MainLinkButton';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../api';
import { encrypt } from '../../crypto';
import { toast } from 'react-toastify';
import axios from 'axios';
import apiCall from '../onboarding/apiCall';

type Login = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().required().test('email_or_phone', 'Enter valid Email ID or Phone Number', (value) => {
    return validateEmail(value) || validatePhone(value);
  }),
  password: yup.string().required('Password can not be empty'),
})

const validateEmail = (email) => {
  return yup.string().email().isValidSync(email);
};

const validatePhone = (phone) => {
  return yup.string().required().matches(/^[789]\d{9}$/).min(10).max(10).isValidSync(phone);
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Login>({
    resolver: yupResolver(schema),
  });

  const [keepSignin, setKeepSignin] = useState(false);

  // const dispatch =
  //   useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  const navigate = useNavigate();

  const apiRequest = async (params) => {
    const { data } = await api.post('/user/MP/noAuth/login', params)
    console.log(data);
    if (data.status === 'SUCCESS') {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/user/auth/getUserInfo',
        headers: {
          'Authorization': 'Bearer ' + data.data.token,
        },
      };

      let { data: userData } = await api(config);
      userData = userData.data;
      console.log(userData);

      localStorage.setItem('token', data.data.token);
      // localStorage.setItem('userData', encrypt(JSON.stringify(userData)));

      console.log(data);

      axios.get('http://35.170.79.161:8080/api/user/noAuth/getUserInfo/' + userData.id)
        .then(async res => {
          console.log(res.data.data);
          localStorage.setItem('userData', encrypt(JSON.stringify(res.data.data)));
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
        })

      // navigate('/onboarding/details');

    } else if (data.statusMessage === 'Invalid password to  login') {
      console.log(data);

      toast.error('Email or password is wrong', {
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
    else {
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
  };

  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <AuthWrapper>
        <div className="welcome">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="welcome-left">
                  <img src={signImage} className="img-fluid" alt="Title Icon" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="login-left">
                  <h2>
                    Welcome Back
                    <span className="d-block"> Sign in to Continue </span>
                  </h2>
                  <p>Use your registered Email ID or Mobile Number</p>
                  <div className="welcome-form">
                    <form
                      onSubmit={handleSubmit((d) => {
                        const params = {
                          userName: d.email,
                          password: d.password,
                          userType: '6',
                        };
                        apiRequest(params);
                      })}
                    >
                      <div className="col-md-12 frmss">
                        <img
                          src={messageIcon}
                          className="img-fluid"
                          alt="icon"
                        />
                        <input
                          type="text"
                          className="form-control form-padding"
                          placeholder="Email/Mobile number *"
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="error" style={{ textAlign: 'left' }}>{errors.email.message}</p>
                        )}
                      </div>

                      <div className="col-md-12 frmss">
                        <img src={lockIcon} className="img-fluid" alt="icon" />
                        <input
                          type={showPass ? 'text' : 'password'}
                          className="form-control form-padding"
                          placeholder="Password *"
                          {...register('password')}
                          style={{ paddingRight: 40 }}
                        />
                        <img src={showPass ? hide : show} style={{ width: 25, height: 25, opacity: 0.2, cursor: 'pointer', left: 'auto', right: 5, top: 7 }}
                          onClick={() => {
                            if (showPass) {
                              setShowPass(false);
                            } else {
                              setShowPass(true);
                            }
                          }}
                        />
                        {errors.password && (
                          <p className="error" style={{ textAlign: 'left' }}>{errors.password.message}</p>
                        )}
                      </div>

                      <div className="col-md-12 frmss">
                        <p className="forget">
                          <Link to="/forgot-password">Forgot Password?</Link>
                        </p>
                      </div>

                      <div className="col-md-12 frmss mb-2">
                        <input
                          id="checkbox"
                          type="checkbox"
                          style={{ marginRight: '5px', cursor: 'pointer' }}
                          onChange={(e) => setKeepSignin(e.target.checked)}
                        />
                        <label htmlFor="checkbox">
                          Keep me signed in.{' '}
                          <Link
                            to="#"
                            title="Choosing ‘Keep me signed in’  checkbox, reduces the number of times you are asked to sign in. We recommend to use this option when you are working on personal device."
                          >
                            Details
                          </Link>
                        </label>
                      </div>
                      <div className="col-md-12 frmss mb-3">
                        <Link to='/otp-signin'>
                          <label htmlFor="checkbox" style={{ color: '#ff6658', cursor: 'pointer' }}>Sign In with OTP</label>
                        </Link>
                      </div>

                      <MainLinkButton
                        isActive={
                          !errors.email?.message && !errors.password?.message
                        }
                        title="Enter"
                      />

                      <div className="col-md-12 frmss">
                        <h6 className="btnlogin1">
                          Don't have an account yet?
                          <Link to={ROUTER_URL_CONSTANT.SIGNUP}> Sign Up </Link>
                        </h6>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default Signin;
