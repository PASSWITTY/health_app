import axios from 'axios';

const instance = axios.create({
  baseURL: '52.55.240.224:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;