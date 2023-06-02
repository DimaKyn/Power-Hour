"use client"

// WorkoutBox.jsx
import React from "react";
import Image from "next/image";
import Style from "/styles/WorkoutBox.module.css";
import { GrCheckmark } from "react-icons/gr";
import { BsArrowsMove } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";

//TODO: import workout plan from db
export default function WorkoutBox(props) {
  const { title, reps, weight, imageSrc, imageWidth, imageHeight, containerName} = props;
  let containerStatus = containerName === "workoutBox" ? Style.workoutSquare : Style.exerciseCompleted;
  return <div className={containerStatus}>
        <BsArrowsMove className={Style.moveSquareIcon} />
        <h3 style={{ fontSize: "20px" }}>{title}</h3>
        <Image style={{pointerEvents: "none"}} src={imageSrc} width={imageWidth} height={imageHeight} />
        <label style={{pointerEvents: "none"}} >{reps}</label>
        <label style={{pointerEvents: "none"}} >{weight}</label>
        <div style={{ left: "0", bottom: "0", width: "100%", height: "100%" }}>
          <button className={Style.greenCheckMark}><GrCheckmark className={Style.checkmark} /></button>
        </div>
        <BiPencil className={Style.editPlan} />
      </div>
}
