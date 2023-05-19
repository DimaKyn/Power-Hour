import Style from '/styles/PageStandard.module.css';
//Import the navigation panel for this specific page
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { registerPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';



export default function Register() {
    return <>
        <NavigationPanel links={registerPanelLinks} />
        <div className={Style.inner}>Register page</div>
    </>

}