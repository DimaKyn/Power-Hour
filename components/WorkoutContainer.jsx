import React, { useState } from 'react';
import Style from '/styles/WorkoutContainer.module.css';
import Swal from "sweetalert2";

// Function to save the workout to the database
async function saveWorkoutToDB(workoutName, exercises) {
  // Create a workout object with the workout name and an empty array for exercises
  var workout = {
    workoutName: workoutName,
    exercises: []
  };

  // Iterate through each exercise and add it to the workout object
  exercises.forEach(exercise => {
    
    workout.exercises.push({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: "0",
      info: exercise.instructions
    });
  })
  try {
    // Send a POST request to the server to add the workout to the database
    let response = await fetch('/api/addWorkoutToDB', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });
    
    // Display a success toast notification
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Saved workout successfully'
    })
  } catch (error) {
    console.log("Encountered an error adding workout:", error);
  }
  
}

// Component for each exercise in the workout
const Exercise = ({ exercise }) => {
  // State variables
  const [setsReps, setSetsReps] = useState({ sets: exercise.sets, reps: exercise.reps });
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Function to handle changes in sets and reps input fields
  const handleSetsRepsChange = (event) => {
    const value = parseInt(event.target.value);
    const name = event.target.name;
    if (!isNaN(value) && value >= 0) {
      setSetsReps(prevState => ({ ...prevState, [name]: value }));
    }
  };

  // Function to handle edit button click
  const handleEditClick = () => {
    setEditing(!editing);
  };

  // Function to handle save button click
  const handleSaveClick = () => {
    setIsSaving(true);
  };


  return (
    <div className={Style.entireExercise}>
      <h3 className={Style.h3}>{exercise.name}</h3>
      {editing ? (
        <div>
          <div>
            <label >3 Sets</label>
            <input
              type="number"
              name="sets"
              value={setsReps.sets}
              onChange={handleSetsRepsChange}
              className={Style.inputBlack}
            />
          </div>
          <div >
            <label >Reps:</label>
            <input
              type="number"
              name="reps"
              value={setsReps.reps}
              onChange={handleSetsRepsChange}
              className={Style.inputBlack}
            />
          </div>
          {isSaving ? (
            <button className={Style.button}>Saving...</button>
          ) : (
            <button className={Style.button} onClick={handleSaveClick}>
              Save
            </button>
          )}
        </div>
      ) : (
        <div>
          <p className={Style.p}>
            {"3 Sets, "} {"10 Reps"}
          </p>
        </div>
      )}
      <img src={exercise.imageUrl} alt={exercise.name} />
    </div>
  );
};

// Component for the workout container
const WorkoutContainer = ({ workoutName, category }) => {
  // Find the workout based on the workout name
  const workout = category.find((workout) => workout.name === workoutName);
  const exercises = workout ? workout.exercises : [];

  return (
    <div className={Style.container}>
      <h2 className={Style.h2}>{workoutName}</h2>
      <div className={Style.exercisesContainer}>
        {/* Map through each exercise and render the Exercise component */}
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <Exercise exercise={exercise} />
          </div>
        ))}
      </div>
      <div className={Style.buttonContainer}>
        <button className={Style.button} onClick={() => saveWorkoutToDB(workoutName, exercises)}>Save workout</button>
      </div>
    </div>
  );
};

export default WorkoutContainer;
