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

class WorkoutBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={Style.wrapper} draggable onDrop={() => handleDrop(index)} 
      onDragStart={() => handleDragStart(index)} onDragOver={() => handleDragOver()}>
        <h3>{this.props.title}</h3>
        <p>{this.props.explanation}</p>
        <Image src={this.props.imageSrc} width={this.props.imageWidth} height={this.props.imageHeight} />
      </div>
    );
  }
}

export default WorkoutBox;