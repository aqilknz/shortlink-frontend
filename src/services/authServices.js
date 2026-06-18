import api from './axios.js';

export const registerAPI = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const loginAPI = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const logoutAPI = async () => {
  const response = await api.delete("/auth/logout");
  return response.data;
};