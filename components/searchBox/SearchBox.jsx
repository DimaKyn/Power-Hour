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
            return <div className={Style.exercise} key={index}>

                <div className={Style.infoBlock}>

                    <h1 style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: "bold" }}>{exercise.name}</h1>
                    <h2>Type: {exercise.type.charAt(0).toUpperCase() + exercise.type.replaceAll("\_", " ").slice(1)}</h2>
                    <h3>Muscle: {exercise.muscle.charAt(0).toUpperCase() + exercise.muscle.replaceAll("\_", " ").slice(1)}</h3>
                    <h3>Difficulty: {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}</h3>
                    <div className={Style.repetitionsSetsAdd}>

                        <div className={Style.setsRepsLabel}>
                            <label style={{ marginLeft: "10px", color: "rgba(252, 203, 26, 1)" }}>Sets</label>
                            <input type="number" style={{ paddingLeft: "5px" }} min="0" max="500" placeholder="3" className={Style.reps}></input>
                        </div>
                        <div className={Style.setsRepsLabel}>
                            <label style={{ marginLeft: "10px", color: "rgba(252, 203, 26, 1)" }}>Reps</label>

                            <input type="number" style={{ paddingLeft: "5px" }} min="0" max="1000" placeholder="10" className={Style.reps}></input>
                        </div>
                    </div>
                </div>
                <div className={Style.exerciseIcons}>
                    <StringToIconType style={{ marginTop: "10px" }} exerciseInput={exercise.type} />
                    <StringToIconMuscle style={{ marginTop: "10px" }} exerciseInput={exercise.muscle} />
                    <StringToIconDifficulty style={{ marginTop: "10px" }} exerciseInput={exercise.difficulty} />
                    <div className={Style.infoIcon}>
                        <GrCircleInformation style={{ marginTop: "10px" }} className={Style.informationCircle} />
                    </div>
                </div>
                <div className={Style.buttonDiv}>
                    <AiOutlinePlus className={Style.plusIcon} />
                    <button key={index} onClick={() => addExercise(exercise, index)} className={Style.addButton}></button>
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
                <span style={{ width: "100%", fontSize: "30px", fontWeight: "bold", padding: "10px", borderTop: "2px solid white", borderBottom: "2px solid white" }}>CHOSEN EXERCISES</span>

                <div className={Style.chosenExercises}>
                    {addedExercises.map((exercise, index) => {
                        return addExerciseToBottomDiv(exercise, index);
                    })}
                </div>

            </div>
        </>
    }

    //This function adds an exercise to the bottom div
    function addExerciseToBottomDiv(exercise, index) {
        return <div className={Style.exercise} key={index}>
            <div className={Style.infoBlock}>
                <div className={Style.h1block}>
                    <h1 style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: "bold", width: "100px" }}>{exercise.name}</h1>
                </div>
                <div className={Style.setsRepsLabel}>
                    <div className={Style.infoIcon}>
                        <GrCircleInformation style={{ fontSize: "30px", marginRight: "10px" }} className={Style.informationCircle} />
                    </div>
                    X Sets
                    X Reps
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
