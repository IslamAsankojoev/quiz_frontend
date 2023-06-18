import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const useTypedSession = () => {
  const { data, status, update } = useSession();

  return { data, status, update } as {
    data: {
      expires: string;
      access: string;
      refresh: string;
      user: {
        id: number;
        email: string;
        username: string;
        is_teacher: boolean;
      };
    };
    status: 'authenticated' | 'unauthenticated' | 'loading';
    update: () => Promise<any>;
  };
};

export default useTypedSession;
