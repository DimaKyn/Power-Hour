import React from 'react';
import Style from './WorkoutContainer.module.css';

const WorkoutContainer = ({ workoutName, exercises }) => {
  return (
    <div className={Style.container}>
      <h2>{workoutName}</h2>
      <div className={Style.exercisesContainer}>
        {exercises.map(exercise => (
          <div key={exercise.id} className={Style.exercise}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <img src={exercise.imageUrl} alt={exercise.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutContainer;
