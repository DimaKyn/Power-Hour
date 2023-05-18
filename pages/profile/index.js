import Style from '/styles/PageStandard.module.css';
import ProfileActivities from '/components/ProfileActivities';

export default function Profile() {
    return <>
        <div className={Style.backgroundImage}></div>
        <div className={Style.inner}>

            <h1 style={{ fontSize: "min(50px, 3vw)" }}>Welcome back, weakling</h1>

                <ProfileActivities />
                </div>
    </ >
}