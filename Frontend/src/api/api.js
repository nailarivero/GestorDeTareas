import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5197',
});

export default api;
