import Style from '/styles/LoginBlock.module.css'
import StyleStandard from '/styles/PageStandard.module.css';
import StyleCalc from '/styles/BMICalculator.module.css';
import { useState } from 'react'
import { GiBodyHeight } from 'react-icons/gi';
import { TbWeight } from 'react-icons/tb';



export default function BMICalculator() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [height, setHeight] = useState("Height (cm)");
    const [weight, setWeight] = useState("Weight (kg)");
    const [bmi, setBMI] = useState(0);

    function calculateBMI(height, weight, metric) {
        if (metric) {
            totalBMI= weight / ((height / 100) * (height / 100))
            
        } else {
            totalBMI = (weight / (height * height)) * 703
        }
        setBMI(totalBMI);
        return weight;
    }

    return <div className={StyleStandard.inner}>
        <div className={StyleCalc.wrapper}>
            <div className={StyleCalc.title}>
                <div className={Style.usernameBlock}>
                    <GiBodyHeight className={Style.userIcon} />
                    <input type="number" className={Style.usernameInput} value={identifier} onChange={(e) => setIdentifier(e.target.value)}></input>
                    <label className={Style.usernameLabel}>{height}</label>
                </div>
                <div className={Style.passwordBlock}>
                    <TbWeight className={Style.passwordIcon} />
                    <input type="number" className={Style.passwordInput} value={weight} onChange={(e) => setPassword(e.target.value)}></input>
                    <label className={Style.passwordLabel}>{weight}</label>
                </div>
                <div className={Style.buttonDiv}>
                    <button className={Style.loginButton}
                        onClick={() => calculate(identifier, password)}>Calculate</button>
                </div>
                <div>
                    {bmi}

                </div>
            </div>

            </div>

        </div>
}