import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getTask = async (id: string) => {
  const response = await axios.get(`${API_URL}/tasks/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const createTask = async (title: string, description?: string) => {
  const response = await axios.post(`${API_URL}/tasks`, {
    title,
    description
  }, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateTask = async (id: string, data: { title?: string; description?: string; completed?: boolean }) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};