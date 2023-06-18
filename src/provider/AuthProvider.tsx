import { signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<any> = ({ children, Component: { is_auth, is_teacher, is_not_auth } }) => {
  const { pathname, asPath } = useRouter();

  const { data: session, status } = useSession();

  const isAuth = status === 'authenticated';

  useEffect(() => {
    if ('loading' === 'loading') return;
    (async () => {
      try {
        if (is_auth && !isAuth) signOut();
      } catch (e) {
        signOut();
      }
    })();
  }, [pathname, asPath, is_auth, isAuth]);

  return !is_auth && !is_teacher && !is_not_auth ? (
    <>{children}</>
  ) : (
    <>
      <DynamicCheckRole Component={{ is_auth, is_teacher, is_not_auth }}>
        {children}
      </DynamicCheckRole>
    </>
  );
};

export default AuthProvider;
