import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CONFIG } from '@/api/config';
import { AuthService } from '@/api/auth.service';
import { IUser } from '@/api/user.service';

export type IToken = {
  access: string;
  refresh: string;
};

export type ISession = {
  user: IUser;
  expires: string;
  access: string;
  refresh: string;
};

export default NextAuth({
  secret: 'islamka',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
          const data = await AuthService.login({
            username: credentials.username,
            password: credentials.password,
          });

          if (data) {
            return {
              access: data.access_token,
              refresh: data.refresh_token,
              ...data.user,
            };
          } else {
            return null;
          }
        }
      },
    }),
  ],

  jwt: {
    secret: 'islamka',
    maxAge: 24 * 60 * 60 * 1, // 1 day
  },
  session: {
    maxAge: 24 * 60 * 60 * 1, // 1 day
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn() {
      return true;
    },
    // @ts-ignore
    async jwt({ token, user }: { token: IToken; user: IUser }) {
      if (user) {
        // @ts-ignore
        token.access = user.access;
        // @ts-ignore
        token.refresh = user.refresh;
        // @ts-ignore
        token.email = user.email;
        // @ts-ignore
        token.username = user.username;
        // @ts-ignore
        token.id = user.id;
        // @ts-ignore
        token.is_teacher = user.is_teacher;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }: { session: ISession; token: IToken }) {
      session.access = token.access;
      session.refresh = token.refresh;
      // @ts-ignore
      session.user.is_teacher = token.is_teacher;
      // @ts-ignore
      session.user.email = token.email;
      // @ts-ignore
      session.user.username = token.username;
      // @ts-ignore
      session.user.id = token.id;

      return session;
    },
  },
});
