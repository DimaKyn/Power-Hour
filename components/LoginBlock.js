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

  const handleLogout = async () => {
    localStorage.removeItem('loggedInUser');
    window.localStorage.clear();
    setIsLoggedIn(false);
    await signOut();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  async function handleLogin() {
    console.log('Trying to find user with identifier:', identifier);
    setLoginText("");
    loadingIconRef.current.classList = Style.loginButtonLoading;

    const response = await signIn('credentials', {
      redirect: false,
      identifier,
      password,
    });

    if (response.error) {
      console.log('User not found');
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
        console.log('Stored:', identifier);
        window.location.href = '/profile'; // redirect to profile page
      }
    }
  }

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
