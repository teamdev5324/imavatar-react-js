import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../../api';
import { decrypt } from '../../crypto';
import ProfileInputField from '../../components/profile/ProfileInputField';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logoImage, inactive_bg_, active_bg_ } from '../../constants/imageConstants';
import apiCall from './apiCall';
import { Link } from 'react-router-dom';

const OnboardingDetails = () => {

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

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

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
                stateCode: "GJ",
            });

            const headers = {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            };

            const config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://18.234.206.45:8085/api/v1/partner/profile/businessInfo',
                headers,
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
                await apiCall();
                navigate('/onboarding/bank-details');
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
    }, []);

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

    useEffect(() => {
        const label = document.querySelectorAll('label');
        for (let i = 0; i < 4; i++) {
            label[i].style.color = '#939393';
            label[i].innerHTML += '<span style="margin-left: 3px;">*</span>';
        };
        for (let i = 4; i < label.length; i++) {
            label[i].innerHTML += '<span style="margin-left: 3px; color: #FF0404">*</span>';
        };
    }, []);


    return (<div className='onboarding details container'>
        <img src={logoImage} className='logo' />
        <div className='navs'>
            <Link to='/onboarding/details'>
                <div style={{ background: `url(${active_bg_})`, color: '#fff' }}>Personal Details</div>
            </Link>
            <Link to='/onboarding/bank-details'>
                <div style={{ background: `url(${inactive_bg_})` }}>Bank Details</div>
            </Link>
            <Link to='/onboarding/gstin'>
                <div style={{ background: `url(${inactive_bg_})` }}>GSTIN Details</div>
            </Link>
            <Link to='/onboarding/terms'>
                <div style={{ background: `url(${inactive_bg_})` }}>Legal Terms and Policies</div>
            </Link>
        </div>
        <div className="form_">
            <div className='top-text col-12'>
                <span>A bit about you</span>
                <p>Share some information about you.</p>
            </div>
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
                    label="Enter a unique Business Display Name"
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
                <span className='business-name-bottom_'>(This will be displayed to customers on ImAvatar portal)</span>

                <div className="col-md-12">
                    <h5 className="busrder">Business Address <span style={{ color: ' #FF0404' }}>*</span></h5>
                </div>

                {/* <div className='col-md-12'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235014.2579209994!2d72.43965588570215!3d23.02018176300004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1678361059919!5m2!1sen!2sin" style={{ border: 0, width: '100%', height: 250 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div> */}

                <ProfileInputField
                    label="Address line"
                    name="address"
                    placeholder="23-B, BAC building Mumbai - 400001"
                    type="text"
                    colClass="col-md-12"
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
                    colClass="col-md-6"
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
                    colClass="col-md-6"
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

                <div className='col-md-12 sec_'>
                    <div className='left-sec col-md-6'>
                        Need help? <a href='#'>Contact Us</a>
                    </div>

                    <div className="col-md-6 frmses fmsbtn">

                        {/* <input
                        type="submit"
                        name=""
                        className='edit'
                        value='Edit'
                        style={{ width: 'fit-content' }}
                    /> */}
                        <input
                            type="submit"
                            name=""
                            className='edit col-md-12'
                            value='Save & Continue'
                            style={{ width: 'fit-content' }}
                            onClick={() => handleSubmit()}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default OnboardingDetails;