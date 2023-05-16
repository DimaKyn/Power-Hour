import Style from '../../styles/LoginBlock.module.css';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import Link from 'next/link';


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
                <label className={Style.usernameLabel}>Username/Email</label>

            </div>
            <div className={Style.passwordBlock}>
                <FaKey className={Style.passwordIcon}/>
                <input required pattern=".*\S.*" type="password" className={Style.passwordInput}></input>
                <label className={Style.passwordLabel}>Password</label>
            </div>
            <Link href="/">Forgot your password?</Link>
            <div style={{}} className={Style.buttonDiv}>
                <button className={Style.loginButton}
                    onClick={() => handleLogin(Style.loginButton)}>Login</button>
            </div>
            <div className={Style.loginBlock}>
                <div style={{border:"3px"}} className={Style.buttonDiv}>
                <label style={{fontSize: '28px'}}>New to Power Hour?</label>
                <Link href="/" className={Style.registerButton}>Register now</Link>
            </div>
        </div>
        </div>

        
    </>
}