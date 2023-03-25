import CryptoJS from 'crypto-js';

const secreatKey = process.env.REACT_APP_CRYPTO_KEY;

export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, secreatKey).toString();
};

//====

export const decrypt = (data) => {
    return CryptoJS.AES.decrypt(data, secreatKey).toString(CryptoJS.enc.Utf8);
};