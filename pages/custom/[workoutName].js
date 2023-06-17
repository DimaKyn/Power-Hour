import WorkoutBox from '/components/workoutsBlock/WorkoutBox';
import Style from '/styles/PageStandard.module.css';
import StyleDraggable from '/styles/WorkoutBox.module.css';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { customWorkoutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import StopWatch from 'components/StopWatch.jsx';
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from 'react-grid-layout';
import Layouts from 'react-grid-layout'; // using @types/react-grid-layout
import { useState, useCallback } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const ResponsiveGridLayout = WidthProvider(Responsive);

export default function CustomWorkout() {
    const exercise = localStorage.getItem('exercises');
    const workout = localStorage.getItem('workout')
    const parsedExercise = JSON.parse(exercise);
    const [layouts, setLayouts] = useState();
    const handleLayoutChange = useCallback((layout, layouts) => setLayouts(layouts));

    return <>
        <NavigationPanel links={customWorkoutPanelLinks} />
        <div className={Style.innerScrollable}>
            <label className={Style.mainLabel}>{workout}</label>
            <span>Exercise blocks can be moved freely</span>

            <div className={Style.draggablesContainer}>
                <ResponsiveGridLayout 
                    layouts={layouts}
                    onLayoutChange={handleLayoutChange}
                    className={Style.gridLayout}
                    draggableHandle=".handle-draggable"
                    breakpoints={{ lg: 1550, md: 1200, sm: 800, xs: 530, xxs: 300 }}
                    cols={{ lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 }}
                >
                    {parsedExercise.map((exercise, index) => (
                        <div key={index.toString()} data-grid={{ x: 1, y: 1, w: 1, h: 1, minW: 1, maxW: 1, maxH: 1, minH: 1}} className={Style.gridElement}>
                            <WorkoutBox
                                title={exercise.name}
                                sets={exercise.sets}
                                reps={exercise.reps}
                                weight={exercise.weight}
                                workoutName={workout}
                                containerName={"workoutBox"}
                            />
                        </div>
                    ))}
                </ResponsiveGridLayout>
                <StopWatch />
            </div>
        </div >
    </>
}