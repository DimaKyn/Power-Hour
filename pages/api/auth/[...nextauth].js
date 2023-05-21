import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUser } from '/lib/findUser';

const options = {
    providers: [
        CredentialsProvider({
          async authorize(credentials) {
            const { username, password } = credentials;
            const user = await findUser(username, password);
            
            if (user) {
              return Promise.resolve(user);
            } else {
              return Promise.resolve(null);
            }
      },
    }),
  ],
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);



/** Example of how to hide content from users that did not logged in
 * import { useSession } from 'next-auth/client';

function ProtectedComponent() {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return <div>Protected content goes here</div>;
}

 */