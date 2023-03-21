import axios from "axios";
import { toast } from 'react-toastify';

const apiCall = () => {
    return new Promise((resolve, reject) => {
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
                    resolve({ status: 200, verificationStatus: res.results.verificationStatus });
                    console.log(res);
                }
            })
    })
};

export default apiCall;