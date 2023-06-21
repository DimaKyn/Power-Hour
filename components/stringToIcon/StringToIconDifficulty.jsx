import {FcHighBattery, FcChargeBattery, FcLowBattery} from 'react-icons/fc';

//This file is used to convert a string to an icon. Used to display the difficulty of an exercise.
const icons = {
    "beginner": <FcLowBattery/>,
    "intermediate": <FcHighBattery/>,
    "expert": <FcChargeBattery/>
}

//This function returns the icon component that matches the string passed to it
export function StringToIconDifficulty(wantedIconName) { 
    const {exerciseInput} = wantedIconName;
    return icons[exerciseInput];
}