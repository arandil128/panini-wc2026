import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const getSections = () => api.get('/sections');
export const getSectionStickers = (id) => api.get(`/sections/${id}/stickers`);
export const getStats = () => api.get('/collection/stats');
export const getMissing = () => api.get('/collection/missing');
export const pasteCodes = (codes) => api.post('/collection', { codes });
export const unpaste = (id) => api.delete(`/collection/${id}`);
export const getDuplicates = () => api.get('/duplicates');
export const upsertDuplicate = (stickerId, quantity) => api.post('/duplicates', { stickerId, quantity });
export const deltaDuplicate = (stickerId, delta) => api.put(`/duplicates/${stickerId}`, { delta });
export const deleteDuplicate = (stickerId) => api.delete(`/duplicates/${stickerId}`);
export const uploadOcr = (file) => {
  const form = new FormData();
  form.append('image', file);
  return api.post('/ocr', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const updateName = (id, playerName) => api.patch(`/stickers/${id}/name`, { playerName });
export const exportMissing = (format) => `/api/export/missing?format=${format}`;
export const exportDuplicates = (format) => `/api/export/duplicates?format=${format}`;

export default api;