import Link from 'next/link';
import Style from '../../../styles/PageStandard.module.css';
import WorkoutsBlocks from '../../../components/workouts/WorkoutsBlocks';


export default function workouts( ) {



    return <div className={Style.outer}>
        <div className={Style.inner}>
            <label className={Style.mainLabel}>Workouts page</label>

        <WorkoutsBlocks/>


            <Link href="/">
                return home
            </Link>
        </div>
    </div>
}