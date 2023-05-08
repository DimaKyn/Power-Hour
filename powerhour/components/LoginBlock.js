import Style from '../styles/LoginBlock.module.css';
import { useRef } from 'react';

function handleClickUsername(labelClass) {
    focusedUsername = true;
}

function handleClickPassword(labelClass) {
    focusedPassword = true;
}

function handleLogin(loginButton) {
    console.log("test");
    document.getElementsByClassName(loginButton)[0].style.display = "none";
    document.getElementsByClassName(`${Style.loadingDiv}`)[0].style.visibility = "visible";
}

let focusedUsername = false;
let focusedPassword = false;




export default function LoginBlock() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);


    return <>
        <div className={Style.loginBlock}>
            <label className={Style.loginLabel}>LOGIN</label>

            <label className={Style.usernameLabel}>USERNAME</label>
            <input ref={usernameRef} type="text" className={Style.username} onClick={handleClickUsername} placeholder=""></input>
            <label className={Style.passwordLabel}>PASSWORD</label>
            <input ref={passwordRef} type="password" className={Style.password} onClick={handleClickPassword} placeholder=""></input>
            <div className={Style.buttonDiv}>
                <button className={Style.loginButton}
                    onClick={() => handleLogin(Style.loginButton)}>Login</button>
                <div className={Style.loadingDiv}>
                    <ion-icon name="refresh-outline" size="large"></ion-icon>
                </div>
            </div>

        </div>
    </>
}