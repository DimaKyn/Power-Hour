import Style from '../styles/LoginBlock.module.css';
import { useRef } from 'react';

function handleClick(labelClass) {
    const label = document.getElementsByClassName(labelClass)[0];
    console.log("clicked");
    console.log(label);
    label.style.animation = "";
}



export default function LoginBlock() {
    const labelRef = useRef(null);
    return <>
    <div className={Style.loginBlock}>
          <label ref={labelRef} className={Style.loginLabel}>LOGIN</label>
          <button onClick={() => handleClick(Style.loginLabel)}>ff</button>
          <label className={Style.usernameLabel}>USERNAME</label>
          <input type="text" className={Style.username} onClick={() => handleClick(Style.usernameLabel)} placeholder=""></input>
          <label className={Style.passwordLabel}>PASSWORD</label>
          <input type="password" className={Style.password} onClick={() => handleClick(Style.passwordLabel)} placeholder=""></input>
        </div>
    </>
}