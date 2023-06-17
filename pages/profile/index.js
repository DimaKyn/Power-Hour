import { useState, useEffect } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import Style from '/styles/PageStandard.module.css';
import StyleProfile from '/styles/ProfileActivities.module.css';
import ProfileActivities from '/components/ProfileActivities';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { profilePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';

export default function Profile() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      setLoggedInUser(session.user);
      localStorage.setItem('username', session.user.username);
    }
  }, [session, status]);

  return (<>
    <NavigationPanel links={profilePanelLinks} />
    <div className={Style.inner}>
      <label className={Style.mainLabel} >
        Welcome back {loggedInUser ? ', ' + loggedInUser.name : ''}
      </label>
      <ProfileActivities />
    </div>

  </>
  );
}
