import WorkoutBox from '/components/workoutsBlock/WorkoutBox';
import Style from '/styles/PageStandard.module.css';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { customWorkoutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';
import { useState } from 'react';
import Draggable from 'react-draggable';

export default function CustomWorkout() {
    const workoutData = [
        { id: 'a', x: 0, y: 0, title: "Deadlift", reps: "3 X 8 REPS", weight: "120KG", imageSrc: "/../public/lift.jpg", imageHeight: 100, imageWidth: 200 },
        { id: 'b', x: 1, y: 0, title: "Lifelift", reps: "why do you even try", weight: "120KG", imageSrc: "/../public/lift.jpg", imageHeight: 100, imageWidth: 200 },
        { id: 'c', x: 2, y: 0, title: "Doyouevenlift", reps: "Like really, do you?", weight: "120KG", imageSrc: "/../public/lift.jpg", imageHeight: 100, imageWidth: 200 },
    ];

    const [blocks, setBlocks] = useState(workoutData);

    function onChange(sourceId, sourceIndex, targetIndex) {
        const nextState = swap(blocks, sourceIndex, targetIndex);
        setBlocks(nextState);
    }

    return <>
        <NavigationPanel links={customWorkoutPanelLinks} />
        <div className={Style.inner}>
            <label className={Style.mainLabel}>Custom Workout</label>
            <span>Workout blocks can be moved freely</span>
            <div className={Style.draggablesContainer}>
                <GridContextProvider onChange={onChange}>
                    {/* TODO: Fetch custom workouts for this specific workout from database*/}
                    {blocks.map(block => (
                        <Draggable>
                            <WorkoutBox title={block.title} reps={block.reps} weight={block.weight} imageSrc={block.imageSrc} imageHeight={block.imageHeight} imageWidth={block.imageWidth} />

                        </Draggable>
                    ))}
                </GridContextProvider>
            </div>
        </div >
    </>
}