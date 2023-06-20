import BMICalculator from "/components/BMICalculator";
import Style from "/styles/PageStandard.module.css";
import NavigationPanel from "/components/navigationPanel/NavigationPanel";
import { BMICalculatorLinks } from "/components/navigationPanel/NavigationPanelLinksList";

export default function BMICalculatorPage() {
    return <div className={Style.inner}>
        <NavigationPanel links={BMICalculatorLinks} />
        <label className={Style.mainLabel}>BMI CALCULATOR</label>
        <BMICalculator />
    </div>
        ;
}