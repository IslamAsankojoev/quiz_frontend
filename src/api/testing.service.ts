import axiosInstance from './axios.config';

export const TestingService = {
  findAll: async () => {
    const response = await axiosInstance.get('/testing/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/testing/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async () => {
    const response = await axiosInstance.post('/testing/');
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: ITesting) => {
    const response = await axiosInstance.patch(`/testing/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/testing/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type ITesting = {
  id: number;
  total_question: number;
  total_correct_answer: number;
};
