import Style from "/styles/ProfileActivities.module.css";
import Link from "next/link";
import { GiBiceps } from "react-icons/gi";
import { BsPlusLg, BsGraphUpArrow } from "react-icons/bs";
import { VscDebugStart } from "react-icons/vsc";
import React, { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { FcCalculator } from "react-icons/fc";
//This file is simple, it displays the activities the user can do on the profile page, (Browse from pre-made workouts, create your own workout, view your progress, etc.)
export default function ProfileActivities() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileSelected = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const formData = new FormData();
    formData.append("image", file);

    // This code is for uploading the image to db, not working for now
    // try {
    //   const response = await axios.post("/api/addPictureToDB", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   console.log("Image uploaded successfully");
    //   setFile(URL.createObjectURL(file));
    // } catch (error) {
    //   console.error(error);
    // }
    setFile(URL.createObjectURL(file));
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileSelected}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div>
        {!file && (
          <div
            className={Style.button}
            style={{ width: "100%" }}
            onClick={() => fileInputRef.current.click()}
          >
            Upload Profile Picture
          </div>
        )}
        {file && (
          <div
            className={Style.profilePicture}
            style={{
              backgroundImage: `url(${file})`,
              filter: isHovered ? "brightness(70%)" : "none",
            }}
            onClick={() => fileInputRef.current.click()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && (
              <div className={Style.overlay}>
                <FaPlus className={Style.plusIcon} />
                <span className={Style.label}>Update Picture</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={Style.buttonContainer}>
        <div className={Style.choiceBlock}>
          <h1 style={{ fontSize: "27px", textAlign: "center" }}>
            Create A Workout
          </h1>
          <span className={Style.span}>
            Create the perfect routine to suit your style, technique,
            preferences and workout needs. <br />
          </span>
          <Link href="./create_custom_workout" className={Style.button}>
            <BsPlusLg
              style={{
                justifyContent: "center",
                position: "center",
                paddingRight: "10px",
                fontSize: "30px",
              }}
            />
            Create Workout
          </Link>
        </div>
        <div className={Style.choiceBlock}>
          <h1 style={{ fontSize: "27px", textAlign: "center" }}>
            Pre-made Workouts
          </h1>
          <span className={Style.span}>
            Choose a plan from a few of our available workouts.
          </span>
          <Link href="./premade_workout" className={Style.button}>
            <VscDebugStart
              style={{
                justifyContent: "center",
                position: "center",
                paddingRight: "10px",
                fontSize: "30px",
              }}
            />
            Browse Workouts
          </Link>
        </div>
        <div className={Style.choiceBlock}>
          <h1 style={{ fontSize: "27px", textAlign: "center" }}>
            Saved Workouts
          </h1>

          <span className={Style.span}>
            Start a workout that you built for yourself.
          </span>
          <Link href="./custom" className={Style.button}>
            <GiBiceps
              style={{
                justifyContent: "center",
                position: "center",
                paddingRight: "10px",
                fontSize: "30px",
              }}
            />
            My Workouts
          </Link>
        </div>
        <div className={Style.choiceBlock}>
          <h1 style={{ fontSize: "27px", textAlign: "center" }}>My Weight Progress</h1>
          <span className={Style.span}>
            Track your weight progress, Keep tabs on what's important.
          </span>
          <Link href="./personal_details" className={Style.button}>
            <BsGraphUpArrow
              style={{
                justifyContent: "center",
                position: "center",
                paddingRight: "10px",
                fontSize: "30px",
              }}
            />
            Update Weight Progress
          </Link>
        </div>
        <div className={Style.choiceBlock}>
          <h1 style={{ fontSize: "27px", textAlign: "center" }}>BMI Calculator</h1>
          <span className={Style.span}>
            See where you stand.
          </span>
          <Link href="./BMICalculator" className={Style.button}>
            <FcCalculator
              style={{
                justifyContent: "center",
                position: "center",
                paddingRight: "10px",
                fontSize: "30px",
              }}
            />
            Calculate
          </Link>
        </div>
      </div>
    </>
  );
}