import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import axios from 'axios';

const DeleteUser = () => {

    // const dispatch =
    //   useDispatch<ThunkDispatch<SystemState, unknown, AnyAction>>();


    const apiRequest = async (params) => {
        console.log(params);
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

            const uid = userData.id;

            //==============================================

            var data__ = JSON.stringify({
                "updatedBy": "1",
                "userId": uid
            });

            var config__ = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://35.170.79.161:8080/api/user/noAuth/deActivatePartnerUser',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data__
            };

            axios(config__)
                .then(function (res) {
                    // console.log(JSON.stringify(response.data));
                    res = res.data;
                    if (res.status === 'SUCCESS') {
                        toast.success('User deleted successfully', {
                            position: "top-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error);
                });

            //====================================


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
    }

    const handleSubmit = () => {
        const email = document.getElementById('email_').value;
        const password = document.getElementById('password_').value;
        apiRequest({
            password,
            userName: email,
            userType: "6"
        })
    }

    return (
        <>
            <input type='text' placeholder='email' id='email_' />
            <input type='text' placeholder='password' id='password_' />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default DeleteUser;
