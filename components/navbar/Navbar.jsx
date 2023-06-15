"use client"

import Link from "next/link";
import Style from "/styles/Navbar.module.css";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { useRef, useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import {signOut } from 'next-auth/react'

//TODO: When hamburger open and you click on a link, the hamburger menu should close
//TODO: When hamburger open and you click on screen, the hamburger menu should close
export default function Navbar() {
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const [hamburgerCloserHidden, setHamburgerCloserHidden] = useState(true);
    const hamburgerMenu = useRef(null);
    const navbar = useRef(null);
    const lowerOpacityHamburgerOpen = useRef(null);

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('loggedInUser');
            setLoggedInUser(user);
        }
    }, []);


    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem('loggedInUser');
        window.localStorage.clear();
        setLoggedInUser(null);
        await signOut();
        window.location.href = '/'
    };


    const handleHamburgerClick = () => {
        setHamburgerMenuOpen(!hamburgerMenuOpen);
        setHamburgerCloserHidden(!hamburgerCloserHidden);
        if (hamburgerMenuOpen) {
            lowerOpacityHamburgerOpen.current.className = `${Style.lowerOpacityHamburgerOpen}`;
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.hidden}`;
            navbar.current.className = `${Style.wrapper} ${Style.navHalfOpacity}`;
        } else {
            lowerOpacityHamburgerOpen.current.className = `${Style.lowerOpacityHamburgerOpen} ${Style.lowerOpacityActive}`;
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.active}`;
            navbar.current.className = `${Style.wrapper} ${Style.navFullOpacity}`;
        }
    };

    //If the hamburger menu is open and you click on a button, the hamburger menu closes
    const handleButtonClick = () => {
        if (hamburgerMenuOpen) {
            handleHamburgerClick();
        }
    }

    return <>
        <div ref={lowerOpacityHamburgerOpen} className={Style.lowerOpacityHamburgerOpen}
            onClick={() => handleHamburgerClick()}></div>
        <div ref={navbar} className={Style.wrapper}>

            {!hamburgerMenuOpen && <GiHamburgerMenu className={Style.hamburger} onClick={() => handleHamburgerClick()} />}
            {!hamburgerCloserHidden &&
                <CgClose className={Style.hamburgerCloser} onClick={() => handleHamburgerClick()} />}
            <div className={Style.rightSide}>
                <div className={Style.logo}>
                    <Link onClick={() => handleButtonClick()} style={{ height: "100%", width: "100%", cursor: "pointer", position: "absolute" }} href="/"></Link>
                    <div className={Style.logoContainer}>
                        <Image style={{ pointerEvents: "none" }}
                            src="/../public/pwrhwrlogo.png"
                            alt="PowerHour logo"
                            fill={true}
                            sizes="(max-width: 500px) 100px"
                        />
                    </div>


                </div>
            </div>
            <div className={Style.buttons} style={{ display: "flex", justifyContent: "space-between" }}>
            {loggedInUser && (
                    <button onClick={handleLogout} className={Style.logoutButton}>Logout</button>
                )}
                <Link onClick={() => handleButtonClick()} href="/profile" style={{}} className={Style.navProfileIcon}  >
                    {loggedInUser ? (
                        <>
                            <MdAccountCircle style={{ fontSize: "45px" }} />
                        </>
                    ) : (
                        <>
                            <MdAccountCircle style={{ paddingRight: "5px", fontSize: "45px" }} />

                        </>
                    )}</Link>
                
            </div>
        </div>

        <div ref={hamburgerMenu} className={Style.hamburgerMenu}>
            <div className={Style.hamburgerButtons}>
                <div className={Style.topIcons}>
                    {/* Profile icon inside the hamburger menu*/}
                    <div className={Style.iconContainer}>
                        <Link onClick={() => handleButtonClick()} href="/">
                            <AiFillHome />
                        </Link>
                    </div>
                    <label style={{ width: "auto" }}>MENU</label>
                    {/* Home icon inside the hamburger menu*/}
                    <div className={Style.iconContainer}>
                        <Link onClick={() => handleButtonClick()} href="/profile">
                            <BsFillPersonFill />
                        </Link>

                    </div>
                </div>
                {isLoggedIn ? (
                    <div className={Style.hamburgerLinksContainer}>
                        <Link onClick={() => handleButtonClick()} href="/workouts" className={Style.hamburgerLinks}>WORKOUTS</Link>
                        <Link onClick={() => handleButtonClick()} href="/workouts" className={Style.hamburgerLinks}>ADD</Link>
                        <Link onClick={() => handleButtonClick()} href="/workouts" className={Style.hamburgerLinks}>OTHER</Link>
                        <Link onClick={() => handleButtonClick()} href="/workouts" className={Style.hamburgerLinks}>LINKS</Link>
                    </div>
                ) : (
                    <div className={Style.hamburgerLinksContainer}>
                        <Link onClick={() => handleButtonClick()} href="/workouts" className={Style.hamburgerLinks}>WORKOUTS</Link>
                    </div>
                )}

                <div className={Style.bottomSection}>
                    <Link onClick={() => handleButtonClick()} href="/about">
                        <AiFillInfoCircle className={Style.infoCircle} />
                    </Link>
                </div>

            </div>
        </div>
    </>



}