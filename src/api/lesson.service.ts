import axiosInstance from './axios.config';

export const LessonService = {
  findAll: async () => {
    const response = await axiosInstance.get('/lessons/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/lessons/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: ILesson) => {
    const response = await axiosInstance.post('/lessons/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: ILesson) => {
    const response = await axiosInstance.patch(`/lessons/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/lessons/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type ILesson = {
  id?: number;
  name: string;
  duration: string;
  picture?: string;
  photo_material?: string;
  video: string;
  document?: string;
};
