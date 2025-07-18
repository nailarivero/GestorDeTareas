import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5213', 
});

export default api;
