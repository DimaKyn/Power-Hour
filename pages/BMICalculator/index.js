import BMICalculator from "/components/BMICalculator";
import Style from "/styles/PageStandard.module.css";

export default function BMICalculatorPage() {
    return <div className={Style.inner}>
        <BMICalculator />
    </div>
    ;
}