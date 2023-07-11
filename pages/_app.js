import Navbar from '/components/navbar/Navbar';
import "/styles/globals.css";
import Style from '/styles/PageStandard.module.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

// Define the App component as the default export
function App({ Component, pageProps: { session, ...pageProps } }) {
  return (<>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <SessionProvider session={session}>
      <div className={Style.backgroundImage}></div>
      <Navbar />
      <Component {...pageProps} ></Component>
    </SessionProvider>
  </>
  );
}

export default App;
