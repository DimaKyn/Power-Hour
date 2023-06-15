import Style from '../../styles/LoginBlock.module.css';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RegisterBlock() {
    const router = useRouter();

    const handleRedirect = () => {
      const redirectUrl = sessionStorage.getItem('redirectUrl');
      if (redirectUrl) {
        // Clear the redirect URL from session storage
        sessionStorage.removeItem('redirectUrl');
        // Redirect to the specified URL
        router.push(redirectUrl);
      } else {
        router.push('/'); // Redirect to '/' if no redirect URL is present
      }
    };

  return (
    <div className={Style.loginBlock}>
      <div style={{ border: '3px' }} className={Style.buttonDiv}>
        <label style={{ fontSize: '28px' }}>New to Power Hour?</label>
        <Link href="/">
          <a className={Style.registerButton} onClick={handleRedirect}>
            Register now
          </a>
        </Link>
      </div>
    </div>
  );
}
