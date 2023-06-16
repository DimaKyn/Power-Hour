import Style from "/styles/SearchBox.module.css";
import StyleStandard from "/styles/PageStandard.module.css";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { StringToIconMuscle } from "/components/stringToIcon/StringToIconMuscle";
import { StringToIconDifficulty } from "/components/stringToIcon/StringToIconDifficulty";
import { StringToIconType } from "/components/stringToIcon/StringToIconType";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useRef } from "react";
import { VscArrowSwap } from "react-icons/vsc";


//TODO: implement save by username
async function workoutToDB(addedExercises, workoutName) {
    var workout = {
        workoutName: workoutName,
        exercises: []
    };
    addedExercises.forEach((exercise) => {
        const exerciseInfo = {
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            info: exercise.instructions,
        };
        workout.exercises.push({ exerciseInfo });
    })
    try {
        let response = await fetch('/api/addWorkoutToDB', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        console.log(response);
    } catch (error) {
        console.log("Encountered an error adding workout:", error);
    }
}


//Fetch a list of (maximum 10) workouts from the ninja API based on the attribute of the workout
function fetchWorkoutByAttribute(inputValue, attribute) {
    console.log(api_url + attribute + inputValue);
    return fetch(api_url + attribute + inputValue, {
        headers: {
            'X-Api-Key': "oh+RWDOk74XjoYD3nBn99A==COJtYSEfL5CGiH65"
        }
    }).then(response => response.json()).then(data => {
        return data;
    }).catch(error => {
        console.log(error);
        return null;
    });
}

const api_url = "https://api.api-ninjas.com/v1/exercises?";
const listOfSearchableVariables = ["name=", "type=", "muscle=", "difficulty="];

export default function SearchBox() {
    const [stringInput, setStringInput] = useState('');
    const [listOfExercises, setListOfWorkouts] = useState([]);
    const [addedExercises, setAddedExercises] = useState([]);

    const [workoutName, setWorkoutName] = useState('');


    function saveWorkout(workoutName) {
        if (workoutName === '') {
            alert("Please enter a workout name");
            return;
        }
        workoutToDB(addedExercises, workoutName);
    }

    return SearchBoxInner();

    //This is the function which displays a searchbox
    function SearchBoxInner() {

        // Update the value of the stringInput variable and then search for a workout
        async function handleInputUpdate(event) {
            //Clear the list of workouts
            setListOfWorkouts([]);
            const inputValue = event.target.value;
            setStringInput(inputValue);
            for (let i = 0; i < 1; i++) {
                const response = await fetchWorkoutByAttribute(inputValue, listOfSearchableVariables[i]);
                if (response) {
                    setListOfWorkouts(response);
                }
            }
        }

        //This function removes the chosen exercise to add from the search box and adds it to the bottom div
        function addExercise(exercise, index) {
            setAddedExercises([...addedExercises, exercise]);
            setListOfWorkouts(listOfExercises.filter((item) => item !== exercise));
            return addExerciseToBottomDiv(exercise, index);
        }

        //This function adds an exercise to the search results
        function exerciseBlock(exercise, index) {
            return <>
                <div className={Style.exercise} key={index}>

                    <div className={Style.infoBlock}>

                        <h1 style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: "bold" }}>{exercise.name}</h1>
                        <h2>Type: {exercise.type.charAt(0).toUpperCase() + exercise.type.replaceAll("\_", " ").slice(1)}</h2>
                        <h3>Muscle: {exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.replaceAll("\_", " ").slice(1)}</h3>
                        <h3>Difficulty: {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}</h3>
                        <div className={Style.repetitionsSetsAdd}>

                            <div className={Style.setsRepsLabel}>
                                <label style={{ marginLeft: "10px", color: "rgba(75, 75, 170, 1)" }}>Sets</label>
                                <input type="number" style={{ paddingLeft: "5px" }} min="0" max="500" placeholder="3" className={Style.reps}></input>
                            </div>
                            <div className={Style.setsRepsLabel}>
                                <label style={{ marginLeft: "10px", color: "rgba(75, 75, 170, 1)" }}>Reps</label>

                                <input type="number" style={{ paddingLeft: "5px" }} min="0" max="1000" placeholder="10" className={Style.reps}></input>
                            </div>
                        </div>
                    </div>
                    <div className={Style.exerciseIcons}>
                        <StringToIconType style={{ marginTop: "10px" }} exerciseInput={exercise.type} />
                        <StringToIconMuscle style={{ marginTop: "10px" }} exerciseInput={exercise.muscle} />
                        <StringToIconDifficulty style={{ marginTop: "10px" }} exerciseInput={exercise.difficulty} />
                        <Popover className={Style.popoverParent}>
                            <PopoverTrigger >
                                <GrCircleInformation style={{ marginTop: "10px" }} className={Style.informationCircle} />
                            </PopoverTrigger>
                            <PopoverContent className={Style.popover}>
                                <h1 style={{ fontSize: "30px" }}>INSTRUCTIONS</h1>
                                <span>{exercise.instructions}</span></PopoverContent>
                        </Popover>

                    </div>

                    <div className={Style.buttonDiv}>
                        <AiOutlinePlus className={Style.plusIcon} />
                        <button key={index} onClick={() => addExercise(exercise, index)} className={Style.addButton}></button>
                    </div>
                </div>
            </>
        }


        return <>
            <div className={Style.searchBoxInner}>
                <div className={Style.inputDiv}>
                    <BiSearch className={Style.magnifyingGlass} />
                    <input type="text" placeholder="Search for an exercise" className={Style.inputTextBox}
                        value={stringInput} onInput={(event) => { handleInputUpdate(event) }} />
                </div>
                <div className={Style.searchResults}>
                    {listOfExercises.map((exercise, index) => {
                        return exerciseBlock(exercise, index);
                    })}
                </div>
            </div>

            <div className={Style.divider}>
                <VscArrowSwap style={{ fontSize: '50px', margin: "20px" }} className={Style.arrows} />
            </div>
            <div className={Style.chosenExercises}>
                <div className={Style.upperLabel}>
                    <label className={Style.labelChosenExercises}>Chosen Exercises</label>
                    <input value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} style={{ color: "black" }}></input>
                    <button onClick={() => saveWorkout(workoutName)} style={{ backgroundColor: "blue" }}>Save to db</button>
                    <button style={{ backgroundColor: "red" }}>clear</button>
                </div>
                <div style={{ top: "50px", position: "absolute", bottom: "50px" }}>
                    {addedExercises.map((exercise, index) => {
                        return addExerciseToBottomDiv(exercise, index);
                    })}
                </div>

            </div>

        </>
    }

    //This function adds an exercise to the bottom div
    function addExerciseToBottomDiv(exercise, index) {

        return <div className={Style.exerciseAdded} key={index}>
            <div className={Style.infoBlockAdded}>
                <div className={Style.setsRepsLabelAdded}>
                    <span style={{ textAlign: "center", fontSize: "20px", textTransform: "uppercase", fontWeight: "bold", wordWrap: "wrap", width: "250px" }}>{exercise.name}</span>
                    <label>X Sets X Reps</label>
                    <div className={Style.repetitionsSetsAdd} style={{ padding: "0" }}>
                        <StringToIconType style={{ fontSize: "70px" }} exerciseInput={exercise.type} />
                        <StringToIconMuscle style={{ fontSize: "70px" }} exerciseInput={exercise.muscle} />
                        <StringToIconDifficulty style={{ fontSize: "70px" }} exerciseInput={exercise.difficulty} />
                    </div>

                </div>
            </div>

            <div className={Style.infoBlockBottomDiv}>
                <MdDeleteForever className={Style.trashIcon} />
                <button key={index} onClick={() => { remove(exercise, addedExercises); }} className={Style.removeButton}></button>
            </div>
        </div>
    }

    //This function removes an exercise from the search box and adds it to the bottom div
    function remove(exercise, arrayToRemoveFrom) {
        console.log("Trying to remove " + exercise.name);
        console.log(arrayToRemoveFrom);
        setAddedExercises(addedExercises.filter((item) => item !== exercise));
        setListOfWorkouts([...listOfExercises, exercise]);
    }
}
