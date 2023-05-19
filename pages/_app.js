import Navbar from '/components/navbar/Navbar';
import "/styles/globals.css";
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import Style from '/styles/PageStandard.module.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className={Style.backgroundImage}></div>
      <Navbar />
      <Component {...pageProps} ></Component>
    </>);

}
