import api from './axios.js';

export const createLinkAPI = async (payload) => {
  const response = await api.post("/links", payload);
  return response.data;
};

export const getUserLinksAPI = async (page = 1, limit = 10, search = "") => {
  const response = await api.get(`/links?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

export const deleteLinkAPI = async (id) => {
  const response = await api.delete(`/links/${id}`);
  return response.data;
};

export const checkSlugAPI = async (slug) => {
  const response = await api.get(`/links/check-slug?slug=${slug}`);
  return response.data;
};