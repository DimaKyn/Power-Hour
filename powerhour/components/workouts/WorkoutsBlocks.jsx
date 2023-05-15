import Style from "../../styles/PageStandard.module.css";
import Image from "next/image";

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

    return <div className={Style.blocksWrapper}>
        foo
    </div>
}