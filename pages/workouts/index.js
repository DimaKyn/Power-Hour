import Style from '/styles/PageStandard.module.css';
import WorkoutsBlocks from '/components/workoutsBlock/WorkoutsBlocks';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import {workoutsPanelLinks} from '/components/navigationPanel/NavigationPanelLinksList';
import GridLayout from 'react-grid-layout';
import WorkoutBox from '/components/workoutsBlock/WorkoutBox';

export default function workouts() {
    const layout = [
        { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
        { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];

    return <>
        <NavigationPanel links={workoutsPanelLinks} />

        <div className={Style.inner}>
            <label className={Style.mainLabel}>WORKOUTS</label>
            <WorkoutsBlocks />
        </div>
    </>
}