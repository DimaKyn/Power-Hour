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
import { useSession } from 'next-auth/react'
import { BsArrowUpShort } from "react-icons/bs";
import StyleArrowDiv from "/styles/ArrowDiv.module.css";

export default function Navbar() {
    //Variables for the hamburger menu
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    const [hamburgerCloserHidden, setHamburgerCloserHidden] = useState(true);
    const hamburgerMenu = useRef(null);
    const navbar = useRef(null);
    const lowerOpacityHamburgerOpen = useRef(null);

    //Variables for the profile icon menu
    const profileMenu = useRef(null);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    //Variables for local user information
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { data: session, status } = useSession();

    //Hook to set the username in local storage
    useEffect(() => {
        if (status === 'authenticated') {
            setLoggedInUser(session.user);
            localStorage.setItem('username', session.user.username);
        }
    }, [session, status]);

    //Hook to update isLoggedIn state
    useEffect(() => {
        if (loggedInUser) {
            setIsLoggedIn(true);
        }
    }, []);

    //This function handles a logout, if the user agrees, executes logout
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
                //Sign out of next-auth
                await signOut();
                window.location.href = '/';
            }
        });
    };

    //This function makes the hamburger menu close if you click outside the hamburger menu
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

    //This function handles the profile icon menu opening and closing
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
        {/*Arrow div*/}
        {!loggedInUser && (
            <>
                <div className={StyleArrowDiv.arrowDiv}>
                    <BsArrowUpShort />
                </div>
                <label className={StyleArrowDiv.loginArrowDiv}>LOGIN</label>
                <label className={StyleArrowDiv.loginArrowDiv2}>NOW</label>
            </>
        )}
        {/*End Arrow div */}
        <div ref={lowerOpacityHamburgerOpen} className={Style.lowerOpacityHamburgerOpen}
            onClick={() => handleLowerOpacityClick()}></div>
        <div ref={navbar} className={Style.wrapper}>
            {/*Navbar*/}
            {!hamburgerMenuOpen && <GiHamburgerMenu className={Style.hamburger} onClick={() => handleHamburgerClick()} />}
            {!hamburgerCloserHidden &&
                <CgClose className={Style.hamburgerCloser} onClick={() => handleHamburgerClick()} />}
            <div className={Style.rightSide}>
                <div className={Style.logo}>
                    <div className={Style.logoContainer}>
                        <Link onClick={() => handleButtonClick()} style={{ height: "100%", width: "100%", cursor: "pointer", position: "absolute" }} href="/"></Link>
                        <Image
                            style={{ pointerEvents: "none" }}
                            src="/static/images/pwrhwrlogo.png"
                            alt="PowerHour logo"
                            fill="responsive"
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


            <div className={Style.profileIconButtonContainer}>
                {loggedInUser ? (
                    <>
                        <div style={{ fontSize: "15px", fontWeight: "bold", paddingBottom: "5px", marginTop: "-10px" }}>
                            {loggedInUser.name.charAt(0).toUpperCase() + loggedInUser.name.slice(1)}
                        </div>
                        <Link onClick={() => handleButtonClick()} href="/profile" className={Style.profileIconButton}>MY PROFILE</Link>
                        <button onClick={handleLogout} className={Style.logoutButton} style={{ marginTop: "10px" }}>LOGOUT</button>
                    </>
                ) : (
                    <>
                        <Link onClick={() => handleButtonClick()} href="/login" className={Style.profileIconButton}>LOGIN</Link>
                        <Link onClick={() => handleButtonClick()} href="/register" className={Style.profileIconButton} style={{ marginTop: "10px" }}>REGISTER</Link>
                    </>
                )}
            </div>
        </div >
        {/*Hamburger Menu*/}
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
                    {loggedInUser ? (
                        <div className={Style.iconContainer}>
                            <Link onClick={() => handleButtonClick()} href="/profile">
                                <BsFillPersonFill />
                            </Link>

                        </div>
                    ) : (
                        <div className={Style.iconContainer}>
                            <Link onClick={() => handleButtonClick()} href="/login">
                                <BsFillPersonFill />
                            </Link>

                        </div>
                    )}
                </div>


                {loggedInUser ? (
                    <div className={Style.hamburgerLinksContainer}>
                        <Link onClick={() => handleButtonClick()} href="/workouts" className={Style.hamburgerLinks}>WORKOUTS</Link>
                        <Link onClick={() => handleButtonClick()} href="/BMICalculator" className={Style.hamburgerLinks}>BMI CALCULATOR</Link>
                        <Link onClick={() => handleButtonClick()} href="/profile" className={Style.hamburgerLinks}>MY PROFILE</Link>
                        <Link onClick={() => handleButtonClick()} href="https://www.myprotein.com/" className={Style.hamburgerLinks}>SHOP MyProtein.com</Link>
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


