import { AuthService, IRegister } from '@/api/auth.service';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { NextPageAuth } from '@/types/auth.types';
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Switch, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const style = {
  '& .MuiFilledInput-root.MuiFilledInput-underline': {
    backgroundColor: 'white',
  },
};

const Register: NextPageAuth = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    'register',
    (data: IRegister) => AuthService.register(data),
    {
      onSuccess: () => {
        router.push('/login');
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      is_teacher: false,
    },
  });

  const onSubmit = (data: IRegister) => {
    mutate(data);
  };

  return (
    <>
      <Stack direction="column" justifyContent="center" height="100vh">
        <Card
          sx={{
            width: '300px',
            margin: '0 auto',
            maxWidth: '90%',
            padding: '40px',
            borderRadius: '20px',
          }}
        >
          <Typography variant="h5" align="center">
            Регистрация
          </Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={1.5}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Логин"
                    size="small"
                    variant="filled"
                    sx={style}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    size="small"
                    variant="filled"
                    sx={style}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Пароль"
                    size="small"
                    variant="filled"
                    sx={style}
                  />
                )}
              />
              <Controller
                name="is_teacher"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    width="100%"
                  >
                    <Switch id={field.name} {...field} />
                    <label htmlFor={field.name}>
                      <Typography>Преподаватель</Typography>
                    </label>
                  </Stack>
                )}
              />

              <Stack justifyContent="space-between" direction="row">
                <Typography variant="body2" align="center">
                  Уже есть аккаунт?
                </Typography>
                <Link href="/login">Войти</Link>
              </Stack>

              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="info"
                type="submit"
                fullWidth
                size="small"
              >
                Регистрация
              </LoadingButton>
            </Stack>
          </form>
        </Card>
      </Stack>
    </>
  );
};

export default Register;

Register.is_not_auth = true;
