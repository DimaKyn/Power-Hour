import { useState } from 'react';
import Style from '/styles/PageStandard.module.css';
import FormStyle from '/styles/RegisterForm.module.css';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { registerPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { useSession } from "next-auth/react";
import { signIn, signOut } from 'next-auth/react';
import Swal from 'sweetalert2';
import { RxLetterCaseUppercase } from 'react-icons/rx';
import { AiOutlineMail } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import { AiOutlinePhone } from 'react-icons/ai';
import { useRef } from 'react';
import { BiLoader } from 'react-icons/bi';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  //These are the variables needed to animate a loading animation on the register button
  const [registerText, setRegisterText] = useState('Register');
  const registerButtonRef = useRef(null);
  const loadingIconRef = useRef(null);

  function handleLoading() {
    setRegisterText("");
    loadingIconRef.current.classList = FormStyle.registerButtonLoading;
  }

  // Reset the loading animation
  function displayRegisterText() {
    setRegisterText("Register");
    loadingIconRef.current.classList = FormStyle.registerButtonIdle;
  }


  const handleSubmit = async (e) => {
    //Display loading animation
    handleLoading();

    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        phoneNumber,
      }),
    });
    const responseText = await response.text();
    console.log("Response text:", responseText);

    const data = JSON.parse(responseText);

    const responseLogin = await signIn('credentials', {
      redirect: false,
      identifier: username,
      password: password,
    });

    if (response.error || !responseText.includes("User registered successfully")) {
      if (responseText.includes("All fields are required")) {
        displayRegisterText();
        Swal.fire({
          icon: 'error',
          width: 400,
          height: 100,
          title: 'Unsuccessful registration',
          text: 'All fields are required!',
          // You can customize the appearance of the alert further using other options
        });
      }

      else if (responseText.includes("Username already exists")) {
        displayRegisterText();

        Swal.fire({
          icon: 'error',
          width: 400,
          height: 100,
          title: 'Unsuccessful registration',
          text: 'Username already exists!',
          // You can customize the appearance of the alert further using other options
        });

      }

      else if (responseText.includes("Email already exists")) {
        displayRegisterText();
        setRegisterButtonText();
        Swal.fire({
          icon: 'error',
          width: 400,
          height: 100,
          title: 'Unsuccessful registration',
          text: 'Email already exists!',
          // You can customize the appearance of the alert further using other options
        });
      }

      // Handle errors, e.g., show an error message
      console.log("Unsuccessful registration")
    } else if (!responseLogin.error) {
      // Handle successful registration, e.g., show a success message or redirect the user
      // Swal.fire({
      //   position: 'top',
      //   icon: 'success',
      //   title: 'Successful registration',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      console.log("Successful registration")
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', username);
      console.log('Stored:', username);
      window.location.href = '/profile'; // redirect to profile page
      //window.location.href = '/';
    }
  };

  return (
    <>
      <NavigationPanel links={registerPanelLinks} />

      <div className={Style.inner}>
        <label className={Style.mainLabel}>Create An Account</label>
        <div className={FormStyle.wrapper}>
          <div className={FormStyle.formContainer}>
            <form onSubmit={handleSubmit}>
              <div className={FormStyle.block}>
                <RxLetterCaseUppercase className={FormStyle.icons} />
                <input
                  type="text"
                  id="name"
                  required pattern=".*\S.*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={FormStyle.userInput}
                />
                <label className={FormStyle.blockLabel} htmlFor="name">Name</label>
              </div>
              <div className={FormStyle.block}>
                <FaUserAlt className={FormStyle.icons} />
                <input
                  type="text"
                  id="username"
                  required pattern=".*\S.*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={FormStyle.userInput}
                />
                <label className={FormStyle.blockLabel} htmlFor="username">Username</label>
              </div>
              <div className={FormStyle.block}>
                <AiOutlineMail className={FormStyle.icons} />
                <input
                  type="email"
                  id="email"
                  required placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={FormStyle.userInput}
                />
                <label className={FormStyle.blockLabel} htmlFor="email">Email</label>

              </div>
              <div className={FormStyle.block}>
                <MdPassword className={FormStyle.icons} />
                <input
                  type="password"
                  id="password"
                  required pattern=".*\S.*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={FormStyle.userInput}
                />
                <label className={FormStyle.blockLabel} htmlFor="password">Password</label>

              </div>
              <div className={FormStyle.block}>
                <AiOutlinePhone className={FormStyle.icons} />
                <input
                  type="tel"
                  id="phone"
                  required pattern=".*\S.*"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={FormStyle.userInput}
                />
                <label className={FormStyle.blockLabel} htmlFor="phone">Phone Number</label>

              </div>
              <div className={FormStyle.buttonDiv}>
                <button ref={registerButtonRef} className={FormStyle.submitButton}>
                  {<div ref={loadingIconRef} className={FormStyle.registerButtonIdle}><BiLoader /></div>}
                  {registerText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}
