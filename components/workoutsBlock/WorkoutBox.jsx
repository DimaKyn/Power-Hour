"use client"

// WorkoutBox.jsx
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Style from "/styles/WorkoutBox.module.css";
import StyleStandard from "/styles/PageStandard.module.css";
import StylePopover from "/styles/SearchBox.module.css"
import { FcCheckmark } from "react-icons/fc";
import { BsArrowsMove } from "react-icons/bs";
import { BiPencil, BiSave } from "react-icons/bi";
import { IoMdSave } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

async function updateSetsRepsWeight(typeOfStat, workoutName, exerciseName, value) {

  try {
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
      console.log(json);
    } else {
      console.log("Failed to update" + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function WorkoutBox(props) {
  let { title, repsFromProps, setsFromProps, weightFromProps, workoutName, draggableArea, information, containerName } = props;


  const exerciseRef = useRef(null);
  const restoreButton = useRef(null);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [sets, setSets] = useState(setsFromProps);
  const [reps, setReps] = useState(repsFromProps);
  const [weight, setWeight] = useState(weightFromProps);

  useEffect(() => {


  }, [reps, sets, weight]);


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
      <div className="handle-draggable" style={{ height: "40px", width: "40px", position: "absolute", right: 0, top: 0, cursor: "move", zIndex: "11"}}>
        <BsArrowsMove className={Style.moveSquareIcon} />
        </div>
      
      <div style={{ overflow: "auto", Height: "60px" , width: "200px"}}>
        <label style={{ fontSize: "20px", paddingRight: "30px"}}>{title}</label>
      </div>
      <label style={{  }} >{sets} Sets X {reps} reps</label>
      <label style={{  }} >{weight && <span>Weight: </span>}{weight}</label>
      <div style={{ left: "0", bottom: "0", width: "100%", height: "100%" }}>
        <button className={Style.greenCheckMark}><FcCheckmark className={Style.checkmark} onClick={() => completeExercise()} /></button>
      </div>
      <div className={Style.editPlan} >

        <Popover className={StylePopover.popoverParent}>
          <PopoverTrigger>
            <BiPencil className={Style.editPlan} />
          </PopoverTrigger>
          <PopoverContent className={Style.popoverInfo} style={{paddingTop: "30px", paddingLeft: "20px"}}>

            <div className={StyleStandard.inputBlock}>
              <input type="number" value={sets} className={StyleStandard.input} onChange={(e) => setSets(e.target.value)} />
              <label className={StyleStandard.inputLabel}>Sets: </label>
              <IoMdSave className={Style.saveButton} onClick={() => updateSetsRepsWeight("sets", workoutName, title, sets)} />
            </div>
            <div className={StyleStandard.inputBlock}>
              <input type="number" value={reps} className={StyleStandard.input} onChange={(e) => setReps(e.target.value)} />
              <label className={StyleStandard.inputLabel}>Reps: </label>
              <IoMdSave className={Style.saveButton} onClick={() => updateSetsRepsWeight("reps", workoutName, title, reps)} />

            </div>
            <div className={StyleStandard.inputBlock}>
              <input type="number" value={weight} className={StyleStandard.input} onChange={(e) => setWeight(e.target.value)} />
              <label className={StyleStandard.inputLabel}>Weight: </label>
              <IoMdSave className={Style.saveButton} onClick={() => updateSetsRepsWeight("weight", workoutName, title, weight)} />

            </div>

          </PopoverContent></Popover>
      </div>
    </div>
  </>

}
