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

function handleOnMouseMove(event) {

    const { currentTarget: target } = event;

    const rect = target.getBoundingClientRect(),
        offsetX = event.clientX - rect.left,
        offsetY = event.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${offsetX}px`);
    target.style.setProperty("--mouse-y", `${offsetY}px`);
}


export default function LoginBlock() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    return <>
        <div className={Style.loginBlock}>
            <label className={Style.loginLabel} onMouseMove={handleOnMouseMove}>LOGIN</label>

            <div className={Style.usernameBlock}>
                {/* <ion-icon style={{left: "10px" }} color="white" name="person-outline"></ion-icon> */}
                <input ref={usernameRef} type="text" className={Style.usernameInput} onClick={handleClickUsername} placeholder=""></input>
                <span className={Style.usernameLabel}>Username</span>
            </div>
            <div className={Style.passwordBlock}>
                {/* <ion-icon style={{ left: "10px" }} color="white" name="key-outline"></ion-icon> */}

                <label className={Style.passwordLabel}>
                    Password
                    <input ref={passwordRef} type="password" className={Style.passwordInput} onClick={handleClickPassword} placeholder=""></input>
                </label>


            </div>
            {/* <div className={Style.buttonDiv}>
                <button className={Style.loginButton}
                    onClick={() => handleLogin(Style.loginButton)}>Login</button>
                <div className={Style.loadingDiv}>
                    <ion-icon name="refresh-outline" size="large"></ion-icon>
                </div>
            </div> */}

        </div>
    </>
}