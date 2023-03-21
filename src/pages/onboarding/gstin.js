import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../../api';
import { decrypt } from '../../crypto';
import ProfileInputField from '../../components/profile/ProfileInputField';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logoImage, inactive_bg_, active_bg_ } from '../../constants/imageConstants';
import uid from 'harsh-uid';
import MainSubmitButton from '../../components/buttons/MainSubmitButton';
import { profileSelectors } from '../../store/profile';
import apiCall from './apiCall';

const GSTIN = () => {

    const [gstin, setGstin] = useState({
        gstin: '',
        gstinemail: '',
        gstinmobileNumber: '',
        pan: '',
        registeredBusinessName: '',
    });
    const [navPage, setNavPage] = useState(null);
    const [status, setStatus] = useState(null);

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
        businessName: '',
    };

    const validationSchema = yup.object({
        gstin: yup.string().required("GSTIN Number can not be empty").min(15, "Enter valid GSTIN Number").max(15, "Enter valid GSTIN Number").matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Enter valid GSTIN Number"),
        businessName: yup.string().required("Registered Business Name can not be empty").matches(/^[\w ]*[^\W_][\w ]*$/, "Enter valid business name"),
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
            if (status !== 'WIP') {
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
                            await apiCall();
                            navigate(navPage);
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
            } else {
                toast.error('Can not change GSTIN details during review', {
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
        setFieldValue('businessName', gstin.businessName)
        // setFieldValue('gstin', gstin.gstinNumber);
        setStatus(profileData.verificationStatus);
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
        for (let i = 0; i < label.length; i++) {
            if (i === 0) {
                label[i].style.color = '#000';
                label[i].innerHTML += '<span style="margin-left: 3px; color: #FF0404">*</span>';
            } else {
                label[i].style.color = '#939393';
                label[i].innerHTML += '<span style="margin-left: 3px;">*</span>';
            }
        };
    }, []);

    return (<div className='onboarding bank-details container gstin'>
        <img src={logoImage} className='logo' />
        <div className='navs'>
            <Link to='/onboarding/details'>
                <div style={{ background: `url(${active_bg_})`, color: '#fff' }}>Personal Details</div>
            </Link>
            <Link to='/onboarding/bank-details'>
                <div style={{ background: `url(${active_bg_})`, color: '#fff' }}>Bank Details</div>
            </Link>
            <Link to='/onboarding/gstin'>
                <div style={{ background: `url(${active_bg_})`, color: '#fff' }}>GSTIN Details</div>
            </Link>
            <Link to='/onboarding/terms'>
                <div style={{ background: `url(${inactive_bg_})` }}>Legal Terms and Policies</div>
            </Link>
        </div>
        <div className="form_">
            <div className='top-text col-12'>
                <p>Share your personal bank account information with us.</p>
            </div>
            <div className="form col-md-12 row">
                <div className="col-md-6 frmses form-group row">
                    <label>GSTIN</label>
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
                    <label>Registered Business Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Registered Business Name"
                        name="gstin"
                        value={values.businessName}
                        onChange={handleChange('businessName')}
                        onFocus={() => touched.businessName = true}
                    />
                    {errors.businessName && touched.businessName && (<div className='error'>{errors.businessName}</div>)}
                </div>
                <div className="col-md-6 frmses form-group row">
                    <label>GSTIN Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="8789011111"
                        name="gstinmobileNumber"
                        value={values.gstinMobile}
                        onChange={handleChange('gstinMobile')}
                        onFocus={() => touched.gstinMobile = true}
                    />
                    {errors.gstinMobile && touched.gstinMobile && (<div className='error'>{errors.gstinMobile}</div>)}
                </div>
                <div className="col-md-6 frmses form-group row">
                    <label>GSTIN Email ID</label>
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
                    <label>PAN</label>
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

                <div className='col-md-12 sec_'>
                    <div className='left-sec col-md-6'>
                        Need help? <a href='#'>Contact Us</a>
                    </div>

                    <div className="col-md-6 frmses fmsbtn">

                        <input
                            type="submit"
                            name=""
                            className='edit col-md-6'
                            value='Save & Go Back'
                            style={{ width: 'fit-content' }}
                            onClick={() => (setNavPage('/onboarding/bank-details'), handleSubmit())}
                        />
                        <input
                            type="submit"
                            name=""
                            className='edit col-md-6'
                            value='Save & Continue'
                            style={{ width: 'fit-content' }}
                            onClick={() => (setNavPage('/onboarding/terms'), handleSubmit())}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default GSTIN;