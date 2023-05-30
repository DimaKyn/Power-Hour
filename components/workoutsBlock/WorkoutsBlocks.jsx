import Image from "next/image";
import StyleWorkout from "/styles/WorkoutBox.module.css";

// Fetch all images and workouts from database
export async function getStaticProps() {
    const prisma = new PrismaClient()
    const images = await prisma.images.findMany()

    return {
        props: { images }
    }
}

//Returns workout divs with an image, title, and description
//TODO: Create image to return
export default function WorkoutsBlocks({ images }) {
    const divs = [];

    return <div className={StyleWorkout.blocksWrapper}>
        <div className={StyleWorkout.workout}>
            <h1 style={{ fontSize: "30px" }}>CALISTHENICS</h1>
            <Image src="/workoutTypes/calisthenicsAthlete.jpg"
                alt="Calisthenics athlete"
                width={300}
                height={300} />
            <span style={{textAlign: "center"}}>
                Calisthenics exercises are performed rhythmically with minimal equipment. These exercises target large muscle groups and aim to improve strength, fitness, and flexibility while enhancing balance, agility, and coordination.
            </span>

        </div>
        <div className={StyleWorkout.workout}>
            <h1 style={{ fontSize: "30px" }}>BODYBUILDING</h1>
            <Image src="/workoutTypes/bodybuildingAthlete.jpg"
                alt="Bodybuilding athlete"
                width={300}
                height={300} />
            <span style={{textAlign: "center"}}>
                Bodybuilding involves progressive resistance exercises to develop muscles for aesthetic purposes, with bodybuilders focusing on physical appearance rather than strength.
            </span>
        </div>
        <div className={StyleWorkout.workout}>
            <h1 style={{ fontSize: "30px" }}>CARDIO</h1>
            <Image src="/workoutTypes/cardioAthletes.jpg"
                alt="Bodybuilding athlete"
                width={300}
                height={300} />
            <span style={{textAlign: "center"}}>
                Cardiovascular exercise, also known as cardio or aerobic exercise, is any type of exercise that increases your heart rate. It includes activities such as running, cycling, and swimming.
            </span>
        </div>


    </div>
}