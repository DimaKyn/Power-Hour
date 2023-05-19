import Style from "/styles/PageStandard.module.css";
import Link from "next/link";

//The navigation panel is responsible for displaying the current page location
export default function NavigationPanel(props) {
    let navigationLinks = [];
    let lenLinks = props.links.length;
    let firstLetter, path = '';

    props.links.map((navigation, index) => {
        //Turn first letter to uppercase
        firstLetter = navigation[0].toUpperCase();
        path = firstLetter + navigation.slice(1);
        //If the navigation is the last element in the list, paint it yellow and give it a unique class
        if (lenLinks === index+1) {
            navigationLinks.push(<Link id={index*2} className={Style.navPanelLinkCurrent} href={`/${navigation}`}>{path}</Link>)
        } 
        //If the navigation is home, then the href changes to "/"
        else if (navigation === "home") {
            navigationLinks.push(<Link id={index*2} className={Style.navPanelLinks} href={'/'}>{path}</Link>)
        }
        //Else, add the navigation to the panel
        else {
            navigationLinks.push(<Link id={index*2} className={Style.navPanelLinks} href={`/${navigation}`}>{path}</Link>)
        }
        navigationLinks.push(<span id={index*2 + 1} className={Style.navArrow}>{" > "}</span>);

    });
    //Pop the last element in the list ">"
    navigationLinks.pop(-1);

    return <div className={Style.navigationPanel}>
        {navigationLinks}
    </div>
}