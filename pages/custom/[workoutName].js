import WorkoutBox from '/components/workoutsBlock/WorkoutBox';
import Style from '/styles/PageStandard.module.css';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { customWorkoutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import StopWatch from 'components/StopWatch.jsx';
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useState, useCallback, useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { BsArrowsMove } from "react-icons/bs";
import { useWindowSize } from "@uidotdev/usehooks";


const ResponsiveGridLayout = WidthProvider(Responsive); // Creating a responsive grid layout using the WidthProvider and Responsive components

// Define the CustomWorkout component as the default export
export default function CustomWorkout() {
    const [parsedExercise, setParsedExercise] = useState(null);
    const [workout, setWorkout] = useState(null);
    const [layouts, setLayouts] = useState();
    const [lastIndex, setLastIndex] = useState(0);
    const handleLayoutChange = useCallback((layout, layouts) => setLayouts(layouts));
    const windowSize = useWindowSize();


    // Function to return the index based on the window size
    function returnIndexBasedOnWindowSize() {
        if (windowSize.width >= 1550) {
            return 6;
        }
        else if (windowSize.width >= 1200 && windowSize.width < 1550) {
            return 4;
        }
        else if (windowSize.width >= 800 && windowSize.width < 1200) {
            return 3;
        }
        else if (windowSize.width >= 530 && windowSize.width < 800) {
            return 2;
        }
        else {
            return 1;
        }
    }

    let storedExercise;
    useEffect(() => {
        storedExercise = localStorage.getItem('exercises'); // Get the stored exercises from local storage
        const storedWorkout = localStorage.getItem('workout'); // Get the stored workout from local storage
        if (storedExercise) {
            setParsedExercise(JSON.parse(storedExercise));
            setLastIndex(JSON.parse(storedExercise).length);
        }
        if (storedWorkout) {
            setWorkout(storedWorkout); // Set the stored workout
        }
    }, []);

    return <>
        <NavigationPanel links={customWorkoutPanelLinks} />
        <div className={Style.innerForGrid}>
            <div className={Style.mainLabelDiv2}><label className={Style.mainLabel2}>{workout}</label></div>
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
                        < div key={index.toString()} data-grid={{ x: index % returnIndexBasedOnWindowSize(), y: Math.floor(index / 4), w: 1, h: 1, minW: 1, maxW: 1, maxH: 1, minH: 1 }} className={Style.gridElement}>
                            <WorkoutBox
                                title={exercise.name}
                                setsFromProps={exercise.sets}
                                repsFromProps={exercise.reps}
                                weightFromProps={exercise.weight ?? "0"}
                                information={exercise.info}
                                workoutName={workout}
                            />
                        </div>
                    ))}

                    < div key={lastIndex.toString()} data-grid={{ x: lastIndex % returnIndexBasedOnWindowSize(), y: Math.floor(lastIndex / 4), w: 1, h: 1, minW: 1, maxW: 1, maxH: 1, minH: 1 }} className={Style.lastGridElement}>
                            <WorkoutBox
                                title=""
                                setsFromProps=""
                                repsFromProps=""
                                weightFromProps=""
                                information=""
                                workoutName=""
                            />
                        </div>

                </ResponsiveGridLayout>
                <StopWatch/>
            </div >
        </div >
    </>
}