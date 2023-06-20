import Style from '/styles/Home.module.css';
//Import the navigation panel for this specific page
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { homePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { useState, useEffect } from 'react';
import Typed from 'typed.js';
import { CiDumbbell } from 'react-icons/ci';






export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const typed = new Typed('#typed', {
      strings: ['LIMITS',  'ABILITIES', 'STRENGTH', 'MINDSET', 'ENDURANCE', 'SOUL', 'DISCIPLINE',
         'ATHLETICISM', 'STAMINA', 'AGILITY', 'POTENTIAL','CAPABILITIES', 'SPEED', 'RESILIENCE'],
      typeSpeed: 90,
      backSpeed: 35,
      loop: true,
      cursorChar: ""
    });
    return () => {
      typed.destroy();
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className={Style.main}>
      <NavigationPanel links={homePanelLinks}/>
      <div className={Style.wrapper}>
        <div className={Style.backgroundImage}></div>
        <div className={Style.homepageLabels}>
          <label className={Style.labelPowerHour}>POWER HOUR</label>
          <label className={Style.subLabel}>TIME TO TRAIN</label>
          <div className={Style.subSubSubImage}></div>
          <div><span className={Style.regularText}>POWER YOUR&nbsp;</span><span id="typed" className={Style.typedText}></span></div>
          <div className={Style.arrowDivDown} style={{width: "60px"}}>
            <CiDumbbell style={{fontSize: "60px"}}/>
          </div>
        </div>
      </div>
    </div>
  )
}
