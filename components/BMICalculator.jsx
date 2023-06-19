import Style from '/styles/LoginBlock.module.css'
import StyleStandard from '/styles/PageStandard.module.css';
import StyleCalc from '/styles/BMICalculator.module.css';

import { useEffect, useState } from 'react'
import { GiBodyHeight } from 'react-icons/gi';
import { TbWeight } from 'react-icons/tb';
import { useRef } from 'react';
import BMIInfo from '/data/bmi_information.json'; 

export default function BMICalculator() {
    const [heightNumber, setHeightNumber] = useState("");
    const [weightNumber, setWeightNumber] = useState("");
    const [height, setHeight] = useState("Height (cm)");
    const [weight, setWeight] = useState("Weight (kg)");
    const [bmi, setBMI] = useState(0);
    const [metric, setMetric] = useState(true);
    const metricRef = useRef(null);

    function mapIndexToBMIscore(bmi) {
        if (bmi <= 0) { return 0; }
        else if (bmi < 16) { return 1; }
        else if (bmi >= 16 && bmi < 18.5) { return 2; }
        else if (bmi >= 18.5 && bmi < 25) { return 3; }
        else if (bmi >= 25 && bmi < 30) { return 4; }
        else if (bmi >= 30 && bmi < 40) { return 5; }
        else { return 6; }
    }

    function mapColorToBMIScore() {
        if (bmi <= 0) { return "white"; }
        else if (bmi < 16) { return "red"; }
        else if (bmi >= 16 && bmi < 18.5) { return "orange"; }
        else if (bmi >= 18.5 && bmi < 25) { return "green"; }
        else if (bmi >= 25 && bmi < 30) { return "orange"; }
        else if (bmi >= 30 && bmi < 40) { return "red"; }
        else { return "red"; }
    }
    //This function returns if you should maintain/gain/or lose weight for the provided BMI
    function stepsToTake(bmi) {
        let bmiIndexReturned = mapIndexToBMIscore(bmi);
        if (bmiIndexReturned == 0) {
            return "";
        }
        else if (bmiIndexReturned == 1 || bmiIndexReturned == 2) {
            return "increase";
        }
        else if (bmiIndexReturned == 3) {
            return "maintain";
        }
        else {
            return "decrease";
        }
    }

    function calculateBMI(height, weight, metric) {
        let totalBMI = 0;
        console.log("height: ", height, "weight: ", weight, " metric: ", metric);
        if (metric) {
            totalBMI = weight / ((height / 100) * (height / 100))


        } else {
            totalBMI = (weight / (height * height)) * 703
        }
        setBMI(totalBMI);
        return weight;
    }

    function changeUnits() {
        setMetric(!metric);
    }

    //Used to change the units of the input fields
    useEffect(() => {
        if (metric) {
            setHeight("Height (cm)");
            setWeight("Weight (kg)");
        } else {
            setHeight("Height (in)");
            setWeight("Weight (lbs)");
        }
    }, [metric])

    return <>
        <div className={StyleCalc.wrapper}>
            <div className={StyleCalc.title}>
                <div className={Style.usernameBlock} >
                    <GiBodyHeight className={Style.userIcon} />
                    <input type="number" className={Style.usernameInput} value={heightNumber} onChange={(e) => setHeightNumber(e.target.value)}></input>
                    <label className={Style.usernameLabel}>{height}</label>
                </div>
                <div className={Style.passwordBlock} style={{ marginTop: "30px" }}>
                    <TbWeight className={Style.passwordIcon} />
                    <input type="number" className={Style.usernameInput} value={weightNumber} onChange={(e) => setWeightNumber(e.target.value)}></input>
                    <label className={Style.passwordLabel}>{weight}</label>
                </div>
                <div onClick={() => changeUnits()} className={StyleCalc.checkboxContainer}>
                <input type="checkbox" className={StyleCalc.checkbox} onClick={() => changeUnits()} checked={!metric}></input>

                    <label className={StyleCalc.checkboxLabel}>
                        US units
                    </label>
                </div>
                <div className={Style.buttonDiv}>
                    <button className={Style.loginButton}
                        onClick={() => calculateBMI(heightNumber, weightNumber, metric)}>Calculate</button>
                </div>

            </div>
            <div className={StyleCalc.bmiInfo}>
                <label style={{ fontWeight: "bold", color: "rgba(64, 64, 192, 1)", fontSize: "20px" }}>BMI:
                    <label style={{ color: mapColorToBMIScore() }}>{bmi > 0 && " " + bmi.toFixed(2)}</label>
                </label>
                <br />
                <span>{BMIInfo[mapIndexToBMIscore(bmi)].explanation}</span>
                <br />

                <label style={{ fontWeight: "bold", color: "rgba(64, 64, 192, 1)", fontSize: "20px" }}>Steps to {stepsToTake(bmi)} your BMI:</label>
                <span>{BMIInfo[mapIndexToBMIscore(bmi)].steps.map(
                    (step, i) => {
                        return <>
                            <li key={i}>{(i + 1) + ": " + step}</li>
                            <br />
                        </>
                    }
                )}</span>

            </div>

        </div>

    </>
}