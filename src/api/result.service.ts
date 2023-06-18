import axiosInstance from './axios.config';

export const ResultService = {
  findAll: async () => {
    const response = await axiosInstance.get('/results/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/results/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: IResult) => {
    const response = await axiosInstance.post('/results/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: IResult) => {
    const response = await axiosInstance.put(`/results/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/results/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type IResult = {
  id: number;
  user: number;
  section: number;
  section_name: string;
  status: boolean;
  total_question: number;
  total_correct_answer: number;
};
