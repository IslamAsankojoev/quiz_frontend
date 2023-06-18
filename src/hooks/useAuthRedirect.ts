import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthRedirect = () => {
  const { data: session, status } = useSession();

  const { query, push } = useRouter();

  let redirect = query.redirect ? String(query.redirect) : '/';

  useEffect(() => {
    if (status === 'loading') return;
    if (!!session?.user) push(redirect);
  }, [redirect, push, status, session]);
  return null;
};

export default useAuthRedirect;
