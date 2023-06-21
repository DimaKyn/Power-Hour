import Navbar from '/components/navbar/Navbar';
import "/styles/globals.css";
import Style from '/styles/PageStandard.module.css';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={Style.backgroundImage}></div>
      <Navbar />
      <Component {...pageProps} ></Component>
    </SessionProvider>
  );
}

export default App;
