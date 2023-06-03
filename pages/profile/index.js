import Style from '/styles/PageStandard.module.css';
import ProfileActivities from '/components/ProfileActivities';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { profilePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { useState, useEffect } from 'react';

export default function Profile() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('loggedInUser');
            setLoggedInUser(user);
            }
        }, []);
    return <>
        <NavigationPanel links={profilePanelLinks} />
        <div className={Style.inner}>

            <h1 style={{ fontSize: "min(50px, 3vw)" }}>Welcome back {loggedInUser}</h1>

            <ProfileActivities />
        </div>
    </ >
}