import Image from 'next/image';
import Style from '/styles/PageStandard.module.css';
//Import the navigation panel for this specific page
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { aboutPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';


export default function About() {
    return (
        <>
            <NavigationPanel links={aboutPanelLinks} />
            <div className={Style.inner}>
                <h1 style={{ fontSize: '50px' }}>Maxim and Dima, Student Software Engineers</h1>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ maxWidth: "270px", display: 'flex', alignItems: 'center', flexDirection: "column", margin: "20px" }}>
                        <div style={{ borderRadius: "1000px", overflow: "hidden" }}>
                            <Image
                                src="/../public/about/Dima.jpg"
                                width={300}
                                height={300}
                                priority={true}
                                alt='Dima'
                            />
                        </div>
                        <h2 style={{ padding: "10px", fontSize: '30px' }}>Dima</h2>
                        <p style={{ textAlign: "center" }}>Student Software Engineer, I enjoy making music, front-end, working out, and raving. </p>
                    </div>
                    <div style={{ maxWidth: "270px", display: 'flex', alignItems: 'center', flexDirection: "column", margin: "20px" }}>
                        <div style={{ borderRadius: "1000px", overflow: "hidden" }}>
                            <Image
                                src="/../public/about/refrigerator.jpg"
                                width={300}
                                height={300}
                                priority={true}
                                alt='Maxim'
                            />
                        </div>
                        <h2 style={{ padding: "10px", fontSize: '30px' }}>Maxim</h2>
                        <p style={{ textAlign: "center" }}>Student Software Engineer, refrigirator </p>               
                        </div>

                </div>

            </div>
        </>

    )
}
