import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { createCustomWorkoutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import Style from '/styles/PageStandard.module.css';
import SearchBox from '/components/searchBox/SearchBox';
import Tooltip from '@mui/material/Tooltip';

// Define the constants for the exercise details
const nameOfExercise = "Name of the exercise, can be long or short"
const typeOfExercise = "Type of the exercise, possible values: \"Cardio\", \"Olympic Wightlifting\", \"Plyometrics\", \"Powerlifting\", \"Strength\", \"Stretching\", \"Strongman\"";
const muscleOfExercise = "The activated muscle, possible values: \"Abdominals\", \"Abductors\", \"Adductors\", \"Biceps\", \"Calves\", \"Chest\", \"Forearms\", \"Glutes\", \"Hamstrings\", \"Lats\", \"Lower Back\", \"Middle Back\", \"Neck\", \"Quadriceps\", \"Traps\", \"Triceps\"";
const difficultyOfExercise = "Possible values: \"Beginner\", \"Intermediate\", or \"Advanced\"";

// Define the CreateCustomWorkout component as the default export
export default function CreateCustomWorkout() {

    return <>
        <NavigationPanel links={createCustomWorkoutPanelLinks} /> {/* Render the NavigationPanel component with the createCustomWorkoutPanelLinks */}
        <div className={Style.inner}>
            <label className={Style.mainLabel}>Create Workout</label> {/* Render the main label */}
            <span style={{ wordWrap: "nowrap", textAlign: "center", fontSize: "15px" }}>{"Search an exercise by "}
                <Tooltip className={Style.tooltip} title={nameOfExercise}>
                    <span className={Style.tooltipHoverTextInformation}>name</span>
                </Tooltip>
                {", "}
                <Tooltip className={Style.tooltip} title={difficultyOfExercise}>
                    <span className={Style.tooltipHoverTextInformation}>difficulty</span>
                </Tooltip>
                {", "}
                <Tooltip className={Style.tooltip} title={muscleOfExercise}>
                    <span className={Style.tooltipHoverTextInformation}>muscle</span>
                </Tooltip>
                {", or "}
                <Tooltip className={Style.tooltip} title={typeOfExercise}>
                    <span className={Style.tooltipHoverTextInformation}>type</span>
                </Tooltip>

                {". Then, "}
                <Tooltip className={Style.tooltip} title={"Add exercises to your custom workout by pressing on the \"+\" Icon. Saved exercises will appear in Profile> Custom Exercises."}>
                    <span className={Style.tooltipHoverTextInformation}>save the workout!</span>
                </Tooltip>
                </span>
                

            <div className={Style.innerRow}>
                <SearchBox className={Style.searchBoxInner} ></SearchBox>
                <div className={Style.workouts}></div>
            </div>
        </div>
    </>
}