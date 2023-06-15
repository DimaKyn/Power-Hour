import axios from 'axios';
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
          console.log(userWithoutPassword);
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
        token.username = user.username; // add the username attribute to the token
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.username = token.username; // add the username attribute to the session
      return session;
    },
  },
  events: {
    getSession: false,
  },
});
