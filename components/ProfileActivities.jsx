import Style from "/styles/ProfileActivities.module.css";
import Link from "next/link";


export default function ProfileActivities() {
    return <div className={Style.profileContainer}>
        <div className={Style.profilePicture}></div>
        <div className={Style.buttonContainer}>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px" }}>Try out a workout</h1>
                <span className={Style.span}>Choose a plan from a dozen of our available workouts.</span>
                <Link href="/" className={Style.button}>Start Workout</Link>

            </div>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px" }}>Feeling creative?</h1>
                <span className={Style.span}>Create the perfect routine to suit your style, technique, preferences and workout needs. <br/>Browse from hundreds of available exercises.</span>
                <Link href="/" className={Style.button}>Create Workout</Link>
            </div>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px" }}>Browse your custom workouts</h1>
                <span className={Style.span}>Start a workout that you built for yourself.</span>
                <Link href="./custom_workout" className={Style.button}>Custom Workouts</Link>
            </div>
            <div className={Style.choiceBlock}>
                <h1 style={{ fontSize: "27px" }}>For you</h1>
                <span className={Style.span}>Track your progress, Keep tabs on what's important.</span>
                <Link href="/" className={Style.button}>Update Progress</Link>
            </div>
        </div>
    </div>
}