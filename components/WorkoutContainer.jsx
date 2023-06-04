import React, { useState } from 'react';
import Style from '/styles/WorkoutContainer.module.css';

const Exercise = ({ exercise }) => {
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);
  const [editing, setEditing] = useState(false);

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleEditClick = () => {
    setEditing(!editing);
  };

  return (
    <div>
      <h3 className={Style.h3}>{exercise.name}</h3>
      {editing ? (
        <div>
          <div>
            <label>Sets:</label>
            <input type="number" value={sets} onChange={handleSetsChange} />
          </div>
          <div>
            <label>Reps:</label>
            <input type="number" value={reps} onChange={handleRepsChange} />
          </div>
          <button onClick={handleEditClick}>Save</button>
        </div>
      ) : (
        <div>
          <p className={Style.p}>
            {exercise.sets} {exercise.reps}
          </p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
      <img src={exercise.imageUrl} alt={exercise.name} />
    </div>
  );
};

const WorkoutContainer = ({ workoutName, category }) => {
  const workout = category.find((workout) => workout.name === workoutName);
  const exercises = workout ? workout.exercises : [];

  return (
    <div className={Style.container}>
      <h2 className={Style.h2}>{workoutName}</h2>
      <div className={Style.exercisesContainer}>
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <Exercise exercise={exercise} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutContainer;
