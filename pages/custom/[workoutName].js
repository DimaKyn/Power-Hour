import WorkoutBox from '/components/workoutsBlock/WorkoutBox';
import Style from '/styles/PageStandard.module.css';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { customWorkoutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import StopWatch from 'components/StopWatch.jsx';
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function CustomWorkout() {
    const exercise = localStorage.getItem('exercises');
    const workout = localStorage.getItem('workout')
    const parsedExercise = JSON.parse(exercise);

    // size may also be a plain string using the presets 'large' or 'compact'
    const size = {
        width: '100%',
        height: 300,
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'


    return <>
        <NavigationPanel links={customWorkoutPanelLinks} />
        <div className={Style.inner}>
            <label className={Style.mainLabel}>{workout}</label>
            <span>Workout blocks can be moved freely</span>

            <div className={Style.draggablesContainer}>
                <ResponsiveGridLayout
                    className={Style.gridLayout}
                    breakpoints={{ lg: 1500, md: 1000, sm: 750, xs: 500, xxs: 250 }}
                    cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
                >
                    {parsedExercise.map((exercise, index) => (
                        <div key={index.toString()} data-grid={{ x: 0, y: 0, w: 1, h: 2, minW: 1, maxW: 1 }} className={Style.gridElement}>
                            <WorkoutBox
                                title={exercise.name}
                                reps={exercise.reps}
                                sets={exercise.sets}
                                // imageSrc={exercise.imageSrc}
                                // imageHeight={exercise.imageHeight}
                                // imageWidth={exercise.imageWidth}
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