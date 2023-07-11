import { useState, useRef } from 'react';
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
import { BiLoader } from 'react-icons/bi';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // These are the variables needed to animate a loading animation on the register button
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
    // Display loading animation
    handleLoading();

    e.preventDefault();

    // Validate inputs
    if (!validateName() || !validatePassword() || !validatePhoneNumber()) {
      displayRegisterText();
      return;
    }

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
        });
      } else if (responseText.includes("Username already exists")) {
        displayRegisterText();

        Swal.fire({
          icon: 'error',
          width: 400,
          height: 100,
          title: 'Unsuccessful registration',
          text: 'Username already exists!',
          // You can customize the appearance of the alert further using other options
        });
      } else if (responseText.includes("Email already exists")) {
        displayRegisterText();
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
    } else if (!responseLogin.error) {
      // Handle successful registration, e.g., show a success message or redirect the user
      // Swal.fire({
      //   position: 'top',
      //   icon: 'success',
      //   title: 'Successful registration',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', username);
      window.location.href = '/profile'; // redirect to profile page
      // window.location.href = '/';
    }
  };

  // Validate the name input
  const validateName = () => {
    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: 'error',
        width: 400,
        height: 100,
        title: 'Invalid name',
        text: 'Name must contain only letters!',
      });
      return false;
    }

    return true;
  };

  // Validate the password input
  const validatePassword = () => {
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      Swal.fire({
        icon: 'error',
        width: 400,
        height: 100,
        title: 'Invalid password',
        text: 'Password must be at least 8 characters long and contain at least one letter and one number!',
      });
      return false;
    }

    return true;
  };

  // Validate the phone number input
  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d+$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      Swal.fire({
        icon: 'error',
        width: 400,
        height: 100,
        title: 'Invalid phone number',
        text: 'Phone number must contain only numbers!',
      });
      return false;
    }

    return true;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
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
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={FormStyle.userInput}
                  onKeyDown={handleKeyDown}
                />
                <label className={FormStyle.blockLabel} htmlFor="name">Name</label>
              </div>
              <div className={FormStyle.block}>
                <FaUserAlt className={FormStyle.icons} />
                <input
                  type="text"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={FormStyle.userInput}
                  onKeyDown={handleKeyDown}
                />
                <label className={FormStyle.blockLabel} htmlFor="username">Username</label>
              </div>
              <div className={FormStyle.block}>
                <AiOutlineMail className={FormStyle.icons} />
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={FormStyle.userInput}
                  onKeyDown={handleKeyDown}
                />
                <label className={FormStyle.blockLabel} htmlFor="email">Email</label>
              </div>
              <div className={FormStyle.block}>
                <MdPassword className={FormStyle.icons} />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={FormStyle.userInput}
                  onKeyDown={handleKeyDown}
                />
                <label className={FormStyle.blockLabel} htmlFor="password">Password</label>
              </div>
              <div className={FormStyle.block}>
                <AiOutlinePhone className={FormStyle.icons} />
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={FormStyle.userInput}
                  onKeyDown={handleKeyDown}
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
