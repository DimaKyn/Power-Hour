import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { createCustomWorkoutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import Style from '/styles/PageStandard.module.css';
import SearchBox from '/components/searchBox/SearchBox';

import { useRef ,forwardRef, useImperativeHandle } from 'react';


export default function CreateCustomWorkout() {

    return <>
        <NavigationPanel links={createCustomWorkoutPanelLinks} />
        <div className={Style.inner}>
            <label className={Style.mainLabel}>Create Workout</label>
            <div className={Style.innerRow}>
                <SearchBox className={Style.searchBoxInner} ></SearchBox>
                <div className={Style.workouts}></div>
            </div>
        </div>
    </>
}