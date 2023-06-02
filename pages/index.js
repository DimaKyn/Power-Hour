import Style from '/styles/Home.module.css';
import LoginBlock from '../components/LoginBlock';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
//Import the navigation panel for this specific page
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { homePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';

//On a click of a label, move the page to the login block or to the top of the page
function movePage(homepage) {
  homepage ? window.scrollTo({ top: 0, behavior: 'smooth' }) :
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  homepage = !homepage;

}



export default function Home() {
  let homepage = true;
  return (
    <div className={Style.main}>
      <NavigationPanel links={homePanelLinks} />
      <div className={Style.wrapper}>
        <div className={Style.backgroundImage}></div>
        <div className={Style.homepageLabels}>
          <label className={Style.labelPowerHour}>POWER HOUR</label>
          <label className={Style.subLabel}>TIME TO TRAIN</label>
          <div className={Style.subSubSubImage}></div>
          <label className={Style.loginText} onClick={() => movePage(homepage = false)}>LOGIN TO START TRAINING</label>
          <div className={Style.arrowDivDown} onClick={() => movePage(homepage = false)}>
            <AiFillCaretDown />
          </div>
        </div>
      </div>

      <div className={Style.loginPage}>
        <div className={Style.backgroundImage2}></div>
        <div className={Style.arrowDivUp} onClick={() => movePage(homepage = true)}>
          <AiFillCaretUp />
        </div>
        <label className={Style.homeText} onClick={() => movePage(homepage = true)}>HOME</label>
        <LoginBlock />
      </div>
    </div>
  )
}
