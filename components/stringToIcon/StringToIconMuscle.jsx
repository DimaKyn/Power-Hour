import {GiPull, GiShoulderArmor, GiAbdominalArmor, GiLeg, GiFemaleLegs, GiBiceps, GiLegArmor, GiChestArmor, GiForearm, GiPeach, GiNecklaceDisplay, GiWeightLiftingUp, GiArm} from "react-icons/gi";
import {MdOutlineAirlineSeatLegroomExtra} from "react-icons/md";
import {VscTriangleDown} from "react-icons/vsc";

const icons = {
    "abdominals": <GiAbdominalArmor/>,
    "abductors": <GiFemaleLegs/>,
    "adductors": <GiLeg/>,
    "biceps": <GiBiceps/>,
    "calves": <GiLegArmor/>,
    "chest": <GiChestArmor/>,
    "forearms": <GiForearm/>,
    "glutes": <GiPeach/>,
    "shoulders": <GiShoulderArmor/>,
    "lower back": <GiPull/>,
    "middle back": <GiPull/>,
    "hamstrings": <GiPeach/>,
    "lats": <VscTriangleDown/>,
    "neck": <GiNecklaceDisplay/>,
    "quadriceps": <MdOutlineAirlineSeatLegroomExtra/>,
    "traps": <GiWeightLiftingUp/>,
    "triceps": <GiArm/>,
}

// This function returns the icon component that matches the string passed to it
export function StringToIconMuscle(wantedIconName) {
    var {exerciseInput} = wantedIconName;
    var muscleWithSpaces = exerciseInput.replace('\_', ' ');
    return icons[muscleWithSpaces];
}