import Style from '/styles/PageStandard.module.css';
import { useEffect, useState } from 'react';

async function fetchWorkouts() {
    try {
        let response = await fetch('/api/fetchWorkouts', {
            method: 'GET',
        });
        response = await response.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default function Custom() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchedWorkouts = await fetchWorkouts();
            setWorkouts(fetchedWorkouts);
        })();
    }, []);

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