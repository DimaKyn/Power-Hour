
import Style from '/styles/PageStandard.module.css';
import LoginBlock from '/components/LoginBlock';

export default function Login() {
    return <div className={Style.innerLogin}>
        <LoginBlock />
    </div>
}