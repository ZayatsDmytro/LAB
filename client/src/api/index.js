import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'https://localhost:44398' });

export const getUser = data => axiosInstance.post('/get', data);
export const createUser = data => axiosInstance.post('/create', data);