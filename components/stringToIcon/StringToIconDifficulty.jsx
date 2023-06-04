import {FcMiddleBattery, FcFullBattery, FcChargeBattery} from 'react-icons/fc';

const icons = {
    "beginner": <FcMiddleBattery/>,
    "intermediate": <FcFullBattery/>,
    "expert": <FcChargeBattery/>,
}

export function StringToIconDifficulty(wantedIconName) { 
    const {exerciseInput} = wantedIconName;
    return icons[exerciseInput];
}