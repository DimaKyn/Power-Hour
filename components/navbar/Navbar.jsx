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
import { signOut } from 'next-auth/react'
import Swal from 'sweetalert2';

//TODO: When hamburger open and you click on a link, the hamburger menu should close
//TODO: When hamburger open and you click on screen, the hamburger menu should close
export default function Navbar() {
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const [hamburgerCloserHidden, setHamburgerCloserHidden] = useState(true);
    const hamburgerMenu = useRef(null);
    const navbar = useRef(null);
    const lowerOpacityHamburgerOpen = useRef(null);

    const profileMenu = useRef(null);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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
        // Show the Swal alert
        Swal.fire({
          title: 'Logout',
          text: 'Are you sure you want to logout?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Logout',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // User confirmed the logout
            localStorage.removeItem('loggedInUser');
            window.localStorage.clear();
            setLoggedInUser(null);
            await signOut();
            window.location.href = '/';
          }
        });
      };

    const handleLowerOpacityClick = () => {
        if (hamburgerMenuOpen) {
            handleHamburgerClick();
        }
        //Profile menu is open
        else {
            handleProfileIconClick();
        }
    };

    //This function handles the hamburger menu opening and closing
    //Upon click, changes the className of components
    const handleHamburgerClick = () => {
        if (profileMenuOpen && !hamburgerMenuOpen) {
            handleProfileIconClick();
        }
        //Change the boolean state of the hamburger menu
        setHamburgerMenuOpen(!hamburgerMenuOpen);
        setHamburgerCloserHidden(!hamburgerCloserHidden);
        if (hamburgerMenuOpen) {
            lowerOpacityHamburgerOpen.current.className = `${Style.lowerOpacityHamburgerOpen}`;
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.hidden}`;
            navbar.current.className = `${Style.wrapper} ${Style.navHalfOpacity}`;
        }
        else {
            lowerOpacityHamburgerOpen.current.className = `${Style.lowerOpacityHamburgerOpen} ${Style.lowerOpacityActive}`;
            hamburgerMenu.current.className = `${Style.hamburgerMenu} ${Style.active}`;
            navbar.current.className = `${Style.wrapper} ${Style.navFullOpacity}`;
        }
    };

    const handleProfileIconClick = () => {
        if (hamburgerMenuOpen && !profileMenuOpen) {
            handleHamburgerClick();
        }
        //Change the boolean state of the profile menu
        setProfileMenuOpen(!profileMenuOpen);
        if (profileMenuOpen) {
            lowerOpacityHamburgerOpen.current.className = `${Style.lowerOpacityHamburgerOpen}`;
            profileMenu.current.className = `${Style.profileIconMenu} `;
            navbar.current.className = `${Style.wrapper} ${Style.navHalfOpacity}`;
        }
        else {
            lowerOpacityHamburgerOpen.current.className = `${Style.lowerOpacityHamburgerOpen} ${Style.lowerOpacityActive}`;
            profileMenu.current.className = `${Style.profileIconMenu} ${Style.activeProfileMenu}`;
            navbar.current.className = `${Style.wrapper} ${Style.navFullOpacity}`;
        }
    };

    //If the hamburger menu is open and you click on a button, the hamburger menu closes
    const handleButtonClick = () => {
        if (hamburgerMenuOpen) {
            handleHamburgerClick();
        }
        if (profileMenuOpen) {
            handleProfileIconClick();
        }

    }

    return <>
        <div ref={lowerOpacityHamburgerOpen} className={Style.lowerOpacityHamburgerOpen}
            onClick={() => handleLowerOpacityClick()}></div>
        <div ref={navbar} className={Style.wrapper}>

            {!hamburgerMenuOpen && <GiHamburgerMenu className={Style.hamburger} onClick={() => handleHamburgerClick()} />}
            {!hamburgerCloserHidden &&
                <CgClose className={Style.hamburgerCloser} onClick={() => handleHamburgerClick()} />}
            <div className={Style.rightSide}>
                <div className={Style.logo}>
                    <Link onClick={() => handleButtonClick()} style={{ height: "100%", width: "100%", cursor: "pointer", position: "absolute" }} href="/"></Link>
                    <div className={Style.logoContainer}>
                        <Image style={{ pointerEvents: "none" }}
                            src="/../public/static/images/pwrhwrlogo.png"
                            alt="PowerHour logo"
                            fill={true}
                            sizes="(max-width: 500px) 100px"
                        />
                    </div>
                </div>
            </div>
            <div className={Style.buttons} style={{ display: "flex", justifyContent: "space-between" }}>
                <MdAccountCircle style={{ fontSize: "45px", cursor: "pointer" }} onClick={() => handleProfileIconClick()} />
            </div>
        </div>

        {/*Profile Icon Menu*/}
        <div ref={profileMenu} className={Style.profileIconMenu} >
            <div>
                {loggedInUser ? (
                    <div className={Style.profileIconButtonContainer}>
                        <Link onClick={() => handleButtonClick()} href="/profile" className={Style.profileIconButton}>MY PROFILE</Link>
                        <button onClick={handleLogout} className={Style.logoutButton} style={{ marginTop: "10px" }}>LOGOUT</button>
                    </div>
                ) : (
                    <div className={Style.profileIconButtonContainer}>
                        <Link onClick={() => handleButtonClick()} href="/login" className={Style.profileIconButton}>LOGIN</Link>
                        <Link onClick={() => handleButtonClick()} href="/register" className={Style.profileIconButton} style={{ marginTop: "10px" }}>REGISTER</Link>
                    </div>
                )}
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
                        <Link onClick={() => handleButtonClick()} href="/BMICalculator" className={Style.hamburgerLinks}>BMI CALCULATOR</Link>
                        <Link onClick={() => handleButtonClick()} href="/profile" className={Style.hamburgerLinks}>MY PROFILE</Link>
                        <Link onClick={() => handleButtonClick()} href="https://www.myprotein.com/" className={Style.hamburgerLinks}>SHOP (MyProtein.com)</Link>
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


