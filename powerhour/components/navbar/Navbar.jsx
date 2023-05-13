import Link from "next/link";
import Container from "../Container";
import Style from "../../styles/Navbar.module.css";
import Image from "next/image";



export default function Navbar() {



    return <div className={Style.wrapper}>
        <div className={Style.logo}>
                <Image
                    src="/../public/ph.png"
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
            </div>
        <div>   
            <Container>
                <Link href="/" className={Style.navText}>Home</Link>
                <Link href="../../workouts/workouts" className={Style.navText}>Workouts</Link>
                <Link href="/" className={Style.navText}>Who we are</Link>
            </Container>
        </div>

    </div>

}