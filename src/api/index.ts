import axios from 'axios';

const API_CLIENT = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export { API_CLIENT };
