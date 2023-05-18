import Style from '../../styles/LoginBlock.module.css';
import Link from 'next/link';

export default function RegisterBlock() {
    return <>
        <div className={Style.loginBlock}>
            <div style={{ border: "3px" }} className={Style.buttonDiv}>
                <label style={{ fontSize: '28px' }}>New to Power Hour?</label>
                <Link href="/" className={Style.registerButton}>Register now</Link>
            </div>
        </div>


    </>
}