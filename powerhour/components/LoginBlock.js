import Style from '../styles/LoginBlock.module.css';
import { FaUserAlt, FaKey } from 'react-icons/fa';


//Hide the login button and show the loading div
//TODO: Add a loading animation
function handleLogin(loginButton) {
    console.log("test");
    document.getElementsByClassName(loginButton)[0].style.display = "none";
    document.getElementsByClassName(`${Style.loadingDiv}`)[0].style.visibility = "visible";
}

//The main login block
//TODO: Add a loading animation
//TODO: Add a login function
//TODO: Add a register function
//TODO: Add a forgot password function
export default function LoginBlock() {
    return <>
        <div className={Style.loginBlock}>

            <label className={Style.loginLabel}>LOGIN</label>

            <div className={Style.usernameBlock}>
                <FaUserAlt className={Style.userIcon}/>
                <input required pattern=".*\S.*" type="text" className={Style.usernameInput}></input>
                <label className={Style.usernameLabel}>Username</label>

            </div>
            <div className={Style.passwordBlock}>
                <FaKey className={Style.passwordIcon}/>
                <input required pattern=".*\S.*" type="password" className={Style.passwordInput}></input>
                <label className={Style.passwordLabel}>Password</label>
            </div>
            <div className={Style.buttonDiv}>
                <button className={Style.loginButton}
                    onClick={() => handleLogin(Style.loginButton)}>Login</button>
                <div className={Style.loadingDiv}>

                </div>
            </div>

        </div>
    </>
}