// estudantesAPI.js
import axiosInstance from './api';

const estudantesAPI = {
  getAll: () => axiosInstance.get('/estudantes'),
  getById: (id) => axiosInstance.get(`/estudantes/${id}`),
  create: (data) => axiosInstance.post('/estudantes', data),
  update: (id, data) => axiosInstance.put(`/estudantes/${id}`, data),
  delete: (id) => axiosInstance.delete(`/estudantes/${id}`),
};

export default estudantesAPI;

