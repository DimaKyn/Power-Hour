import { useState } from 'react';
import Style from '/styles/PageStandard.module.css';
import FormStyle from '/styles/RegisterForm.module.css';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { registerPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { useSession } from "next-auth/react";
import { signIn, signOut } from 'next-auth/react';
import Swal from 'sweetalert2';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
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
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
          <div className={FormStyle.block}>
            <label className={FormStyle.blockLabel} htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={FormStyle.userInput}
            />
          </div>
          <div className={FormStyle.block}>
            <label className={FormStyle.blockLabel} htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={FormStyle.userInput}
            />
          </div>
          <div className={FormStyle.block}>
            <label className={FormStyle.blockLabel} htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={FormStyle.userInput}
            />
          </div>
          <div className={FormStyle.block}>
            <label className={FormStyle.blockLabel} htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={FormStyle.userInput}
            />
          </div>
          <div className={FormStyle.block}>
            <label className={FormStyle.blockLabel} htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={FormStyle.userInput}
            />
          </div>
          <button type="submit" className={FormStyle.submitButton}>Register</button>
        </form>
      </div>
    </>
  );
}
