import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_USER_SERVICE,
  timeout: 5000000,
});

export default api;
