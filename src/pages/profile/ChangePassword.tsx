import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import MainSubmitButton from '../../components/buttons/MainSubmitButton';
import { changePassword } from '../../services/profile/changePassword';
import { profileSelectors } from '../../store/profile';
import { SystemState } from '../../store/storeTypes';
import * as yup from 'yup';
import { encryptPassword } from '../authentication/helper/encryption';
import axios from 'axios';
import { toast } from 'react-toastify';
import { decrypt } from '../../crypto';
import apiCall from '../onboarding/apiCall';
import { hide, show } from '../../constants/imageConstants';

type PasswordValidation = {
  newPassword: string;
  confirmPassword: string;
};

const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schema = yup
  .object()
  .shape({
    newPassword: yup
      .string()
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
      .oneOf([yup.ref('newPassword')], 'Password and confirm password do not match'),
  })
  .required();

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordValidation>({
    resolver: yupResolver(schema),
  });
  const profileState = useSelector(profileSelectors.getProfileState);
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    newPassword: '',
    oldPassword: '',
    userId: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setPassword((prevState) => ({
      ...prevState,
      userId: profileState.user.id,
    }));
  }, [profileState]);

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const params = {
      newPassword: encryptPassword(password.newPassword, 'imavatar'),
      oldPassword: encryptPassword(password.oldPassword, 'imavatar'),
      userId: password.userId,
    };

    // dispatch(changePassword(params, navigate));
  };

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);

  return (
    <div className="panel_form">
      <h3 className="col-md-12">Change Password</h3>
      <form
        onSubmit={handleSubmit((d) => {
          const params = {
            userId: JSON.parse(decrypt(localStorage.getItem('userData'))).id,
            newPassword: d.newPassword,
            oldPassword: password.oldPassword,
          };
          var data = params;

          console.log(data);


          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://35.170.79.161:8080/api/user/noAuth/userPwdChange',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios(config)
            .then(async function (res) {
              if (res.data.status === 'SUCCESS' && res.data.statusMessage !== 'Please enter correct old password.') {
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
                await apiCall();
              } else {
                toast.error('Wrong current Password', {
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
            });
          // dispatch(changePassword(params, navigate));
        })}
      >
        <div className="col-md-6 frmses form-group row">
          <label>Current Password</label>
          <div style={{ display: 'flex' }}>
            <input
              type={showPass ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter your current password"
              name="oldPassword"
              value={password.oldPassword}
              onChange={handleChange}
              style={{ width: 300 }}
            />
            <img src={showPass ? hide : show} style={{ width: 25, height: 25, opacity: 0.2, cursor: 'pointer', marginLeft: 5, marginTop: 7 }}
              onClick={() => {
                if (showPass) {
                  setShowPass(false);
                } else {
                  setShowPass(true);
                }
              }}
            />

          </div>
        </div>

        <div className="col-md-6 frmses form-group row">
          <label>New Password</label>
          <div style={{ display: 'flex' }}>
            <input
              type={showPass2 ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter your new password"
              {...register('newPassword')}
              value={password.newPassword}
              onChange={handleChange}
              style={{ width: 300 }}
            />
            <img src={showPass2 ? hide : show} style={{ width: 25, height: 25, opacity: 0.2, cursor: 'pointer', marginLeft: 5, marginTop: 7 }}
              onClick={() => {
                if (showPass2) {
                  setShowPass2(false);
                } else {
                  setShowPass2(true);
                }
              }}
            />
          </div>
          {errors.newPassword && (
            <p className="error">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="col-md-6 frmses form-group row chrct">
          <label>Make your password Strong by adding</label>
          <p>Between 9-16 characters</p>
          <ul>
            <li>1 Capital letter (A-Z) </li>
            <li>1 Special Character (@#$%!^&*) </li>
            <li>1 Number </li>
          </ul>
        </div>

        <div className="col-md-6 frmses form-group row">
          <label>Re-type New Password</label>
          <div style={{ display: 'flex' }}>
            <input
              type={showPass3 ? 'text' : 'password'}
              className="form-control"
              {...register('confirmPassword')}
              placeholder="Enter your new password"
              style={{ width: 300 }}
            />
            <img src={showPass3 ? hide : show} style={{ width: 25, height: 25, opacity: 0.2, cursor: 'pointer', marginLeft: 5, marginTop: 7 }}
              onClick={() => {
                if (showPass3) {
                  setShowPass3(false);
                } else {
                  setShowPass3(true);
                }
              }}
            />
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="col-md-6 frmses form-group row fmsbtn">
          <MainSubmitButton className="edit3" title="Change Password" />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
