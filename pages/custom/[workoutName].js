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
import { useState, useCallback, useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { BsArrowsMove } from "react-icons/bs";



const ResponsiveGridLayout = WidthProvider(Responsive);

export default function CustomWorkout() {
    const [parsedExercise, setParsedExercise] = useState(null);
    const [workout, setWorkout] = useState(null);
    const [layouts, setLayouts] = useState();
    const handleLayoutChange = useCallback((layout, layouts) => setLayouts(layouts));

    let storedExercise;
    useEffect(() => {
        storedExercise = localStorage.getItem('exercises');
        const storedWorkout = localStorage.getItem('workout');
        if (storedExercise) {
            setParsedExercise(JSON.parse(storedExercise));
        }
        if (storedWorkout) {
            setWorkout(storedWorkout);
        }
    }, []);

    return <>
        <NavigationPanel links={customWorkoutPanelLinks} />
        <div className={Style.innerScrollable}>
            <div className={Style.mainLabelDiv}>
                <label className={Style.mainLabel}>{workout}</label>
            </div>
            <div className={Style.textWithIconInTheMiddle}>
                <span className={Style.spanTextWithIconInTheMiddle}>Move the blocks by dragging the&nbsp;</span>
                <BsArrowsMove className={Style.spanTextWithIconInTheMiddle} />
                <span className={Style.spanTextWithIconInTheMiddle}>&nbsp;icon</span>

            </div>

            <div className={Style.draggablesContainer}>
                <ResponsiveGridLayout
                    layouts={layouts}
                    onLayoutChange={handleLayoutChange}
                    className={Style.gridLayout}
                    draggableHandle=".handle-draggable"
                    breakpoints={{ lg: 1550, md: 1200, sm: 800, xs: 530, xxs: 300 }}
                    cols={{ lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 }}
                >
                    {parsedExercise && parsedExercise.map((exercise, index) => (

                        <div key={index.toString()} data-grid={{ x: index, y: 0, w: 1, h: 1, minW: 1, maxW: 1, maxH: 1, minH: 1 }} className={Style.gridElement}>
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