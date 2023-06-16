import Style from '/styles/PageStandard.module.css';
import TableStyle from '/styles/workoutsTable.module.css';
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

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const fetchedWorkouts = await fetchWorkouts();
            setWorkouts(fetchedWorkouts);
        })();
    }, []);

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

