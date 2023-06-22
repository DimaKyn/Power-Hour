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
                <label className={Style.mainLabel}>Maxim and Dima, Student Software Engineers</label>
                <div style={{ display: "flex", flexDirection: "row" , flexWrap: "wrap"}} className={Style.flexingColumnContent}>
                    <div style={{ maxWidth: "270px", display: 'flex', alignItems: 'center', flexDirection: "column", margin: "20px" }}>
                        <div style={{ borderRadius: "1000px", overflow: "hidden" }}>
                            <Image
                                src="/static/about/Dima.jpg"
                                width={300}
                                height={300}
                                priority={true}
                                alt='Dima'
                            />
                        </div>
                        <h2 style={{ padding: "10px", fontSize: '30px' }}>Dima</h2>
                        <p style={{ textAlign: "center" }}>Software Engineering Student, Ambitious, Creative and Focused on my goals. I enjoy coding, making music, working out, and cooking. </p>
                    </div>
                    <div style={{ maxWidth: "270px", display: 'flex', alignItems: 'center', flexDirection: "column", margin: "20px" }}>
                        <div style={{ borderRadius: "1000px", overflow: "hidden" }}>
                            <Image
                                src="/static/about/Maxim.jpg"
                                width={300}
                                height={300}
                                priority={true}
                                alt='Maxim'
                            />
                        </div>
                        <h2 style={{ padding: "10px", fontSize: '30px' }}>Maxim</h2>
                        <p style={{ textAlign: "center" }}>Software Engineering Student , I enjoy writting code, playing video games with friend working out, and eating.  </p>               
                        </div>

                </div>

            </div>
        </>

    )
}
