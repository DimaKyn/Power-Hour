import Style from '/styles/PageStandard.module.css';
import TableStyle from '/styles/workoutsTable.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { customWorkoutsPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { ImSpinner6 } from 'react-icons/im';

async function fetchWorkouts() {
    try {
        const response = await fetch('/api/fetchWorkouts', {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteWorkoutFromDB(workoutName, handleRefresh) {
    try {
        const response = await fetch('/api/deleteWorkout', {
            method: 'POST',
            body: JSON.stringify({ workoutName: workoutName }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.message === "Workout deleted") {
            Swal.fire({
                title: 'Success!',
                text: `Workout ${workoutName} has been deleted`,
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        }
    } catch (error) {
        console.log(error);
    }
}


export default function Custom() {
    const [workouts, setWorkouts] = useState([]);
    const router = useRouter();
    const [workoutCounter, setWorkoutCounter] = useState(0);

    const [doneFetching, setDoneFetching] = useState(false);

    useEffect(() => {
        (async () => {
            const fetchedWorkouts = await fetchWorkouts();
            setWorkouts(fetchedWorkouts);
            setWorkoutCounter(fetchedWorkouts.length);
            setDoneFetching(true);
        })();
    }, [workoutCounter]);

    function deleteWorkout(workoutName) {
        Swal.fire({
            title: 'Delete Workout',
            text: `Are you sure you want to delete ${workoutName}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            deleteWorkoutFromDB(workoutName, handleRefresh);
            let index = uniqueWorkouts.indexOf(workoutName);
            if (index > -1) {
                uniqueWorkouts.splice(index);
            }
            setWorkoutCounter(workoutCounter - 1);
        });
    }

    const uniqueWorkouts = workouts.workoutsArray ? [...new Set(workouts.workoutsArray.map((workout) => workout.workoutName))] : [];

    const handleWorkoutClick = (workoutName, exercises) => {
        localStorage.removeItem('exercises');
        localStorage.removeItem('workout');
        localStorage.setItem('exercises', JSON.stringify(exercises));
        localStorage.setItem('workout', workoutName);
        router.push({
            pathname: `custom/${encodeURIComponent((workoutName.toLowerCase()).split(' ').join('_'))}`,
            params: { workout: workoutName, exercise: JSON.stringify(exercises) },
        });
    };

    const handleRefresh = () => {
        router.reload();
    };

    return (
        <>
            <NavigationPanel links={customWorkoutsPanelLinks} />
            <div className={Style.inner}>
                <label className={Style.mainLabel}>My Workouts</label>
                <div className={TableStyle.workoutsTableContainer}>
                    <table className={TableStyle.workoutsTable}>
                        <thead>
                            <tr>
                                <th >Select Workout</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!doneFetching) && (uniqueWorkouts.length === 0) && <tr style={{ textAlign: "center" }}><td><div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><ImSpinner6 className={TableStyle.loadingIcon} /></div></td></tr>}

                            {uniqueWorkouts.map((workoutName) => {
                                const workout = workouts.workoutsArray.find((w) => w.workoutName === workoutName);
                                return (
                                    <tr key={workout.workoutName} >
                                        <td>
                                            <div className={TableStyle.tr}>
                                                <div className={TableStyle.workoutButton} onClick={() => handleWorkoutClick(workout.workoutName, workout.exercises)} >
                                                    <h1 className={TableStyle.workoutButtonText}>{workout.workoutName}</h1>
                                                </div>
                                                <div className={TableStyle.workoutDeleteButton} onClick={() => deleteWorkout(workout.workoutName)}><BsTrash3 /></div>
                                            </div>

                                        </td>
                                    </tr>
                                );
                            })}
                            {(doneFetching) && (uniqueWorkouts.length === 0) && <tr style={{ textAlign: "center" }}><td><h1 style={{ color: "white" }}>No workouts yet</h1></td></tr>}
                            {uniqueWorkouts && (
                                <tr>
                                    <td style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                                        <Link className={TableStyle.workoutButton} style={{ fontSize: "50px", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }} href="./create_custom_workout"><AiOutlinePlus /></Link>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
