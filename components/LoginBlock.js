import Style from '/styles/LoginBlock.module.css';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { signIn, signOut} from 'next-auth/react';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { profilePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';

//Hide the login button and show the loading div
//TODO: Add a loading animation


// Update the handleLogin function
async function handleLogin(loginButton, identifier, password) {
  console.log('Trying to find user with identifier:', identifier);

  const response = await signIn('credentials', {
    redirect: false,
    identifier,
    password,
  });
  console.log(response)
  if (response.error) {
    console.log('User not found');
    // Handle unsuccessful login
  } else {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', identifier);
      console.log('Stored:', identifier);
      window.location.href = '/profile'; // redirect to profile page
    }
  }
}

//The main login block
//TODO: Add a loading animation
//TODO: Add a login function
//TODO: Add a register function
//TODO: Add a forgot password function
export default function LoginBlock() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');


  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  if(!isLoggedIn){
    return <>
        <div className={Style.loginBlock}>

            <label className={Style.loginLabel}>LOGIN</label>

            <div className={Style.usernameBlock}>
                <FaUserAlt className={Style.userIcon} />
                <input required pattern=".*\S.*" type="text" className={Style.usernameInput} value={identifier} onChange={(e) => setIdentifier(e.target.value)}></input>
                <label className={Style.usernameLabel}>Username/Email</label>
            </div>
            <div className={Style.passwordBlock}>
                <FaKey className={Style.passwordIcon} />
                <input required pattern=".*\S.*" type="password" className={Style.passwordInput} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label className={Style.passwordLabel}>Password</label>
            </div>
            <Link className={Style.forgotPassword} href="/">Forgot your password?</Link>
            <div className={Style.buttonDiv}>
                <button className={Style.loginButton}
                    onClick={() => handleLogin(Style.loginButton, identifier, password)}>Login</button>
                <label style={{ fontSize: '28px' , color: "rgba(252, 203, 6, 0.8)"}}>New to Power Hour?</label>
                <Link href="/register" className={Style.registerButton}>Register now</Link>
            </div>
        </div>
    </>
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
              <button className={Style.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <ProfileActivities />
        )}
      </div>
    </>
  );
}