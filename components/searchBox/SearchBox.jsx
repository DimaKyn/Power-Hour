import Style from "/styles/SearchBox.module.css";
import { BsPencilSquare } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { StringToIconMuscle } from "/components/stringToIcon/StringToIconMuscle";
import { StringToIconDifficulty } from "/components/stringToIcon/StringToIconDifficulty";
import { StringToIconType } from "/components/stringToIcon/StringToIconType";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { VscArrowSwap } from "react-icons/vsc";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { ImSpinner6 } from "react-icons/im";

//This function adds a workout to the database
async function workoutToDB(addedExercises, workoutName) {
    var workout = {
        workoutName: workoutName,
        exercises: []
    };
    //For every exercise chosen, add it to the current workout
    addedExercises.forEach((exercise) => {

        workout.exercises.push({
            name: exercise.name,
            sets: "3",
            reps: "10",
            info: exercise.instructions,
            weight: "0",
        });
    })
    //Send the workout to the database
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
        console.log(response.message);
        if (response.message.includes("Workout added")) {
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
        }
    } catch (error) {
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
            icon: 'error',
            title: 'Encountered an error adding workout'
        })
        console.log("Encountered an error adding workout:", error);
    }
}


//Fetch a list of workouts from the ninja API based on the attribute of the workout
function fetchWorkoutByAttribute(inputValue, attribute) {
    //Fetch url is of the form "https://api.api-ninjas.com/v1/exercises? + "muscle=" + "chest" for example
    console.log(api_url + attribute + inputValue);
    return fetch(api_url + attribute + inputValue, {
        headers: {
            'X-Api-Key': "oh+RWDOk74XjoYD3nBn99A==COJtYSEfL5CGiH65"
        }
    }).then(response => response.json()).then(data => {
        //If the fetch is successful, return the exercises
        return data;
    }).catch(error => {
        //If the fetch is unsuccessful, return null
        console.log(error);
        return null;
    });
}

//This is the url for the ninja api
const api_url = "https://api.api-ninjas.com/v1/exercises?";
const listOfSearchableVariables = ["name=", "type=", "muscle=", "difficulty="];

