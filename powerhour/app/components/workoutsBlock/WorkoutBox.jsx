"use client"

// WorkoutBox.jsx
import React from "react";
import Image from "next/image";
import Style from "/styles/WorkoutBox.module.css";

const handleDragStart = (index) => { 
    setDragItemIndex(index);
}

const handleDragOver = event => { 
    event.preventDefault();
}

const handleDrop = (index) => { 
    
}

export default function WorkoutBox(props) {
  const {title, explanation, imageSrc, imageWidth, imageHeight} = props;
  return <div>
    <h3>{title}</h3>
  </div>
}
