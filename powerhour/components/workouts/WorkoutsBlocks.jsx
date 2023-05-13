import Style from "../../styles/PageStandard.module.css";
import Image from "next/image";

//Creates multiple divs with images inside
function createDivs() {
    const divs = [];

    for (let i = 0; i < 4; i++) {
        divs.push(<div key={i} className={Style.block}>
            {generateImageIntoDiv(i)}
        </div>)
    }
    return divs;
}

//TODO: fetch images from database
function generateImageIntoDiv() {


    return (<>
        <Image src="/../public/liftingWeights.jpg"
            width={300}
            height={300}
            alt="Lifting weights" className={Style.image}/> 
            <label>Explenation:</label><br/>
            <span>
                blah blah blah blah<br/>
                blah blah blah blah blah<br/>
                blah blah blah blah blah blah<br/>
            </span>
            
    </>)
}

//Returns multiple divs with images inside
export default function WorkoutsBlocks() {
    return <div className={Style.blocksWrapper}>
        {createDivs()}
    </div>
}