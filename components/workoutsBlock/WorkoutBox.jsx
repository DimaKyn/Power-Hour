"use client"

// WorkoutBox.jsx
import React, { useEffect, useRef, useState } from "react";
import StyleSearchBox from "/styles/SearchBox.module.css";
import Style from "/styles/WorkoutBox.module.css";
import StyleStandard from "/styles/PageStandard.module.css";
import StylePopover from "/styles/SearchBox.module.css"
import { FcCheckmark } from "react-icons/fc";
import { BsArrowsMove } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import { IoMdSave } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import Swal from 'sweetalert2';


//This function is used to update the sets, reps and weight of an exercise
async function updateSetsRepsWeight(typeOfStat, value, exerciseName, workoutName,) {

  try {
    //Create a fetch request to update the sets, reps or weight of an exercise
    let response = await fetch("/api/updateSetsRepsWeight", {
      method: "POST",
      body: JSON.stringify({
        typeOfStat: typeOfStat,
        workoutName: workoutName,
        exerciseName: exerciseName,
        value: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      let json = await response.json();
      console.log(json.message);
      if(json.message.includes("Updated Successfuly")){
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
            title: 'Updated Successfuly'
          })
    } 
    } else {
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
        title: 'Failed to update'
      })
      console.log("Failed to update" + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}
//This function creates the exercise boxes found in pages>workoutName>index.jsx
export default function WorkoutBox(props) {
  //These are the variables that hold the exercise information
  let { title, setsFromProps, repsFromProps, weightFromProps, information, workoutName, } = props;
  const exerciseRef = useRef(null);
  const restoreButton = useRef(null);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [sets, setSets] = useState(setsFromProps);
  const [reps, setReps] = useState(repsFromProps);
  const [weight, setWeight] = useState(weightFromProps);

  //reps, sets, and weight update when the user changes the values
  useEffect(() => {
  }, [reps, sets, weight]);


  //This function updates the state of an exercise (Active or Completed)
  function completeExercise() {
    if (!exerciseCompleted) {
      setExerciseCompleted(true);
      exerciseRef.current.classList = Style.exerciseCompleted;
    } else {
      setExerciseCompleted(false);
      exerciseRef.current.classList = Style.workoutSquareRestore;
    }
  }



  return <>
    {exerciseCompleted && <button ref={restoreButton} className={Style.restoreButton}
      onClick={() => completeExercise()}>Restore</button>}
    <div ref={exerciseRef} className={Style.workoutSquare}>
      <div className="handle-draggable" style={{ height: "40px", width: "40px", position: "absolute", right: 0, top: 0, cursor: "move", zIndex: "11" }}>
        <BsArrowsMove className={Style.moveSquareIcon} />
      </div>

      <div style={{ overflow: "auto", Height: "60px", width: "190px"}}>
        <label style={{ fontSize: "20px", paddingRight: "25px"}}>{title}</label>
      </div>
      <div>
        <Popover className={Style.popoverParent}>
          <PopoverTrigger className={Style.popoverParent}>
            <GrCircleInformation style={{ fontSize: "20px" }} className={StyleSearchBox.informationCircle} />
          </PopoverTrigger>
          <PopoverContent className={StyleSearchBox.popover}>
            <h1 style={{ fontSize: "20px", textAlign: "center", color: "rgb(80, 80, 250)", textDecoration: "underline" }}>{title}</h1>
            <h1 style={{ fontSize: "20px", textAlign: "center", fontWeight: "bold" }}>Instructions</h1>
            <span>{information}</span>
          </PopoverContent>
        </Popover>
        <label style={{}} >{sets} Sets, {reps} reps</label>
      </div>
      <label style={{}} >{weight && <span>Weight: </span>}{weight}</label>


      <div style={{ left: "0", bottom: "0", width: "100%", height: "100%" }}>
        <button className={Style.greenCheckMark}><FcCheckmark className={Style.checkmark} onClick={() => completeExercise()} /></button>
      </div>
      <div className={Style.editPlan} >

        <Popover className={StylePopover.popoverParent}>
          <PopoverTrigger>
            <BiPencil className={Style.editPlan} />
          </PopoverTrigger>
          <PopoverContent className={Style.popoverInfo} style={{ paddingTop: "30px", paddingLeft: "20px" }}>

            <div className={StyleStandard.inputBlock}>
              <input type="number" value={sets} className={StyleStandard.input} onChange={(e) => setSets(e.target.value)} />
              <label className={StyleStandard.inputLabel}>Sets: </label>
              <IoMdSave className={Style.saveButton} onClick={() => updateSetsRepsWeight("sets", sets, title, workoutName)} />
            </div>
            <div className={StyleStandard.inputBlock}>
              <input type="number" value={reps} className={StyleStandard.input} onChange={(e) => setReps(e.target.value)} />
              <label className={StyleStandard.inputLabel}>Reps: </label>
              <IoMdSave className={Style.saveButton} onClick={() => updateSetsRepsWeight("reps", reps, title, workoutName)} />

            </div>
            <div className={StyleStandard.inputBlock}>
              <input type="number" value={weight} className={StyleStandard.input} onChange={(e) => setWeight(e.target.value)} />
              <label className={StyleStandard.inputLabel}>Weight: </label>
              <IoMdSave className={Style.saveButton} onClick={() => updateSetsRepsWeight("weight", weight, title, workoutName)} />

            </div>

          </PopoverContent>
        </Popover>
      </div>
    </div>
  </>

}
