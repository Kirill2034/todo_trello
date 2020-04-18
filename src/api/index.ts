import axios from 'axios';

const API_CLIENT = axios.create({
  baseURL: 'http://localhost:3001/api',
});

const token = localStorage.getItem('token');

if (token) {
  API_CLIENT.defaults.headers['Authorization'] = token;
}

export { API_CLIENT };
