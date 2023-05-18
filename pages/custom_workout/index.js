import WorkoutBox from '/components/workoutsBlock/WorkoutBox';
import Style from '/styles/PageStandard.module.css';

export default function CustomWorkout() {
    return <>
        <div className={Style.backgroundImage}></div>
        <div className={Style.inner}>

            <label className={Style.mainLabel}>Custom Workout page</label>
            {/* TODO: Fetch custom workouts for this specific workout from database*/}
            <WorkoutBox title="Deadlift" explanation="best exercise to ever exist" imageSrc="/../public/lift.jpg" imageHeight={100} imageWidth={200} />
            <WorkoutBox title="Lifelift" explanation="why do you even try" imageSrc="/../public/lift.jpg" imageHeight={100} imageWidth={200} />
            <WorkoutBox title="Doyouevenlift" explanation="Like really, do you?" imageSrc="/../public/lift.jpg" imageHeight={100} imageWidth={200} />
        </div>

    </>


}