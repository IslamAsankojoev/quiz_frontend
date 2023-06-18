import axiosInstance from './axios.config';

export const ReviewService = {
  findAll: async () => {
    const response = await axiosInstance.get('/reviews/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/reviews/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: IReview) => {
    const response = await axiosInstance.post('/reviews/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: IReview) => {
    const response = await axiosInstance.put(`/reviews/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/reviews/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type IReview = {
  id?: number;
  review_text: string;
  user?: number;
  user_username?: string;
};
