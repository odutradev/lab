import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['authorization'] = token;
    }
    const companyID = localStorage.getItem('spaceID');
    if (companyID) {
      config.headers['space'] = companyID;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
