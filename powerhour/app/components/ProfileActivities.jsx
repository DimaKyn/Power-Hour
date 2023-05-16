import Style from "/styles/ProfileActivities.module.css";
import Link from "next/link";

export default function ProfileActivities() {
    return <div className={Style.buttonContainer}>
        <button className={Style.button}>CREATE WORKOUT</button>
        <button className={Style.button}>START WORKOUT</button>
        <button className={Style.button}>UPDATE PERSONAL INFO</button>
        <Link href="./custom_workout" className={Style.button}>DEMO OF WORKOUT</Link>
    </div>
}