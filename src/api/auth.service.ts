import axiosInstance from './axios.config';

export const AuthService = {
  login: async ({ username, password }: ILogin) => {
    const response = await axiosInstance.post('/api/token/', { username, password });
    const data = await response.data;
    return data;
  },
  register: async ({ username, email, password, is_teacher }: IRegister) => {
    const response = await axiosInstance.post('/users/', {
      username,
      email,
      password,
      is_teacher,
    });
    const data = await response.data;
    return data;
  },
};

export type ILogin = {
  username: string;
  password: string;
};

export type IRegister = {
  username: string;
  email: string;
  password: string;
  is_teacher: boolean;
};
