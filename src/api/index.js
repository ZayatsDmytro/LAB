import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getUser = () => axiosInstance.get('/users');
export const createUser = data => axiosInstance.post('/users', data);