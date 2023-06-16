import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUser } from '../../../lib/findUser';
import bcrypt from 'bcrypt';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { identifier, password } = credentials;
        const user = await findUser(identifier);
        if (user && (await bcrypt.compare(password, user.password))) {
          const {...userWithoutPassword } = user;
          return { ...userWithoutPassword};
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.username = token.username;
      return session;
    },
  },
  events: {
    getSession: true,
  },
});
