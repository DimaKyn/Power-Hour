import Style from '/styles/PageStandard.module.css';
<<<<<<< HEAD
import TableStyle from '/styles/workoutsTable.module.css';
=======
>>>>>>> a550150 (Added profile navbar icon menu- still doesn't work well)
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

export default function Custom() {
    const [workouts, setWorkouts] = useState([]);
<<<<<<< HEAD
    const router = useRouter();

=======
>>>>>>> a550150 (Added profile navbar icon menu- still doesn't work well)

    useEffect(() => {
        (async () => {
            const fetchedWorkouts = await fetchWorkouts();
            setWorkouts(fetchedWorkouts);
        })();
    }, []);

<<<<<<< HEAD
    const handleWorkoutClick = (workoutName) => {
        router.push({
          pathname: '/custom_workout',
          query: { workout: workoutName },
        });
      };

    return (
        <div className={Style.inner}>
            <label className={Style.mainLabel}>My Workouts</label>
            <div className={TableStyle.workoutsTableContainer}>
                <table className={TableStyle.workoutsTable}>
                    <thead>
                        <tr>
                            <th>Select Workout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(workouts.workoutsArray) &&
                            workouts.workoutsArray.map((workout) => (
                                <tr key={workout.workoutName}>
                                    <td>
                                        <button onClick={() => handleWorkoutClick(workout.workoutName)}>
                                            {workout.workoutName}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
=======
    return (
        <>
            <div className={Style.inner}>
                <label className={Style.mainLabel}>Custom Workouts</label>
                {Array.isArray(workouts.workoutsArray) &&
                    workouts.workoutsArray.map(workout => (
                        <div key={workout.workoutName} style={{ backgroundColor: 'blue' }}>
                            {workout.workoutName}
                        </div>
                    ))}
            </div>
        </>
    );
}
>>>>>>> a550150 (Added profile navbar icon menu- still doesn't work well)
