import Style from '/styles/LoginBlock.module.css'
import StyleCalc from '/styles/BMICalculator.module.css';
import { useEffect, useState } from 'react'
import { GiBodyHeight } from 'react-icons/gi';
import { TbWeight } from 'react-icons/tb';
import BMIInfo from '/data/bmi_information.json';

//This function handles the BMI calculator, it fetches information from a 
//JSON file from data/bmi_information.json and displays it to the user
export default function BMICalculator() {
    const [heightNumber, setHeightNumber] = useState("");
    const [weightNumber, setWeightNumber] = useState("");
    const [height, setHeight] = useState("Height (cm)");
    const [weight, setWeight] = useState("Weight (kg)");
    const [bmi, setBMI] = useState(0);
    const [metric, setMetric] = useState(true);
    const [displayStepsToTake, setDisplayStepsToTake] = useState(false);
    const [validInput, setValidInput] = useState(true);

    //Returns the index corresponding to the BMI score
    function mapIndexToBMIscore(bmi) {
        if (bmi <= 0) { return 0; }
        else if (bmi < 16) { return 1; }
        else if (bmi >= 16 && bmi < 18.5) { return 2; }
        else if (bmi >= 18.5 && bmi < 25) { return 3; }
        else if (bmi >= 25 && bmi < 30) { return 4; }
        else if (bmi >= 30 && bmi < 40) { return 5; }
        else { return 6; }
    }

    //Returns the color corresponding to the BMI score
    function mapColorToBMIScore() {
        if (bmi <= 0) { return "white"; }
        else if (bmi < 16) { return "red"; }
        else if (bmi >= 16 && bmi < 18.5) { return "orange"; }
        else if (bmi >= 18.5 && bmi < 25) { return "green"; }
        else if (bmi >= 25 && bmi < 30) { return "orange"; }
        else if (bmi >= 30 && bmi < 40) { return "red"; }
        else { return "red"; }
    }

    //This function returns if you should maintain/gain/lose weight for the provided BMI
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

    //This function CALCULATES the BMI
    function calculateBMI(height, weight, metric) {
        if (height <= 0 || weight <= 0) {
            setBMI(0);
            stepsToTake(40);
            setDisplayStepsToTake(false);
            setValidInput(true);
            return;
        }
        setValidInput(false);
        setDisplayStepsToTake(true);
        let totalBMI = 0;
        //If normal units
        if (metric) {
            totalBMI = weight / ((height / 100) * (height / 100))
        }
        //If US units
        else {
            totalBMI = (weight / (height * height)) * 703
        }
        setBMI(totalBMI);
        return weight;
    }

    //This function changes the units of the input fields
    function changeUnits() {
        setMetric(!metric);
    }

    //Used to update the units of the input fields
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
                    <input step="1" type="number" className={Style.usernameInput} value={heightNumber} onChange={(e) => setHeightNumber(e.target.value)}></input>
                    <label className={Style.usernameLabel}>{height}</label>
                </div>
                <div className={Style.passwordBlock} style={{ marginTop: "30px" }}>
                    <TbWeight className={Style.passwordIcon} />
                    <input step="1" type="number" className={Style.usernameInput} value={weightNumber} onChange={(e) => setWeightNumber(e.target.value)}></input>
                    <label className={Style.passwordLabel}>{weight}</label>
                </div>
                <div onClick={() => changeUnits()} className={StyleCalc.checkboxContainer}>
                    <input type="checkbox" className={StyleCalc.checkbox} onChange={() => changeUnits()} checked={!metric} />
                    <label className={StyleCalc.checkboxLabel}>
                        US units
                    </label>
                </div>
                <div className={StyleCalc.buttonDiv}>
                    <button className={Style.loginButton}
                        onClick={() => calculateBMI(heightNumber, weightNumber, metric)}>Calculate
                    </button>
                    {validInput && <label style={{ color: "red", marginTop: "3px"}}>Please provide valid height and weight numbers</label>}
                </div>

            </div>
            <div className={StyleCalc.bmiInfo}>
                <label style={{ fontWeight: "bold", color: "rgba(64, 64, 192, 1)", fontSize: "20px" }}>BMI:
                    <label style={{ color: mapColorToBMIScore() }}>{bmi > 0 && " " + bmi.toFixed(2)}</label>
                </label>
                <br />
                <span>{BMIInfo[mapIndexToBMIscore(bmi)].explanation}</span>
                <br />

                {displayStepsToTake && <label style={{ fontWeight: "bold", color: "rgba(64, 64, 192, 1)", fontSize: "20px" }}>Steps to {stepsToTake(bmi)} your BMI:</label>}
                <span>{BMIInfo[mapIndexToBMIscore(bmi)].steps.map(
                    (step, i) => {
                        return <div key={i}>
                            <li style={{ listStyleType: "none" }} >{(i + 1) + ".  " + step}</li>
                            <br />
                        </div>
                    }
                )}</span>

            </div>

        </div>

    </>
}