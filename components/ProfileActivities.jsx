import Style from "/styles/ProfileActivities.module.css";
import Link from "next/link";
import { GiBiceps } from "react-icons/gi";
import { BsPlusLg, BsGraphUpArrow } from "react-icons/bs";
import { VscDebugStart } from "react-icons/vsc";



export default function ProfileActivities() {
    return <div className={Style.profileContainer}>
        <div className={Style.profilePicture}></div>
        <div className={Style.buttonContainer}>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px" }}>Check out a workout</h1>
                <span className={Style.span}>Choose a plan from a dozen of our available workouts.</span>
                <Link href="./premade_workout" className={Style.button}>
                    <VscDebugStart style={{ justifyContent: "center", position: "center", paddingRight: "10px", fontSize: "30px" }} />
                    Browse Workouts</Link>

            </div>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px" }}>Feeling creative?</h1>
                <span className={Style.span}>Create the perfect routine to suit your style, technique, preferences and workout needs. <br />Browse from hundreds of available exercises.</span>
                <Link href="./create_custom_workout" className={Style.button}>
                    <BsPlusLg style={{ justifyContent: "center", position: "center", paddingRight: "10px", fontSize: "30px" }} />
                    Create Workout</Link>
            </div>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px", testAlign: "center" }}>Browse custom workouts</h1>

                <span className={Style.span}>Start a workout that you built for yourself.</span>
                <Link href="./custom" className={Style.button}>
                    <GiBiceps style={{ justifyContent: "center", position: "center", paddingRight: "10px", fontSize: "30px" }} />
                    Custom Workouts</Link>
            </div>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px" }}>For you</h1>
                <span className={Style.span}>Track your progress, Keep tabs on what's important.</span>
                <Link href="/" className={Style.button}>
                    <BsGraphUpArrow style={{ justifyContent: "center", position: "center", paddingRight: "10px", fontSize: "30px" }} />
                    Update Progress</Link>
            </div>
        </div>
    </div>
}