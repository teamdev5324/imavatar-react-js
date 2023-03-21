import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import MainSubmitButton from '../../components/buttons/MainSubmitButton';
import { saveGstinDetails } from '../../services/profile/gstinData';
import { profileSelectors } from '../../store/profile';
import { SystemState } from '../../store/storeTypes';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiCall from '../onboarding/apiCall';

const GstinDetails = () => {
  // const profileState = useSelector(profileSelectors.getProfileState);

  const [gstin, setGstin] = useState({
    gstin: '',
    gstinemail: '',
    gstinmobileNumber: '',
    pan: '',
    registeredBusinessName: '',
  });

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setGstin((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const dispatch =
  // useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  // useEffect(() => {
  //   setGstin((prevState) => ({
  //     ...prevState,
  //     registeredBusinessName: profileState.businessInfo.businessName,
  //     gstin: profileState.gst.gstinNumber,
  //     gstinemail: profileState.gst.email,
  //     gstinmobileNumber: profileState.gst.mobile,
  //     pan: profileState.gst.panNumber,
  //   }));
  // }, [profileState]);

  const navigate = useNavigate();

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const params = {
      gstin: gstin.gstin,
      gstinemail: gstin.gstinemail,
      gstinmobileNumber: gstin.gstinmobileNumber,
      pan: gstin.pan,
      registeredBusinessName: gstin.registeredBusinessName,
    };

    // dispatch(saveGstinDetails(params, navigate));
  };

  const initialValues = {
    gstin: '',
    gstinMobile: '',
    gstinEmail: '',
    pan: '',
  };

  const validationSchema = yup.object({
    gstin: yup.string().required("GSTIN Number can not be empty").min(15, "Enter valid GSTIN Number").max(15, "Enter valid GSTIN Number").matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Enter valid GSTIN Number"),
    gstinMobile: yup.string().required("GSTIN Mobile number can not be empty").matches(/^[789]\d{9}$/, 'enter valid GSTIN Mobile number').min(10, 'enter valid GSTIN Mobile number').max(10, 'enter valid GSTIN Mobile number'),
    gstinEmail: yup.string().email('Enter valid GSTIN Email').required("GSTIN Email can not be empty"),
    pan: yup.string().required("PAN can not be empty").min(10, 'Enter valid PAN').max(10, 'Enter valid PAN').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Enter valid PAN'),
  })

  const { values, errors, setFieldValue, handleChange, handleSubmit, setFieldError, touched } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: () => {
      const data = JSON.stringify({
        "gstin": values.gstin,
        "gstinemail": values.gstinEmail,
        "gstinmobileNumber": values.gstinMobile,
        "pan": values.pan,
        "registeredBusinessName": "web"
      });

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/profile/gst',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(async function (res) {
          if (res.data.status === 'SUCCESS') {
            toast.success('GSTN details saved successfully', {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            disable();
            await apiCall();
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
  });

  useEffect(() => {
    const profileData = JSON.parse(sessionStorage.getItem('profileData'));
    const gstin = profileData.gst;
    console.log(gstin);
    setFieldValue('gstin', gstin.gstinNumber);
    setFieldValue('gstinEmail', gstin.email);
    setFieldValue('gstinMobile', gstin.mobile);
    setFieldValue('pan', gstin.panNumber);
    // setFieldValue('gstin', gstin.gstinNumber);
  }, []);

  useEffect(() => {
    Object.keys(values).forEach(item => {
      if (errors[item]) {
        if (values[item] !== '' && errors[item].search('can not be empty') !== -1) {
          setFieldError(item, null);
        }
      }
    })
  }, [values]);

  const disable = () => {
    const input = document.querySelectorAll('input');
    input.forEach(item => {
      if (item.type !== 'button' && item.type !== 'submit') {
        item.disabled = 'disabled';
      }
    })
  };

  const enable = () => {
    const input = document.querySelectorAll('input');
    input.forEach(item => {
      if (item.type !== 'button' && item.type !== 'submit') {
        item.removeAttribute('disabled');
      }
    })
  };

  useEffect(() => {
    disable();
  }, []);

  return (
    <div className="panel_form">
      <h3 className="col-md-12">GSTN Details </h3>
      <div>
        <div className="col-md-6 frmses form-group row">
          <label>GSTIN Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="27ABCDE1234F5GH"
            name="gstin"
            value={values.gstin}
            onChange={handleChange('gstin')}
            onFocus={() => touched.gstin = true}
          />
          {errors.gstin && touched.gstin && (<div className='error'>{errors.gstin}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label>GSTIN Mobile Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="91 - 8789011111"
            name="gstinmobileNumber"
            value={values.gstinMobile}
            onChange={handleChange('gstinMobile')}
            onFocus={() => touched.gstinMobile = true}
          />
          {errors.gstinMobile && touched.gstinMobile && (<div className='error'>{errors.gstinMobile}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label>GSTIN Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="prashantnthakare@gmail.com"
            name="gstinemail"
            value={values.gstinEmail}
            onChange={handleChange('gstinEmail')}
            onFocus={() => touched.gstinEmail = true}
          />
          {errors.gstinEmail && touched.gstinEmail && (<div className='error'>{errors.gstinEmail}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label>Permanent Account Number (PAN)</label>
          <input
            type="text"
            className="form-control"
            placeholder="AVHPI7820T"
            name="pan"
            value={values.pan}
            onChange={handleChange('pan')}
            onFocus={() => touched.pan = true}
          />
          {errors.pan && touched.pan && (<div className='error'>{errors.pan}</div>)}
        </div>

        <div className="col-md-6 frmses form-group row fmsbtn">
          <input
            type="submit"
            className='edit'
            value='Edit'
            style={{ width: 'fit-content' }}
            onClick={() => enable()}
          />
          <input
            type="submit"
            className='edit'
            value='save'
            style={{ width: 'fit-content' }}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default GstinDetails;
