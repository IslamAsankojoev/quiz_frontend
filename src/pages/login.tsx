import { AuthService, ILogin, IRegister } from '@/api/auth.service';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { NextPageAuth } from '@/types/auth.types';
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Switch, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
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

const Login: NextPageAuth = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation('register', (data: ILogin) => AuthService.login(data), {
    onSuccess: () => {
      router.push('/login');
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: ILogin) => {
    signIn('credentials', data);
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
            Войти
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
              <Stack justifyContent="space-between" direction="row">
                <Typography variant="body2" align="center">
                  Нет аккаунта?
                </Typography>
                <Link href="/register">Регистрация</Link>
              </Stack>

              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="info"
                type="submit"
                fullWidth
                size="small"
              >
                Войти
              </LoadingButton>
            </Stack>
          </form>
        </Card>
      </Stack>
    </>
  );
};

export default Login;

Login.is_not_auth = true;
