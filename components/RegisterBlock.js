import Style from '../../styles/LoginBlock.module.css';
import Link from 'next/link';


export default function RegisterBlock() {
  return (
    <div className={Style.loginBlock}>
      <div style={{ border: '3px' }} className={Style.buttonDiv}>
        <label style={{ fontSize: '28px' }}>New to Power Hour?</label>
        <Link href="/">
          <a className={Style.registerButton}>
            Register now
          </a>
        </Link>
      </div>
    </div>
  );
}
