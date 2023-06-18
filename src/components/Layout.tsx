import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import ButtonC from './Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useRole from '@/hooks/useRole';
import { signOut } from 'next-auth/react';

interface ILayoutProps {
  children?: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const router = useRouter();
  const { isAuth } = useRole();
  return (
    <Container fixed>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            borderBottom: '2px solid',
            padding: '10px 20px',
          }}
        >
          <Box>
            <Link href="/">
              {' '}
              <Typography>Информационная безопасность</Typography>
            </Link>
          </Box>
          <Box>
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => {
                  router.back();
                }}
                size="small"
              >
                <Typography>Назад</Typography>
              </Button>
              {isAuth && (
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push('/profile');
                  }}
                  size="small"
                >
                  <Typography color="white">Профиль</Typography>
                </Button>
              )}
              {!isAuth ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push('/login');
                  }}
                  size="small"
                >
                  <Typography color="white">Войти</Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    signOut();
                  }}
                  size="small"
                >
                  <Typography color="white">Выйти</Typography>
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>

        {children}
      </Stack>
    </Container>
  );
};

export default Layout;
