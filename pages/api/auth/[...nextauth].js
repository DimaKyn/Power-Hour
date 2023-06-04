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
        console.log("from nextauth printing credentials:\n", credentials)
        console.log("Sending to findUser with identifier:\n", identifier)
        const user = await findUser(identifier);
        console.log("from nextauth printing user info:\n", user)
        if (user && (await bcrypt.compare(password, user.password))) {
          const { password, ...userWithoutPassword } = user; // exclude password property from user object
          return { ...userWithoutPassword, identifier: user.email }; // include user object without password in response
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  events: {
    // Disable broadcasting the getSession event
    getSession: false,
  },
});
