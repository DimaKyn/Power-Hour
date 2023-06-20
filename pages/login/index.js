
import Style from '/styles/PageStandard.module.css';
import LoginBlock from '/components/LoginBlock';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { LoginLinks } from '/components/navigationPanel/NavigationPanelLinksList';

export default function Login() {
    return <div className={Style.innerLogin}>
        <NavigationPanel links={LoginLinks} />
        <LoginBlock />
    </div>
}