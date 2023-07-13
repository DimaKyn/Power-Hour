import Style from '/styles/LoginBlock.module.css';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { signIn, signOut } from 'next-auth/react';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { profilePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { useRef } from 'react';
import { BiLoader } from 'react-icons/bi';

//This function is used to add a delay to the login button turning from red back to white
async function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}
// This function is the login, it shows to the user what information he needs to input and saves those inputs
export default function LoginBlock() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const loginButtonRef = useRef(null);
  const incorrectCredentialsLabelRef = useRef(null);
  const [loginText, setLoginText] = useState('Login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loadingIconRef = useRef(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);
  // SignOut users
  const handleLogout = async () => {
    localStorage.removeItem('loggedInUser');
    window.localStorage.clear();
    setIsLoggedIn(false);
    await signOut();
  };
  // Allow keyboard key "Enter" to trigger event
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };
  // Handles login using NextAuth
  async function handleLogin() {
    setLoginText("");
    loadingIconRef.current.classList = Style.loginButtonLoading;

    const response = await signIn('credentials', {
      redirect: false,
      identifier,
      password,
    });

    if (response.error) {
      loginButtonRef.current.classList = Style.loginButtonIncorrectCredentials;
      incorrectCredentialsLabelRef.current.classList = Style.incorrectCredentialsLabelShow;
      loadingIconRef.current.classList = Style.loginButtonIconIdle;
      setLoginText("Login");
      await sleep(1000);
      loginButtonRef.current.classList = Style.loginButton;
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('loggedInUser', identifier);
        window.location.href = '/profile'; // redirect to profile page
      }
    }
  }
  // If user is not logged in, we hide most of the content and tell him to login
  if (!isLoggedIn) {
    return (
      <>
        <div className={Style.loginBlock}>
          <label className={Style.loginLabel}>LOGIN</label>
          <div className={Style.usernameBlock}>
            <FaUserAlt className={Style.userIcon} />
            <input
              required
              pattern=".*\S.*"
              type="text"
              className={Style.usernameInput}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <label className={Style.usernameLabel}>Username/Email</label>
          </div>
          <div className={Style.passwordBlock}>
            <FaKey className={Style.passwordIcon} />
            <input
              required
              pattern=".*\S.*"
              type="password"
              className={Style.passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <label className={Style.passwordLabel}>Password</label>
          </div>
          <div className={Style.buttonDiv}>
            <button
              ref={loginButtonRef}
              className={Style.loginButton}
              onClick={handleLogin}
            >
              <div ref={loadingIconRef} className={Style.loginButtonIconIdle}>
                <BiLoader />
              </div>
              {loginText}
            </button>
            <label ref={incorrectCredentialsLabelRef} className={Style.incorrectCredentialsLabel}>
              Incorrect Username or Password
            </label>
            <label style={{ fontSize: '28px', color: "rgba(80, 80, 250, 1)" }}>
              New to Power Hour?
            </label>
            <Link href="/register" className={Style.registerButton}>
              Register now
            </Link>
          </div>
        </div>
      </>
    );
  }
  // If user is logged in, we show him the content. meaning he has a profile page.
  return (
    <>
      <NavigationPanel links={profilePanelLinks} />
      <div className={Style.inner}>
        {isLoggedIn ? (
          <>
            <div className={Style.guide}>
              <h1>Welcome, {localStorage.getItem('loggedInUser')}!</h1>
              <h2 className={Style.guideH2}>How to use our website</h2>
              <p className={Style.guideP}>Here are some tips on how to get the most out of PowerHour:</p>
              <ul className={Style.guideUl}>
                <li>Use the stopwatch to time your workouts.</li>
                <li>Track your progress by logging your workouts.</li>
                <li>Check out our exercise library for ideas on new exercises to try.</li>
              </ul>
            </div>
            <div className={Style.buttonDiv}>
              <button className={Style.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <ProfileActivities />
        )}
      </div>
    </>
  );
}
