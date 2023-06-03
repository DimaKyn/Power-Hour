"use client"
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import WorkoutContainer from '/components/WorkoutContainer';
import Style from '/styles/WorkoutContainer.module.css';
import exercise from "exercises.json"


export default function PremadeWorkout() {

    console.log(exercise)
    return (
        <div className={Style.containerWrapper}>
            <div className={Style.containerV2}>
                <WorkoutContainer workoutName="Pull Day" category={exercise} />
            </div>
            <div className={Style.containerV2}>
                <WorkoutContainer workoutName="Push Day" category={exercise} />
            </div>
            <div className={Style.containerV2}>
                <WorkoutContainer workoutName="Leg Day" category={exercise} />
            </div>
        </div>
    );
}
