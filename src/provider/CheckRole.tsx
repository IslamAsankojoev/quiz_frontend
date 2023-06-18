import useTypedSession from '@/hooks/useTypedSession';
import { TypeComponentAuthFields } from '@/types/auth.types';
import { useRouter } from 'next/router';
import { FC, memo, useMemo } from 'react';

const CheckRole: FC<{
  children: JSX.Element;
  Component: TypeComponentAuthFields['Component'];
}> = ({ children, Component: { is_auth, is_not_auth, is_teacher } }) => {
  const router = useRouter();

  const { data, status } = useTypedSession();
  const Children = () => <>{children}</>;
  const Memozed = useMemo(() => memo(Children), [children]);

  const isAuth = status === 'authenticated';
  const isNotAuth = status === 'unauthenticated';
  const isAuthor = data?.user?.is_teacher;
  const isNotAuthor = !data?.user?.is_teacher;

  // const MemizeComponent = useMemo(() => memo(Children), [children]);

  if (is_auth && isAuth) return <Memozed />;
  if (is_not_auth && isNotAuth) return <Memozed />;
  if (is_teacher && isAuthor) return <Memozed />;

  if (is_auth && isAuth) return <Memozed />;
  if (is_teacher && isAuth) return <Memozed />;

  if (is_not_auth && isNotAuth) return <Memozed />;
  if (is_teacher && isAuthor) return <Memozed />;

  if (is_auth && isNotAuth) {
    router.push('/login');
    return null;
  }
  if (is_not_auth && isAuth) {
    router.push('/');
    return null;
  }
  if (is_teacher && isNotAuthor) {
    router.push('/');
    return null;
  }

  return null;
};

export default CheckRole;
