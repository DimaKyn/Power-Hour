import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUser } from '../../../lib/findUser';
import bcrypt from 'bcrypt';

//NOT WORKING, I TRIED
async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(NEXTAUTH_URL + 'auth/refreshToken', {
      token: tokenObject.refreshToken
    });
    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    }
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { identifier, password } = credentials;
        console.log("from nextauth printing credentials:\n", credentials)
        console.log("Sending to findUser with identifier:\n", identifier)
        const user = await findUser(identifier);
        console.log("from nextauth printing user info:\n", user)
        if (user && (await bcrypt.compare(password, user.password))) {
          return { email: user.email, name: user.name, username: user.username };
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(token, user, account, profile) {
      if (user) {
        token.accessToken = user.data.accessToken;
        token.accessTokenExpiry = user.data.accessTokenExpiry;
        token.refreshToken = user.data.refreshToken;
      }
      const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 60 * 1000) - Date.now());
      if (shouldRefreshTime > 0) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.error = token.error;
      return session;
    },
  },
  events: {
    // Disable broadcasting the getSession event
    getSession: false,
  },
});
