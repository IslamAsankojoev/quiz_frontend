import axiosInstance from './axios.config';
import { ILesson } from './lesson.service';
import { ITesting } from './testing.service';

export const SectionService = {
  findAll: async () => {
    const response = await axiosInstance.get('/sections/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/sections/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: ISection) => {
    const response = await axiosInstance.post('/sections/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: ISection) => {
    const response = await axiosInstance.put(`/sections/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/sections/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type ISection = {
  id?: number;
  name: string;
  description: string;
  picture?: string;
  test?: ITesting;
  material?: ILesson;
  status?: boolean;
  user?: number;
};
