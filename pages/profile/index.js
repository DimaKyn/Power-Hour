import Style from '/styles/PageStandard.module.css';
import ProfileActivities from '/components/ProfileActivities';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { profilePanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';


export default function Profile() {
    return <>
        <NavigationPanel links={profilePanelLinks} />
        <div className={Style.inner}>

            <h1 style={{ fontSize: "min(50px, 3vw)" }}>Welcome back, weakling</h1>

            <ProfileActivities />
        </div>
    </ >
}