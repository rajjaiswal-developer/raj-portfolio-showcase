import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
});

// Auth interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
API.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const projectsAPI = {
  getAll: (params) => API.get('/projects', { params }),
  create: (data) => API.post('/projects', data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  delete: (id) => API.delete(`/projects/${id}`),
};

export const productsAPI = {
  getAll: (params) => API.get('/products', { params }),
  getOne: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

export const contactAPI = {
  send: (data) => API.post('/contact', data),
  getAll: () => API.get('/contact'),
  markRead: (id) => API.patch(`/contact/${id}/read`),
};

export const ordersAPI = {
  getAll: () => API.get('/orders'),
  updateStatus: (id, status) => API.patch(`/orders/${id}/status`, { orderStatus: status }),
};

export const paymentAPI = {
  createOrder: (data) => API.post('/payment/create-order', data),
  verify: (data) => API.post('/payment/verify', data),
};

export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
  login: (data) => API.post('/auth/login', data),
  me: () => API.get('/auth/me'),
};

export const uploadAPI = {
  image: (formData) => API.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default API;
