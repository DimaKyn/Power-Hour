import Image from 'next/image';
import Style from '../../../styles/PageStandard.module.css';

export default function About() {
    return (
        <div className={Style.inner}>
            <h1 style={{ fontSize: '50px' }}>Maxim and Dima, Web developers</h1>
            <Image
                src="/../public/we.jpg"
                width={500}
                height={500}
                priority={true}
                alt='Maxim and Dima'
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ padding: "10px", fontSize: '20px' }}>Dima
                    <p >Professional front-end developer living in a movie</p>
                </h2>
                <h2 style={{ padding: "10px", fontSize: '20px' }}>Maxim
                    <p>Professional back-end developer living in a movie</p>
                </h2>
            </div>




        </div>
    )
}