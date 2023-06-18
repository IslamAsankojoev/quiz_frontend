import axiosInstance from './axios.config';

export const UserService = {
  findAll: async () => {
    const response = await axiosInstance.get('/users/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/users/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: IUser) => {
    const response = await axiosInstance.post('/users/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: IUser) => {
    const response = await axiosInstance.patch(`/users/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/users/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type IUser = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  profile_photo?: string;
  statistic?: number;
  points?: number;
  is_teacher?: boolean;
};
