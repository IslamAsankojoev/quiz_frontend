import axiosInstance from './axios.config';

export const QuestionService = {
  findAll: async () => {
    const response = await axiosInstance.get('/question/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: number) => {
    const response = await axiosInstance.get(`/question/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (data: IQuestion) => {
    const response = await axiosInstance.post('/question/', data);
    const res = await response.data;
    return res;
  },
  update: async (id: number, data: IQuestion) => {
    const response = await axiosInstance.patch(`/question/${id}/`, data);
    const res = await response.data;
    return res;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/question/${id}/`);
    const res = await response.data;
    return res;
  },
};

export type IQuestion = {
  id?: number;
  question_text: string;
  choice1: string;
  choice2: string;
  choice3: string;
  correct_answer: string;
  user_answer?: string;
  is_correct?: boolean;
  test_type?: number;
  level?: number;
  user?: number;
};