export default function SearchBox() {
    const [stringInput, setStringInput] = useState('');
    const [listOfExercises, setListOfExercises] = useState([]);
    const [addedExercises, setAddedExercises] = useState([]);
    const [workoutName, setWorkoutName] = useState('');
    const [loading, setLoading] = useState(false);

    //This function handles saving the workout to the database
    async function saveWorkout(workoutName) {
        setLoading(true);
        //Displays alert if no workout name has been entered
        if (workoutName === '') {
            Swal.fire({
                title: 'No workout name entered',
                text: "Enter a workout name to save a workout",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Okay',
            });
            return;
        }
        //Displays alert if no exercises have been added
        if (addedExercises.length === 0) {
            Swal.fire({
                title: 'No exercises added',
                text: "Add at least one exercise to save a workout",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Okay',
            });
            return;
        }
        //Handles saving the workout to the database
        await workoutToDB(addedExercises, workoutName);
        setLoading(false);
    }

    return SearchBoxInner();

    //This is the function which displays a searchbox
    function SearchBoxInner() {

        // Update the value of the stringInput variable and then search for a workout
        async function handleInputUpdate(event) {
            const inputValue = event.target.value;
            setStringInput(inputValue);
            //Clear the list of workouts
            setListOfExercises([]);
            for (let i = 0; i < 1; i++) {
                const response = await fetchWorkoutByAttribute(inputValue, listOfSearchableVariables[i]);
                if (response) {
                    for (let j = 0; j < response.length; j++) {
                        setListOfExercises(prevListOfExercises => [...prevListOfExercises, response[j]]);
                    }
                }
            }
            setListOfExercises(prevListOfExercises => [...prevListOfExercises.reverse()]);
        }

        //This function removes the chosen exercise to add from the search box and adds it to the bottom div
        function addExercise(exercise, index, sets, reps) {
            setAddedExercises([...addedExercises, exercise]);
            setListOfExercises(listOfExercises.filter((item) => item !== exercise));
            return addExerciseToBottomDiv(exercise, index);
        }

        //This function creates an exercise and adds it to the search results
        function exerciseBlock(exercise, index) {
            return <div key={index}>
                <div className={Style.exercise} >
                    <div className={Style.infoBlock}>
                        <Tooltip title={exercise.name} placement="top">
                            <h1 className={Style.exerciseHeader} style={{ textTransform: "uppercase", fontWeight: "bold" }}>{exercise.name}</h1>
                        </Tooltip>

                        <div className={Style.textAndIconsWrapper}>
                            <Tooltip className={Style.tooltip} title={exercise.type.charAt(0).toUpperCase() + exercise.type.replaceAll("\_", " ").slice(1) + " exercise"}>
                                <div className={Style.tooltipIcons}>
                                    <StringToIconType exerciseInput={exercise.type} />
                                </div>
                            </Tooltip>

                            <Tooltip className={Style.tooltip} title={"Targets your " + exercise.muscle.replaceAll("\_", " ")}>
                                <div className={Style.tooltipIcons}>
                                    <StringToIconMuscle exerciseInput={exercise.muscle} />
                                </div>
                            </Tooltip>

                            <Tooltip className={Style.tooltip} title={exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1) + " level"}>
                                <div className={Style.tooltipIcons}>
                                    <StringToIconDifficulty exerciseInput={exercise.difficulty} />
                                </div>
                            </Tooltip>
                        </div>
                        <div className={Style.repetitionsSetsAdd}>
                        </div>
                        <div className={Style.exerciseIcons}>
                            <Popover className={Style.popoverParent}>
                                <PopoverTrigger >
                                    <GrCircleInformation className={Style.informationCircle} />
                                </PopoverTrigger>
                                <PopoverContent className={Style.popover}>
                                    <h1 style={{ fontSize: "20px", textAlign: "center", color: "rgb(80, 80, 250)", textDecoration: "underline" }}>{exercise.name}</h1>
                                    <h1 style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold" }}>Instructions</h1>
                                    <span>{exercise.instructions}</span></PopoverContent>
                            </Popover>
                            <div className={Style.buttonDiv}>
                                <AiOutlinePlus className={Style.plusIcon} />
                                <button key={index} onClick={() => addExercise(exercise, index)} className={Style.addButton}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <div className={Style.fixedNavBottom}></div>
            <div className={Style.divider}>
                <VscArrowSwap style={{ margin: "20px", color: "rgba(80, 80, 250, 1)" }} className={Style.arrows} />
            </div>
            <div className={Style.chosenExercises}>
                <div className={Style.block}>
                    <div className={Style.pencilAndInputDiv}>
                        <BsPencilSquare className={Style.magnifyingGlass} />
                        <input required pattern=".*\S.*" type="text"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                            className={Style.inputWorkoutName}>
                        </input>
                        <label className={Style.blockLabel}>Workout Name</label>
                    </div>
                    <div className={Style.saveButtonDiv}>
                        {!loading && <button onClick={() => saveWorkout(workoutName)} className={Style.saveWorkoutButton}>Save</button>}
                        {loading && <ImSpinner6 className={Style.loadingIcon} />}
                    </div>
                </div>
                <div className={Style.chosenExercisesInner}>
                    {addedExercises.map((exercise, index) => {
                        return addExerciseToBottomDiv(exercise, index);
                    })}
                </div>
            </div>
        </>
    }

    //This function adds an exercise to the bottom/right div
    function addExerciseToBottomDiv(exercise, index) {
        return <div className={Style.exerciseAdded} key={index}>
            <div className={Style.infoBlockAdded}>
                <Tooltip title={exercise.name} placement="top">
                    <h1 className={Style.exerciseHeaderAdded} style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold", wordWrap: "wrap", width: "250px" }}>{exercise.name}</h1>
                </Tooltip>
                <div className={Style.setsRepsLabelAdded}>
                    <div className={Style.repetitionsSetsAdd} >
                        <Tooltip className={Style.tooltip} style={{ fontSize: "25px", marginLeft: "8px", marginRight: "8px" }} title={exercise.type.charAt(0).toUpperCase() + exercise.type.replaceAll("\_", " ").slice(1) + " exercise"}>
                            <div className={Style.tooltipIcons}>
                                <StringToIconType exerciseInput={exercise.type} />
                            </div>
                        </Tooltip>

                        <Tooltip className={Style.tooltip} style={{ fontSize: "25px", marginLeft: "8px", marginRight: "8px" }} title={"Targets your " + exercise.muscle.replaceAll("\_", " ")}>
                            <div className={Style.tooltipIcons}>
                                <StringToIconMuscle exerciseInput={exercise.muscle} />
                            </div>
                        </Tooltip>

                        <Tooltip className={Style.tooltip} style={{ fontSize: "25px", marginLeft: "8px", marginRight: "8px" }} title={exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1) + " level"}>
                            <div className={Style.tooltipIcons}>
                                <StringToIconDifficulty exerciseInput={exercise.difficulty} />
                            </div>
                        </Tooltip>
                        <Popover className={Style.popoverParent}>
                            <PopoverTrigger >
                                <GrCircleInformation style={{ fontSize: "25px", margin: "10px" }} className={Style.informationCircle} />
                            </PopoverTrigger>
                            <PopoverContent className={Style.popover}>
                                <h1 style={{ fontSize: "20px", textAlign: "center", color: "rgb(80, 80, 250)", textDecoration: "underline" }}>{exercise.name}</h1>
                                <h1 style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold" }}>Instructions</h1>
                                <span>{exercise.instructions}</span></PopoverContent>
                        </Popover>
                        <div className={Style.infoBlockBottomDiv}>
                            <MdDeleteForever className={Style.trashIcon} />
                            <button key={index} onClick={() => { remove(exercise, addedExercises); }} className={Style.removeButton}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    //This function removes an exercise from the search box and adds it to the bottom/right div
    function remove(exercise, arrayToRemoveFrom) {
        setAddedExercises(addedExercises.filter((item) => item !== exercise));
        setListOfExercises([...listOfExercises, exercise]);
    }
}
