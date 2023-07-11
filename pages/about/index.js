// Import the necessary modules and components
import Image from 'next/image'; // Importing the Image component from the 'next/image' module
import Style from '/styles/PageStandard.module.css'; // Importing the CSS module for styling
import NavigationPanel from '/components/navigationPanel/NavigationPanel'; // Importing the NavigationPanel component
import { aboutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList'; // Importing the links for the navigation panel

// Define the About component as the default export
export default function About() {
    return (
        <>
            <NavigationPanel links={aboutPanelLinks} /> {/* Render the NavigationPanel component with the aboutPanelLinks */}
            <div className={Style.inner}> {/* Apply the 'inner' class from the CSS module */}
                <label className={Style.mainLabel}>Maxim and Dima, Student Software Engineers</label> {/* Render a label with the 'mainLabel' class from the CSS module */}
                <div style={{ display: "flex", flexDirection: "row" , flexWrap: "wrap"}} className={Style.flexingColumnContent}> {/* Apply inline styles for flexbox layout and the 'flexingColumnContent' class from the CSS module */}
                    <div style={{ maxWidth: "270px", display: 'flex', alignItems: 'center', flexDirection: "column", margin: "20px" }}> {/* Apply inline styles for layout and the 'maxWidth' class from the CSS module */}
                        <div style={{ borderRadius: "1000px", overflow: "hidden", top: "0"}}> {/* Apply inline styles for border radius and overflow */}
                            <Image
                                src="/static/about/Dima.jpg" // Set the image source
                                width={300} // Set the image width
                                height={300} // Set the image height
                                priority={true} // Set the image priority
                                alt='Dima' // Set the image alt text
                            />
                        </div>
                        <h2 style={{ padding: "10px", fontSize: '30px' }}>Dima</h2> {/* Apply inline styles for padding and font size */}
                        <p style={{ textAlign: "center" }}>Software Engineering Student. I enjoy coding, making music, working out, and cooking. </p> {/* Apply inline styles for text alignment */}
                    </div>
                    <div style={{ maxWidth: "270px", display: 'flex', alignItems: 'center', justifyContent: "top", flexDirection: "column", margin: "20px" }}> {/* Apply inline styles for layout and the 'maxWidth' class from the CSS module */}
                        <div style={{ borderRadius: "1000px", overflow: "hidden", top: "0", position: "relative"}}> {/* Apply inline styles for border radius, overflow, and position */}
                            <Image
                                src="/static/about/Maxim.jpg" // Set the image source
                                width={300} // Set the image width
                                height={300} // Set the image height
                                priority={true} // Set the image priority
                                alt='Maxim' // Set the image alt text
                            />
                        </div>
                        <h2 style={{ padding: "10px", fontSize: '30px' }}>Maxim</h2> {/* Apply inline styles for padding and font size */}
                        <p style={{ textAlign: "center" }}>Software Engineering Student. I enjoy writing code, playing video games with friends, working out, and eating. </p> {/* Apply inline styles for text alignment */}
                    </div>
                </div>
            </div>
        </>
    )
}
