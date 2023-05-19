import Link from 'next/link';
import Style from '/styles/PageStandard.module.css';
import WorkoutsBlocks from '/components/workoutsBlock/WorkoutsBlocks';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import {workoutsPanelLinks} from '/components/navigationPanel/NavigationPanelLinksList';

export default function workouts() {

    return <>
        <NavigationPanel links={workoutsPanelLinks} />

        <div className={Style.inner}>
            <label className={Style.mainLabel}>WORKOUTS</label>
            <WorkoutsBlocks />
        </div>
    </>
}