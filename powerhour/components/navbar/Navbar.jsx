"use client"

import Link from "next/link";
import Container from "../Container";
import Style from "../../styles/Navbar.module.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { useRef, useState } from "react";






export default function Navbar() {
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const hamburgerMenu = useRef(null);
    const navbar = useRef(null);
    
    function setOpenHamburger() {
        setHamburgerMenuOpen(!hamburgerMenuOpen);
    }

    const handleHamburgerClick = () => {
        setOpenHamburger();
        if(!hamburgerMenuOpen) {
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.hidden}`;
            navbar.current.className = `${Style.wrapper} ${Style.navHalfOpacity}`;

        } else {
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.active}`;
            navbar.current.className = `${Style.wrapper} ${Style.navFullOpacity}`;
        }
    };



    return <>
        <div ref={navbar} className={Style.wrapper}>

            <div className={Style.logo}>
                <Image
                    src="/../public/ph.png"
                    width={100}
                    height={100}
                    alt="Picture of the PowerHour logo"
                />
            </div>
            <div className={Style.rightSide}>
                <div className={Style.buttons}>
                    <Link href="/" className={Style.navText} onClick={handleHamburgerClick} >Home</Link>
                    <Link onClick={() => handleHamburgerClick()} href="../../workouts/workouts" className={Style.navText}
                        >Workouts</Link>
                    <Link href="../../about" className={Style.navText} onClick={() => handleHamburgerClick()}>About us</Link>

                </div>

                <GiHamburgerMenu onClick={() => handleHamburgerClick()} className={Style.hamburger} />
                <ImCancelCircle className={Style.hamburgerCloser} />

            </div>


        </div>
        <div ref={hamburgerMenu} className={Style.hamburgerMenu}>
            <div className={Style.hamburgerButtons}>
                <Link href="/" className={Style.hamburgerLinks}>HOME</Link>
                <Link href="../../workouts/workouts" className={Style.hamburgerLinks}>WORKOUTS</Link>
                <Link href="../../about" className={Style.hamburgerLinks}>INFO</Link>

            </div>

        </div>
    </>



}