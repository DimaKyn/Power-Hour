import React from 'react';
import Style from '/styles/WorkoutContainer.module.css';

const WorkoutContainer = ({ workoutName, category }) => {
    const workout = category.find(workout => workout.name === workoutName);
    const exercises = workout ? workout.exercises : [];
    
    return (
        <div className={Style.container}>
            <h2 className={Style.h2}>{workoutName}</h2>
            <div className={Style.exercisesContainer}>
                {exercises.map(exercise => (
                    <div key={exercise.id}>
                        <h3 className={Style.h3}>{exercise.name}</h3>
                        <p className={Style.p}>{exercise.sets} {exercise.reps}</p>
                        <img src={exercise.imageUrl} alt={exercise.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutContainer;
