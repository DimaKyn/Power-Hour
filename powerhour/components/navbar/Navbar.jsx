"use client"

import Link from "next/link";
import Container from "../Container";
import Style from "../../styles/Navbar.module.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { useRef, useState } from "react";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const hamburgerMenu = useRef(null);
    const navbar = useRef(null);

    function setOpenHamburger() {
        setHamburgerMenuOpen(!hamburgerMenuOpen);
    }

    const handleHamburgerClick = () => {
        setOpenHamburger();
        if (!hamburgerMenuOpen) {
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.hidden}`;
            navbar.current.className = `${Style.wrapper} ${Style.navHalfOpacity}`;

        } else {
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.active}`;
            navbar.current.className = `${Style.wrapper} ${Style.navFullOpacity}`;
        }
    };



    return <>
        <div ref={navbar} className={Style.wrapper}>
            <GiHamburgerMenu onClick={() => handleHamburgerClick()} className={Style.hamburger} />
            <ImCancelCircle className={Style.hamburgerCloser} />
            <div className={Style.rightSide}>
                <div className={Style.logo}>
                <Link style={{height:"100%", width:"100%", cursor:"pointer", position:"absolute"}} href="/"></Link>
                    <Image style={{pointerEvents:"none"}}
                        src="/../public/ph.png"
                        width={100}
                        height={100}
                        alt="Picture of the PowerHour logo"
                    />
                    
                </div>
            </div> 
            <div className={Style.buttons}>
                <Link href="/" style={{display:"flex", alignItems:"center"}} className={Style.navText} onClick={handleHamburgerClick} >
                    <MdAccountCircle style={{paddingRight: "5px", fontSize: "25px"}}/>
                    Sign in</Link>
                <Link onClick={() => handleHamburgerClick()} href="../../workouts/workouts" className={Style.navText}
                >Workouts</Link>
                <Link href="../../about" className={Style.navText} onClick={() => handleHamburgerClick()}>About us</Link>
            </div>
        </div>
        <div ref={hamburgerMenu} className={Style.hamburgerMenu}>
            <div className={Style.hamburgerButtons}>
                <Link href="/" className={Style.hamburgerLinks}>HOME</Link>
                <Link href="../../workouts/workouts" className={Style.hamburgerLinks}>WORKOUTS</Link>
                <Link href="../../about" className={Style.hamburgerLinks}>
                    INFO</Link>
                <Link href="" className={Style.hamburgerLinks} >Account</Link>
            </div>

        </div>
    </>



}