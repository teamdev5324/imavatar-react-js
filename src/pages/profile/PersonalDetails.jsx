import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../../api';
import { decrypt } from '../../crypto';

import MainSubmitButton from '../../components/buttons/MainSubmitButton';
import ProfileInputField from '../../components/profile/ProfileInputField';
import { saveBusinessInfo } from '../../services/profile/businessInfo';
import { profileSelectors } from '../../store/profile';
import { SystemState } from '../../store/storeTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';
import apiCall from '../onboarding/apiCall';

const PersonalDetails = () => {
  // const profileState = useSelector(profileSelectors.getProfileState);
  const navigate = useNavigate();
  const formRef = useRef();

  // const [profile, setProfile] = useState({
  //   firstname: '',
  //   lastName: '',
  //   email: '',
  //   mobile: '',
  //   business: '',
  //   address: '',
  //   pincode: '',
  //   city: '',
  //   state: '',
  //   country: '',
  // });

  const initialValues = {
    firstName: '',
    lastName: '',
    emailID: '',
    mobileNumber: '',
    nameOfBusiness: '',
    addressLine: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  };

  // console.log(JSON.parse(decrypt(localStorage.getItem('userData'))).id);

  const validationSchema = yup.object({
    firstName: yup.string().required("First name can not be empty").matches(/^[A-Za-z]+$/, "Enter valid first name"),
    lastName: yup.string().required("Last name can not be empty").matches(/^[A-Za-z]+$/, "Enter valid last name"),
    emailID: yup.string().email('enter valid Email ID').required("Email ID can not be empty"),
    mobileNumber: yup.string().required("Mobile number can not be empty").matches(/^[789]\d{9}$/, 'enter valid mobile number').min(10, 'enter valid mobile number').max(10, 'enter valid mobile number'),
    nameOfBusiness: yup.string().required("Name of business can not be empty").matches(/^[\w ]*[^\W_][\w ]*$/, "Enter valid name of business"),
    addressLine: yup.string().required("Address line can not be empty").matches(/^[\w ]*[^\W_][\w ]*$/, "Enter valid address line"),
    pincode: yup.string().required("Pincode can not be empty").min(6, 'enter valid pincode').max(6, 'enter valid pincode').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'enter valid pincode'),
    city: yup.string().required("City can not be empty").matches(/^[a-zA-Z ]*$/, "Enter valid city"),
    state: yup.string().required("State can not be empty").matches(/^[a-zA-Z ]*$/, "Enter valid state"),
    country: yup.string().required("Country can not be empty").matches(/^[a-zA-Z ]*$/, "Enter valid country"),
  });

  const { values, errors, handleChange, handleSubmit, setFieldError, setFieldValue, handleBlur, touched } = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: true,
    innerRef: formRef,
    enableReinitialize: true,
    // validateOnMount: true,
    onSubmit: async () => {
      const _data = JSON.stringify({
        addressLine: values.addressLine,
        businessDisplayName: values.nameOfBusiness,
        city: values.city,
        cityCode: "CBS",
        country: values.country,
        countryCode: "IN",
        pincode: values.pincode,
        state: values.state,
        stateCode: "JH",
      });

      const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      };

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/partner/profile/businessInfo',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: _data
      };

      const { data } = await axios(config);

      if (data.status === 'SUCCESS') {
        toast.success('Data saved successfully', {
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

      console.log(data);
    }
  });

  // const dispatch =
  //   useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  // useEffect(() => {
  //   values.firstName = profileState.user.firstName;
  //   values.lastName = profileState.user.lastName;
  //   values.emailID = profileState.user.emailId;
  //   values.mobileNumber = profileState.user.phoneNumber;
  //   values.addressLine = profileState.businessInfo.addressLine;
  //   values.state = profileState.businessInfo.state;
  //   values.city = profileState.businessInfo.city;
  //   values.pincode = profileState.businessInfo.pincode;
  //   values.country = profileState.businessInfo.country;
  //   values.nameOfBusiness = profileState.businessInfo.businessName;
  // }, [profileState]);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setProfile((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const PincodeApi = async () => {
    if (values.pincode && values.pincode.toString().split('').length === 6) {

      let { data } = await axios.get(`https://api.postalpincode.in/pincode/${values.pincode}`);

      if (data[0].Message === 'No records found') {
        setFieldError('pincode', 'Enter valid pincode');
      } else {
        data = data[0].PostOffice[0];
        setFieldError('pincode', undefined);
      };

      setFieldValue('country', data.Country);
      setFieldValue('city', data.Block.split(' ')[0]);
      setFieldValue('state', data.State);
    };
  }

  useEffect(() => {
    PincodeApi();
  }, [values.pincode])

  const submitHandler = () => {
    const params = {
      addressLine: values.addressLine,
      businessDisplayName: values.nameOfBusiness,
      city: values.city,
      country: values.country,
      pincode: values.pincode,
      state: values.state,
    };
    // dispatch(saveBusinessInfo(params, navigate));
  };

  useEffect(() => {
    const userData = JSON.parse(decrypt(localStorage.getItem('userData')));
    console.log(userData);
    setFieldValue('firstName', userData.firstName);
    setFieldValue('lastName', userData.lastName);
    setFieldValue('emailID', userData.emailId);
    setFieldValue('mobileNumber', userData.phoneNumber);

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://18.234.206.45:8085/api/v1/partner/profile',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    };

    axios(config)
      .then(function (res) {
        res = res.data;
        // console.log(res);
        if (res.status === 'SUCCESS') {
          sessionStorage.setItem('profileData', JSON.stringify(res.results));
          const businessInfo = res.results.businessInfo;
          console.log(businessInfo);
          setFieldValue('addressLine', businessInfo.addressLine);
          setFieldValue('pincode', businessInfo.pincode);
          setFieldValue('city', businessInfo.city);
          setFieldValue('state', businessInfo.state);
          setFieldValue('country', businessInfo.country);
          setFieldValue('country', businessInfo.country);
          setFieldValue('nameOfBusiness', businessInfo.businessName);
        } else {
          toast.error("Can not get profile info", {
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
        toast.error("Can not get profile info", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
      });

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
        item.style.background = 'rgb(247 247 247)';
      }
    })
  };

  const enable = () => {
    const input = document.querySelectorAll('input');
    input.forEach(item => {
      if (item.type !== 'button' && item.type !== 'submit') {
        item.removeAttribute('disabled');
        item.style.background = '#fff';
      }
    })
  };

  useEffect(() => {
    disable();
  }, []);

  return (
    <div className="panel_form">
      <h3 className="col-md-12">Personal Details</h3>
      <div className='form'>
        <ProfileInputField
          label="First Name"
          name="firstname"
          placeholder="First name"
          type="text"
          colClass="col-md-6"
          value={values.firstName}
          onChange={handleChange('firstName')}
          error={touched.firstName && errors.firstName ? errors.firstName : null}
          onFocus={() => touched.firstName = true}
        />

        <ProfileInputField
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          type="text"
          colClass="col-md-6"
          value={values.lastName}
          error={touched.lastName && errors.lastName ? errors.lastName : null}
          onChange={handleChange('lastName')}
          onFocus={() => touched.lastName = true}
        />
        <ProfileInputField
          label="Email ID"
          name="email"
          placeholder="Email"
          type="email"
          colClass="col-md-6"
          value={values.emailID}
          error={touched.emailID && errors.emailID ? errors.emailID : null}
          // onChange={handleChange('emailID')}
          onFocus={() => touched.emailID = true}
        />
        <ProfileInputField
          label="Mobile"
          name="mobile"
          placeholder="Phone number"
          type="number"
          colClass="col-md-6"
          value={values.mobileNumber}
          error={touched.mobileNumber && errors.mobileNumber ? errors.mobileNumber : null}
          // onChange={handleChange('mobileNumber')}
          onFocus={() => touched.mobileNumber = true}
        />
        <ProfileInputField
          label="Name of Business"
          name="business"
          mainClass="formt"
          placeholder="Name Of Business"
          type="text"
          colClass="col-md-12"
          value={values.nameOfBusiness}
          error={touched.nameOfBusiness && errors.nameOfBusiness ? errors.nameOfBusiness : null}
          onChange={handleChange('nameOfBusiness')}
          onFocus={() => touched.nameOfBusiness = true}
        />

        <div className="col-md-12 frmses">
          <h5 className="busrder">Business Address</h5>
        </div>

        <ProfileInputField
          label="Address line"
          name="address"
          placeholder="23-B, BAC building Mumbai - 400001"
          type="text"
          colClass="col-md-6"
          value={values.addressLine}
          error={touched.addressLine && errors.addressLine ? errors.addressLine : null}
          onChange={handleChange('addressLine')}
          onFocus={() => touched.addressLine = true}
        />

        <ProfileInputField
          label="Pincode"
          name="pincode"
          placeholder="110094"
          type="number"
          colClass="col-md-3"
          value={values.pincode}
          error={touched.pincode && errors.pincode ? errors.pincode : null}
          onChange={handleChange('pincode')}
          onFocus={() => touched.pincode = true}
        />
        <ProfileInputField
          label="City"
          name="city"
          placeholder="Mumbai"
          type="text"
          colClass="col-md-3"
          value={values.city}
          error={touched.city && errors.city ? errors.city : null}
          onChange={handleChange('city')}
          onFocus={() => touched.city = true}
        />
        <ProfileInputField
          label="State"
          name="state"
          placeholder="Maharashtra"
          type="text"
          colClass="col-md-6"
          value={values.state}
          error={touched.state && errors.state ? errors.state : null}
          onChange={handleChange('state')}
          onFocus={() => touched.state = true}
        />
        <ProfileInputField
          label="Country"
          name="country"
          placeholder="India"
          type="text"
          colClass="col-md-6"
          value={values.country}
          error={touched.country && errors.country ? errors.country : null}
          onChange={handleChange('country')}
          onFocus={() => touched.country = true}
        />

        <div className="col-md-6 frmses fmsbtn">

          <input
            type="submit"
            name=""
            className='edit'
            value='Edit'
            style={{ width: 'fit-content' }}
            onClick={() => enable()}
          />
          <input
            type="submit"
            name=""
            className='edit'
            value='Save'
            style={{ width: 'fit-content' }}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
