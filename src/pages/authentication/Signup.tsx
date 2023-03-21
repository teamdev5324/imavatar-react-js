import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  callIcon,
  hide,
  lockIcon,
  messageIcon,
  signImage,
  userIcon,
  show,
} from '../../constants/imageConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUriConstants';
import AuthWrapper from './AuthWrapper';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { SystemState } from '../../store/storeTypes';
import { AnyAction } from 'redux';
import { signupPartner } from '../../services/auth/signupPartner';
import { encryptPassword } from './helper/encryption';
import { successMessage } from '../../utils/toast';
import { increaseCounter } from '../../services/counter/increaseCounter';
import { useSelector } from 'react-redux';
import { signupSelectors } from '../../store/auth/signup';
import api from '../../api';
import { encrypt, decrypt } from '../../crypto';
import { toast } from 'react-toastify';

type SignupValidation = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
};

const phoneRegExp = /^[789]\d{9}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schema = yup
  .object()
  .shape({
    email: yup.string().email('Enter valid email').required('Email ID cannot be empty'),
    password: yup
      .string()
      .required('Password is a required field')
      .matches(
        passwordRegExp,
        `Your password must have:
 - Between 9-16 characters
 - Uppercase characters A-Z
 - Lowercase characters a-z
  - Numbers (0-9)
 - Special characters ! @ # $ % & ^ ( ) _ - + =; : ? / , .`
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password and confirm password do not match'),
    firstName: yup.string().required("First name can not be empty").matches(/^[A-Za-z]+$/, "Enter valid first name"),
    lastName: yup.string().required("Last name can not be empty").matches(/^[A-Za-z]+$/, "Enter valid Last name"),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number must be valid')
      .length(10, 'Please provide valid number'),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValidation>({
    resolver: yupResolver(schema),
  });

  // const dispatch =
  //   useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  return (
    <AuthWrapper>
      <div className="welcome">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="welcome-left">
                <img src={signImage} className="img-fluid" alt="title" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="welcome-left">
                <h2
                  onClick={() => {
                    alert('Hellow New');
                    successMessage('Welcome to ImAvatar');
                  }}
                >
                  Welcome to ImAvatar
                </h2>
                <p>
                  We are all connected by a higher power that runs through the
                  fabric of our lives. As we each seek the divine in and around
                  us, you providing the spiritual and religious goods will help
                  many to seek the divine energy.
                </p>
                <p>
                  Thank you for your interest in partnering with us. Please fill
                  in a few details below to get started.
                </p>
                <div className="welcome-form">
                  <form
                    onSubmit={handleSubmit(async (d) => {
                      const params = {
                        active: 'true',
                        email: d.email,
                        firstName: d.firstName,
                        lastName: d.lastName,
                        password: d.password,
                        phoneNumber: d.phone,
                        userType: 'partner',
                      };
                      // dispatch(signupPartner(params, navigate));
                      const { data } = await api.post('/user/noAuth/addUser', params);
                      console.log(data);
                      if (data.statusMessage === 'User already exists with this email' || data.statusMessage === 'User already exists with this phone number') {
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
                      } else if (data.statusCode == 200) {
                        // alert('Account created successfully');
                        localStorage.setItem('userData', encrypt(JSON.stringify(data.data)));
                        navigate('/mobileotp');
                      } else {
                        toast.error(data.statusMessage, {
                          position: "top-right",
                          autoClose: 3500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }
                    })}
                  >
                    <div className="col-md-12 frmss">
                      <img
                        src={userIcon}
                        className="img-fluid"
                        alt="user icon"
                      />
                      <input
                        type="text"
                        className="form-control form-padding"
                        placeholder="First Name *"
                        {...register('firstName')}
                      />
                      {errors.firstName && (
                        <p className="error">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="col-md-12 frmss">
                      <img
                        src={userIcon}
                        className="img-fluid"
                        alt="user icon"
                      />
                      <input
                        type="text"
                        className="form-control form-padding"
                        placeholder="Last Name *"
                        {...register('lastName')}
                      />
                      {errors.lastName && (
                        <p className="error">{errors.lastName.message}</p>
                      )}
                    </div>
                    <div className="col-md-12 frmss">
                      <img
                        src={messageIcon}
                        className="img-fluid"
                        alt="mail icon"
                      />
                      <input
                        type="mail"
                        className="form-control form-padding"
                        placeholder="Email *"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="error">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="col-md-12 frmss">
                      <img
                        src={callIcon}
                        className="img-fluid"
                        alt="call icon"
                      />
                      <input
                        type="number"
                        className="form-control form-padding"
                        placeholder="Mobile Number *"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="error">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="col-md-12 frmss">
                      <img
                        src={lockIcon}
                        className="img-fluid"
                        alt="lock icon"
                      />
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
                        <p className="error">{errors.password.message}</p>
                      )}
                    </div>
                    <div className="col-md-12 frmss">
                      <img
                        src={lockIcon}
                        className="img-fluid"
                        alt="lock icon"
                      />
                      <input
                        type={showConfPass ? 'text' : 'password'}
                        className="form-control form-padding"
                        placeholder="Confirm Password *"
                        {...register('confirmPassword')}
                        style={{ paddingRight: 40 }}
                      />
                      <img src={showConfPass ? hide : show} style={{ width: 25, height: 25, opacity: 0.2, cursor: 'pointer', left: 'auto', right: 5, top: 7 }}
                        onClick={() => {
                          if (showConfPass) {
                            setShowConfPass(false);
                          } else {
                            setShowConfPass(true);
                          }
                        }}
                      />
                      {errors.confirmPassword && (
                        <p className="error">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12 frmss">
                      <input type="submit" className="btn" value="SIGN UP" />
                    </div>
                    <div className="col-md-12 orline">
                      <p>Or</p>
                    </div>
                    <div className="col-md-12 frmss">
                      <h6 className="btnlogin">
                        Already have an account?
                        <Link to={ROUTER_URL_CONSTANT.SIGNIN}> Login </Link>
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
  );
};

export default Signup;
