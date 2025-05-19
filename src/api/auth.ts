import axios from 'axios';

const API_URL = 'http://localhost:3000';
export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/register`, {
    username,
    email,
    password
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, {
    username,
    password
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};