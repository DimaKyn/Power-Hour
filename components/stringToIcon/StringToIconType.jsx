import {FaRunning} from "react-icons/fa";
import {GiWeightLiftingUp, GiJumpAcross, GiStrongMan, GiStrong} from "react-icons/gi";
import {TbStretching} from "react-icons/tb";

const icons = {
    "cardio": <FaRunning/>,
    "olympic weightlifting": <GiWeightLiftingUp/>,
    "plyometrics": <GiJumpAcross/>,
    "powerlifting": <GiStrongMan/>,
    "strength": <GiStrong/>,
    "stretching": <TbStretching/>,
    "strongman": <GiStrongMan/>,
}

export function StringToIconType(wantedIconName) {
    const {exerciseInput} = wantedIconName;
    var typeWithSpaces = exerciseInput.replace('\_', ' ');
    return icons[typeWithSpaces];
}