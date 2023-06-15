import {FcHighBattery, FcChargeBattery, FcLowBattery} from 'react-icons/fc';

const icons = {
    "beginner": <FcLowBattery/>,
    "intermediate": <FcHighBattery/>,
    "expert": <FcChargeBattery/>
}

export function StringToIconDifficulty(wantedIconName) { 
    const {exerciseInput} = wantedIconName;
    return icons[exerciseInput];
}