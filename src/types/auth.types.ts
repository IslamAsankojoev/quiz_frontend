import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { QueryClient } from 'react-query';

type getLayout = (page: ReactNode) => ReactNode;

export type TypeRoles = {
  is_auth?: boolean;
  is_not_auth?: boolean;
  is_teacher?: boolean;
};

type OtherTypes = {
  getLayout?: getLayout;
  queryClient?: QueryClient;
};

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles & OtherTypes;

export type TypeComponentAuthFields = { Component: TypeRoles };

export type MyAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

export type TypeAppProps = MyAppProps &
  TypeComponentAuthFields & {
    pageProps: {
      dehydratedState: unknown;
      session: unknown;
    };
  };
