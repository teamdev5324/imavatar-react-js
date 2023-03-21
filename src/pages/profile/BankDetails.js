import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import MainSubmitButton from '../../components/buttons/MainSubmitButton';
import { profileSelectors } from '../../store/profile';
import { SystemState } from '../../store/storeTypes';
import {
  saveBankDetails,
  uploadFile,
} from '../../services/profile/bnakDetails';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import FileBase64 from 'react-file-base64';
import apiCall from '../onboarding/apiCall';

const BankDetails = () => {
  const profileState = useSelector(profileSelectors.getProfileState);
  const navigate = useNavigate();

  const initialValues = {
    holderName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
  };

  const validationSchema = yup.object({
    holderName: yup.string().required("Account holder name can not be empty").matches(/^[a-zA-Z ]*$/, "Enter valid account holder name"),
    accountNumber: yup.string().required("Account number can not be empty").matches(/^\d{9,18}$/, 'Enter valid bank account number'),
    bankName: yup.string().required("Bank name can not be empty").matches(/^[a-zA-Z ]*$/, "Enter valid bank name"),
    branchName: yup.string().required("Branch name can not be empty").matches(/^[a-zA-Z ]*$/, "Enter valid branch name"),
    ifscCode: yup.string().required("IFSC code can not be empty").min(11, 'Enter valid IFSC code').max(11, 'Enter valid IFSC code'),
  });

  const { values, errors, setFieldError, handleChange, handleSubmit, setFieldValue, touched } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: () => {
      handleUpload();
    }
  });

  useEffect(() => {
    const profileData = JSON.parse(sessionStorage.getItem('profileData'));
    const bank = profileData.bank;
    console.log(bank);
    setFieldValue('holderName', bank.accountHolderName);
    setFieldValue('accountNumber', bank.accountNumber);
    setFieldValue('bankName', bank.bankName);
    setFieldValue('branchName', bank.branchName);
    setFieldValue('ifscCode', bank.ifscCode);

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://18.234.206.45:8085/api/v1/files/download/' + bank.documentId,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };

    axios.request(config)
      .then((res) => {
        res = res.data.results;
        console.log(res);
        if (res.fileType === 'jpg') {
          setFile({
            base64: `data:image/jpeg;base64,${res.fileContent}`,
            name: res.filename,
            type: 'image/jpeg',
          });
        } else {
          setFile({
            base64: `data:application/pdf;base64,${res.fileContent}`,
            name: res.filename,
            type: 'application/pdf',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    if (values.ifscCode && values.ifscCode.toString().split('').length === 11) {
      axios.get('https://ifsc.razorpay.com/' + values.ifscCode)
        .then(res => {
          setFieldValue('bankName', res.data.BANK);
          setFieldValue('branchName', res.data.BRANCH);
          setFieldError('ifscCode', null);
        })
        .catch(err => {
          if (err.response.status === 404) {
            setFieldError('ifscCode', 'Enter valid IFSC Code');
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
    }
  }, [values.ifscCode]);


  // const dispatch =
  //   useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();

  const [bank, setBank] = useState({
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    documentId: '',
    ifscCode: '',
  });

  const [file, setFile] = useState(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setBank((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleFileChange = (event) => {
  //   if (event.target.files) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  useEffect(() => {
    setBank((prevState) => ({
      ...prevState,
      accountHolderName: profileState.bank.accountHolderName,
      accountNumber: profileState.bank.accountNumber,
      bankName: profileState.bank.bankName,
      branchName: profileState.bank.branchName,
      documentId: profileState.bank.documentId,
      ifscCode: profileState.bank.ifscCode,
    }));
  }, [profileState]);

  const handleUpload = () => {
    console.log('Uploading file');
    const bankParams = {
      accountHolderName: bank.accountHolderName,
      accountNumber: bank.accountNumber,
      bankName: bank.bankName,
      branchName: bank.branchName,
      documentId: bank.documentId,
      ifscCode: bank.ifscCode,
    };
    if (file) {
      // const reader = new FileReader();
      // reader.readAsArrayBuffer(file);
      //   const arrayBuffer = reader.result;
      //   const byteArray = new Uint8Array(arrayBuffer);
      //   const base64String = btoa(String.fromCharCode(...byteArray));

      const fileParams = {
        "fileContent": file.base64.split('base64,')[1],
        "fileName": file.name,
        "usecaseName": 'userBankDetail',
      };

      console.clear();
      console.log(fileParams);

      const data = fileParams;

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://18.234.206.45:8085/api/v1/files/upload',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (res) {
          if (res.data.status !== 'SUCCESS') {
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
          } else {
            const data2 = JSON.stringify({
              "accountHolderName": values.holderName,
              "accountNumber": values.accountNumber,
              "bankName": values.bankName,
              "branchName": values.branchName,
              "documentId": res.data.results.documentId,
              "ifscCode": values.ifscCode
            });

            const config2 = {
              method: 'put',
              maxBodyLength: Infinity,
              url: 'http://18.234.206.45:8085/api/v1/partner/profile/bank',
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
              },
              data: data2
            };

            axios(config2)
              .then(async function (res) {
                if (res.data.status === 'SUCCESS') {
                  toast.success('Bank details saved successfully', {
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
              });

          }
        })
        .catch(function (error) {
          console.log(error);
        });


      // dispatch(uploadFile(fileParams, bankParams, navigate));

    } else {
      // dispatch(saveBankDetails(bankParams, navigate));
      toast.error('lol', {
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

  useEffect(() => {
    Object.keys(values).forEach(item => {
      if (errors[item]) {
        if (values[item] !== '' && errors[item].search('can not be empty') !== -1) {
          setFieldError(item, null);
        }
      }
    })
  }, [values]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(saveBankDetails(params, navigate));
  };

  const disable = () => {
    const input = document.querySelectorAll('input');
    input.forEach(item => {
      if (item.type !== 'button' && item.type !== 'submit' && item.type !== 'file') {
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

  useEffect(() => {
    const input = document.querySelectorAll('input');
    input.forEach(item => {
      if (item.type === 'file') {
        item.id = 'file-pcr';
        item.style.display = 'none';
        item.accept = 'image/jpeg, application/pdf';
      }
    })
  }, []);

  return (
    <div className="panel_form">
      <h3 className="col-md-12">Bank Details</h3>
      <div className='form'>
        <div className="col-md-6 frmses form-group row ">
          <label>Account Holder Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Prashant Thakare"
            name="accountHolderName"
            value={values.holderName}
            onChange={handleChange('holderName')}
            onFocus={() => touched.holderName = true}
          />
          {errors.holderName && touched.holderName && (<div className='error'>{errors.holderName}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label>Account Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="9127012453241"
            name="accountNumber"
            value={values.accountNumber}
            onChange={handleChange('accountNumber')}
            onFocus={() => touched.accountNumber = true}
          />
          {errors.accountNumber && touched.accountNumber && (<div className='error'>{errors.accountNumber}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label>Bank Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Axis Bank"
            name="bankName"
            value={values.bankName}
            onChange={handleChange('bankName')}
            onFocus={() => touched.bankName = true}
          />
          {errors.bankName && touched.bankName && (<div className='error'>{errors.bankName}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label>Branch Name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            name="branchName"
            value={values.branchName}
            onChange={handleChange('branchName')}
            onFocus={() => touched.branchName = true}
          />
          {errors.branchName && touched.branchName && (<div className='error'>{errors.branchName}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label>IFSC Code</label>
          <input
            type="text"
            className="form-control"
            placeholder="UTIB0000123"
            name="ifscCode"
            value={values.ifscCode}
            onChange={handleChange('ifscCode')}
            onFocus={() => touched.ifscCode = true}
          />
          {errors.ifscCode && touched.ifscCode && (<div className='error'>{errors.ifscCode}</div>)}
        </div>
        <div className="col-md-6 frmses form-group row">
          <label htmlFor="file-pcr">Cancelled cheque/passbook</label>
          <FileBase64
            onDone={file => setFile(file)}
          />
        </div>

        <div className="col-md-6 frmses form-group row fmsbtn">
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
            onClick={() => { if (!errors.ifscCode) handleSubmit() }}
          />
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
