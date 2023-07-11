import Style from '/styles/Home.module.css';
//Import the navigation panel for this specific page
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { homePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { useState, useEffect } from 'react';
import Typed from 'typed.js';
import { CiDumbbell, } from 'react-icons/ci';
import Link from 'next/link';

// Define the Home component as the default export
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize the Typed.js instance
    const typed = new Typed('#typed', {
      strings: ['LIMITS', 'ABILITIES', 'STRENGTH', 'MINDSET', 'ENDURANCE', 'SOUL', 'DISCIPLINE',
        'ATHLETICISM', 'STAMINA', 'AGILITY', 'POTENTIAL', 'CAPABILITIES', 'SPEED', 'RESILIENCE'],
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
    // Check if the user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className={Style.inner}>
      <NavigationPanel links={homePanelLinks} />
        <div className={Style.backgroundImage}></div>
      <div className={Style.wrapper}>
        <div className={Style.homepageLabels}>
          <label className={Style.labelPowerHour}>POWER HOUR</label>
          <label className={Style.subLabel}>TIME TO TRAIN</label>
          <div className={Style.subSubSubImage}></div>
          <div><span className={Style.regularText}>POWER YOUR&nbsp;</span><span id="typed" className={Style.typedText}></span></div>

          <div className={Style.dumbbellDiv} style={{ width: "60px" }}>
            <CiDumbbell style={{ fontSize: "60px" }} />
          </div>
        </div>
      </div>
      <div className={Style.explanationsContainer}>
        {isLoggedIn && <div className={Style.explanationDiv}>
          <span style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>
            <Link href="/login" className={Style.loginLink}><span style={{textDecoration: "underline"}}>Login</span> </Link> 
            to save workouts, track progress, and more!
          </span>
        </div>}
        <div className={Style.explanationDiv}>
          <span style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>
            Choose from 1000+ different exercises and create your own custom workouts!
          </span>
        </div>
        <div className={Style.explanationDiv}>
          <span style={{textAlign: "center", fontWeight: "bold", fontSize: "20px"}}>
            Set the amount of sets, reps, and weight for each exercise!
          </span>
        </div>
      </div>
    </div>
  )
}
