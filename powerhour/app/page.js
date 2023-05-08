"use client"

import {useRef} from 'react';
import Image from 'next/image'
import Style from '../styles/Home.module.css';
import Header from '../components/Header';
import LoginBlock from '../components/LoginBlock';

//On a click of a label, move the page to the login block or to the top of the page
function movePage(labelRef) {
  //labelRef is the current clicked on element
  if (homepage) {
    labelRef.current.style.color = "red";
    labelRef.current.style.top = "78vh";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    homepage = !homepage;
  } else {
    labelRef.current.style.color = "white";
    labelRef.current.style.top = "90vh";
    window.scrollTo({ bottom: window.scrollY, behavior: 'smooth' });
    homepage = !homepage;
  }
  
}

var homepage = false;

export default function Home() {
  const labelRef = useRef(null);
  

  return (
    <main className={Style.main}>
      <Header>
      </Header>
      <div className={Style.wrapper}>
        <div className={Style.backgroundImage}></div>
        <label className={Style.labelPowerHour}>POWER HOUR</label><br/>
        <label className={Style.subLabel}>TIME TO TRAIN</label>
        <label ref={labelRef} className={Style.loginText} onClick={() => movePage(labelRef)}>LOGIN TO START TRAINING</label>
        <div className={Style.arrowDiv}>
          <ion-icon name="chevron-down-outline" size="large" className={Style.arrowDownward}></ion-icon>
        </div>
      </div>
      <div className={Style.loginPage}>
        
        <LoginBlock/>
      </div>
      
    </main>
  )
}
