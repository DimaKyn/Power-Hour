import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUser } from '../../../lib/findUser';
import bcrypt from 'bcrypt';

// Define the NextAuth configuration using the default export
export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Set the secret for NextAuth from the environment variable
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { identifier, password } = credentials; // Destructure the identifier and password from the credentials object
        const user = await findUser(identifier); // Call the findUser function to find the user based on the identifier
        if (user && (await bcrypt.compare(password, user.password))) { // Check if the user exists and the password matches the hashed password
          const {...userWithoutPassword } = user; // Create a new object without the password property
          return { ...userWithoutPassword}; // Return the user object without the password
        } else {
          throw new Error('Invalid credentials'); // Throw an error if the credentials are invalid
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = user.username; // Add the username property to the token if the user exists
      }
      return token; // Return the token
    },
    session: async ({ session, token }) => {
      session.user.username = token.username; // Set the username property of the session's user object to the username from the token
      return session; // Return the session
    },
  },
  events: {
    getSession: true, // Enable the getSession event
  },
});
