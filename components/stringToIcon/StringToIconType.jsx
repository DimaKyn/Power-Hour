import {FaRunning} from "react-icons/fa";
import {GiWeightLiftingUp, GiJumpAcross, GiStrongMan, GiStrong} from "react-icons/gi";
import {TbStretching} from "react-icons/tb";

//This file is used to convert a string to an icon. Used to display the type of an exercise.
const icons = {
    "cardio": <FaRunning/>,
    "olympic weightlifting": <GiWeightLiftingUp/>,
    "plyometrics": <GiJumpAcross/>,
    "powerlifting": <GiStrongMan/>,
    "strength": <GiStrong/>,
    "stretching": <TbStretching/>,
    "strongman": <GiStrongMan/>,
}

// This function returns the icon component that matches the string passed to it
export function StringToIconType(wantedIconName) {
    const {exerciseInput} = wantedIconName;
    var typeWithSpaces = exerciseInput.replace('\_', ' ');
    return icons[typeWithSpaces];
}