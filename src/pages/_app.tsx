import AuthProvider from '@/provider/AuthProvider';
import '@/styles/globals.css';
import { TypeAppProps } from '@/types/auth.types';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }: TypeAppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider Component={Component}>
          <>
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Component {...pageProps} />
          </>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export type { AppProps };
