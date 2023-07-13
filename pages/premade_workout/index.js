"use client"
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import WorkoutContainer from '/components/WorkoutContainer';
import StyleStandard from '/styles/PageStandard.module.css';
import Style from '/styles/WorkoutContainer.module.css';
import exercise from "data/exercises.json";
import Style2 from'/styles/PremadeWorkout.module.css';
import NavigationPanel from "/components/navigationPanel/NavigationPanel";
import { PreMadeWorkoutsLinks } from "/components/navigationPanel/NavigationPanelLinksList";

export default function PremadeWorkout() {
    const headline = "Premade Workouts for a Push, Pull, Leg Workout Routine";
    const explanation = "The push-pull-legs workout routine is a popular training split that divides the body into three main muscle groups: push muscles, pull muscles, and leg muscles. The idea behind this routine is to train each muscle group separately, allowing for more focused and efficient workouts.";
    
    return (
      <div className={StyleStandard.inner}>
        <NavigationPanel links={PreMadeWorkoutsLinks} />

        <label className={StyleStandard.mainLabel}>{headline}</label>
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
        <div>
          <p className={Style2.p}>{explanation}</p>
        </div>
      </div>
    );
}
