import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { createCustomWorkoutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import Style from '/styles/PageStandard.module.css';
import SearchBox from '/components/searchBox/SearchBox';



export default function CreateCustomWorkout() { 

    return <>
         <NavigationPanel links={createCustomWorkoutPanelLinks} />
        <div className={Style.inner}>
            <label className={Style.mainLabel}>Create Custom</label>
            <SearchBox className={Style.searchBox}></SearchBox>
            <div className={Style.workouts}></div>
        </div>
    </>
}