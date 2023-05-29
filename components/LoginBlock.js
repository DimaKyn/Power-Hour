import Style from '/styles/LoginBlock.module.css';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

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
  //console.log(response)
  if (response.error) {
    console.log('User not found');
    // Handle unsuccessful login
  } else {
    console.log('User found:', response.user);
    // Handle successful login
  }
}



export async function handleLogin2(loginButton) {
    console.log("test");

}

//The main login block
//TODO: Add a loading animation
//TODO: Add a login function
//TODO: Add a register function
//TODO: Add a forgot password function
export default function LoginBlock() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
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