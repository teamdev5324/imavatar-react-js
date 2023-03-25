import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import MainSubmitButton from '../../components/buttons/MainSubmitButton';
import { API_URL_CONSTANTS } from '../../constants/apiUrlConstant';
import { postReqParamheader, putReqParamHeader } from '../../services/apiCall';
import { profileSelectors } from '../../store/profile';
import { GET_PROFILE } from '../../store/profile/actionTypes';
import { SystemState } from '../../store/storeTypes';
import { errorMessage, successMessage } from '../../utils/toast';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { decrypt } from '../../crypto';
import axios from 'axios';
import { toast } from 'react-toastify';

const Notification = () => {
  const profileState = useSelector(profileSelectors.getProfileState);

  const [number, setNumber] = useState('');
  const [activenumber, setActiveNumber] = useState(false);
  const [receiveNotification, setReceiveNotification] = useState(false);

  // const dispatch =
  //   useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  useEffect(() => {
    setActiveNumber(profileState.whatsappInfo?.activateNumber);
    setReceiveNotification(profileState.whatsappInfo?.notify);
    setNumber(profileState.whatsappInfo?.whatsappNumber);

    console.log(profileState.whatsappInfo);
  }, [profileState.whatsappInfo]);

  // const submitHandler = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   const params = {
  //     whatsappNumber: number,
  //     activateNumber: activenumber,
  //     notifyOnWhatsapp: receiveNotification,
  //   };

  //   console.log(params);
  //   putReqParamHeader(API_URL_CONSTANTS.WHATS_APP_INFO, params)
  //     .then((response: any) => {
  //       console.log(response.data);
  //       if (response.data.status === 'SUCCESS') {
  //         successMessage('Info Saved Success');
  //         dispatch({
  //           type: GET_PROFILE,
  //           payload: response.data.results,
  //         });
  //       }
  //     })
  //     .catch((error: any) => {
  //       errorMessage(error.response.data.errors[0].errorMessage);
  //     });
  // };

  const initialValues = {
    whatsappNumber: '',
  };

  const validationSchema = yup.object({
    whatsappNumber: yup.string().required("Whatsapp number can not be empty").matches(/^[0-9]{9,18}$/, 'enter valid whatsapp number').min(10, 'enter valid whatsapp number').max(10, 'enter valid whatsapp number'),
  });

  const { values, handleChange, errors, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: () => {
      var data = JSON.stringify({
        "activateNumber": activenumber,
        "notifyOnWhatsapp": receiveNotification,
        "whatsappNumber": values.whatsappNumber
      });

      var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/profile/whatsappInfo',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (res) {
          res = res;
          if (res.data.status === 'SUCCESS') {
            toast.success('Subscribed successfully', {
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
        });

    }
  });

  // const callApi = (val) => {
  //   var data = JSON.stringify({
  //     "activateNumber": true,
  //     "notifyOnWhatsapp": true,
  //     "whatsappNumber": val
  //   });

  //   var config = {
  //     method: 'put',
  //     maxBodyLength: Infinity,
  //     url: 'http://18.234.206.45:8085/api/v1/partner/profile/whatsappInfo',
  //     headers: {
  //       'Authorization': 'Bearer ' + props.userDetails.login_token,
  //       'Content-Type': 'application/json'
  //     },
  //     data: data
  //   };

  //   axios(config)
  //     .then(function (res) {
  //       res = res;
  //       if (res.data.status === 'SUCCESS') {
  //         alert('Subscribed successfully');
  //       } else {
  //         toast.error('Something went wrong');
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // console.log(JSON.parse(decrypt(localStorage.getItem('userData'))));


  useEffect(() => {
    if (receiveNotification) {
      setFieldValue('whatsappNumber', JSON.parse(decrypt(localStorage.getItem('userData'))).phoneNumber);
    } else {
      setFieldValue('whatsappNumber', '')
    }
  }, [receiveNotification])

  return (
    <div className="panel_form">
      <h3 className="col-md-12">Whatsapp Notification</h3>
      <div className='form'>
        <div className="col-md-6 frmses form-group row whanot">
          <h6 style={{ width: 'fit-content' }}>
            Receive notifications on WhatsApp
          </h6>

          <input
            type="checkbox"
            id="cb1"
            checked={receiveNotification}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.checked);
              setReceiveNotification(e.target.checked);
            }}
          />
          <label htmlFor="cb1"></label>
        </div>

        <div className="col-md-6 frmses form-group row whanot">
          <h6 style={{ width: 'fit-content' }}>
            WhatsApp No. same as registered number
          </h6>
          <input
            type="checkbox"
            id="cb2"
            checked={activenumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.checked);
              setReceiveNotification(e.target.checked);
            }}
          />
          <label htmlFor="cb2"></label>
        </div>

        <div className="col-md-6 frmses form-group row whanot1">
          <input
            type="number"
            className="form-control"
            value={values.whatsappNumber}
            onChange={handleChange('whatsappNumber')}
            placeholder="11100000"
            onFocus={() => (touched.whatsappNumber = true)}
          />
          {errors.whatsappNumber && touched.whatsappNumber && (<div className='error'>{errors.whatsappNumber}</div>)}
        </div>

        <div className="col-md-6 frmses form-group row fmsbtn">
          <input
            type="submit"
            className='edit3'
            value='Subscribe'
            style={{ width: 'fit-content' }}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
