

import axios from 'axios';

const baseURL = 'https://localhost:7275/api';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;