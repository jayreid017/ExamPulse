import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Points to the Express backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
