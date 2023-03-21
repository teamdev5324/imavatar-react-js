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
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";
import { saveAs } from 'file-saver';

const Terms = () => {

    const [file, setFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [navPage, setNavPage] = useState(null);
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState([]);
    const [terms, setTerms] = useState({ data: [] });
    const _terms = terms;

    const navigate = useNavigate();
    // const history = useHistory();

    const handleSubmit = () => {
        console.log(terms.data);
        if (checked) {
            // navigate(navPage);
            console.log(terms.data);

            var config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'http://18.234.206.45:8085/api/v1/partner/profile/aggreement',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(terms.data),
            };

            axios(config)
                .then(async function (res) {
                    res = res.data;
                    if (res.status === 'SUCCESS') {
                        localStorage.setItem('onboarding', 'true');
                        console.log(res);
                        var data__ = '{\r\n    ""\r\n}';

                        var config__ = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: 'http://18.234.206.45:8085/api/v1/partner/profile/submitProfile',
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                'Content-Type': 'application/json'
                            },
                            data: data__
                        };

                        axios(config__)
                            .then(function (res) {
                                res = res.data;
                                console.log(res);
                                navigate('/onboarding/verified');
                            })
                            .catch(function (error) {
                                toast.error('Fill ' + error.response.data.errors[0].field + 'Fields before submitting', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            });
                    };
                })
                .catch(err => {
                    toast.error('Accept all agreement', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.log(err);
                    console.log(data);
                })
        } else {
            toast.warn('Accept the partner agreement', {
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

    const getApi = async () => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://18.234.206.45:8085/api/v1/partner/profile',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        };

        let { data } = await axios(config);
        data = data.results.aggreements;
        console.log(data);
        data.forEach((item, index) => {
            _terms.data[index] = { termId: item.term.id, isAccepted: true };
            setTerms(terms => ({
                ...terms,
                ..._terms,
            }))
        });
        setData(data);
    };

    useEffect(() => {
        getApi();
    }, []);

    const handleDownload = async (id, indexId) => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://18.234.206.45:8085/api/v1/files/download/DDMS0024',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        };

        const { data } = await axios(config);
        const { filename, fileContent } = data.results;
        console.log(data);
        saveAs('data:image/jpeg;base64,' + fileContent, filename);
        // base64.decode(fileContent, filename)
        _terms.data[indexId].isAccepted = true;
        setTerms(terms => ({
            ...terms,
            ..._terms,
        }));
    }

    return (<div className='onboarding bank-details container terms'>

        {showPopup && (
            <>
                <div className='cover' onClick={() => setShowPopup(false)}></div>

                <div className='popup'>
                    <div className='close_' onClick={() => setShowPopup(false)}>X</div>
                    <div className='edit'>Partner Agreement</div>
                    <div className='agreement-text'>
                        Agreement Text
                    </div>
                    <div className='check'>
                        <Checkbox
                            // icon={<Icon.FiCheck color="#174A41" size={14} />}
                            name="my-input"
                            checked={checked}
                            icon={<Icon.FiCheck color="#000" size={14} />}
                            onChange={(value, event) => {
                                return setChecked(value);
                            }}
                            borderColor="#FF6658"
                            style={{ cursor: "pointer" }}
                            labelStyle={{ marginLeft: 5, userSelect: "none" }}
                            label="I accept the Partner Agreement"
                        />
                    </div>
                    <button className='edit' onClick={() => setShowPopup(false)}>Submit</button>
                </div>
            </>
        )}

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
                <div style={{ background: `url(${active_bg_})`, color: '#fff' }}>Legal Terms and Policies</div>
            </Link>
        </div>
        <div className="form_">
            <div className='top-text col-12'>
                <span>Legal Terms and Policies</span>
                <p>Please go through the policy documents.You can download it for future reference..</p>
            </div>
            <ol>
                {data.map((item, index) => (
                    <div className="legal_data">
                        <li>{item.term.termName}</li>
                        <p>
                            <a onClick={() => handleDownload(item.term.documentId, index)} style={{ color: '#ff6658', cursor: 'pointer' }}>Download</a>
                        </p>
                    </div>
                ))}
            </ol>

            <div className="col-md-12 file_upload">
                <section>
                    <span>Please accept the partner agreement by verifying the OTP sent on your registered mobile number. Once your account is verified, your products will be
                        visible on the ImAvatar portal.</span>
                    <p>Partner Agreement</p>
                </section>
                <label onClick={() => setShowPopup(true)}>Click here</label>
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
                        onClick={() => (setNavPage('/onboarding/gstin'), handleSubmit())}
                    />
                    <input
                        type="submit"
                        name=""
                        className='edit col-md-6'
                        value='Save & Continue'
                        style={{ width: 'fit-content' }}
                        onClick={() => (setNavPage('/onboarding/verified'), handleSubmit())}
                    />
                </div>
            </div>
        </div>
    </div >);
}

export default Terms;