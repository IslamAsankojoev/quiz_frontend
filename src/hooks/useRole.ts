import React from 'react';
import useTypedSession from './useTypedSession';

const useRole = () => {
  const { data, status } = useTypedSession();
  const isNotAuth = status === 'unauthenticated';
  const isAuth = status === 'authenticated';
  const isTeacher = data?.user?.is_teacher;

  return { isNotAuth, isAuth, isTeacher, status };
};

export default useRole;
