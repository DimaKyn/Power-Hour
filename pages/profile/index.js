import { useState, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import Style from '/styles/PageStandard.module.css';
import ProfileActivities from '/components/ProfileActivities';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { profilePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';

// Define the Profile component as the default export
export default function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Define the state for the logged in user
  const { data: session, status } = useSession(); // Get the session data and status using the useSession hook

  useEffect(() => {
    if (status === 'authenticated') {
      setLoggedInUser(session.user); // Set the logged in user
      localStorage.setItem('username', session.user.username); // Store the username in the local storage
    }
  }, [session, status]);

  return (<>
    <NavigationPanel links={profilePanelLinks} />
    <div className={Style.inner}>
      <label className={Style.mainLabel} >
        Welcome back {loggedInUser ? ', ' + loggedInUser.name.charAt(0).toUpperCase() + loggedInUser.name.slice(1) : ''}
      </label>
      <ProfileActivities /> {/* Render the ProfileActivities component */}
    </div>

  </>
  );
}
