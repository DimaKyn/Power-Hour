import Style from '/styles/PageStandard.module.css';
import TableStyle from '/styles/workoutsTable.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavigationPanel from '/components/navigationPanel/NavigationPanel';
import { customWorkoutsPanelLinks } from '/components/navigationPanel/NavigationPanelLinksList';
import { CaseLower } from 'lucide-react';

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

    const uniqueWorkouts = workouts.workoutsArray ? [...new Set(workouts.workoutsArray.map((workout) => workout.workoutName))] : [];

    return (
        <>
        <NavigationPanel links={customWorkoutsPanelLinks}/>
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
                    {uniqueWorkouts.map((workoutName) => {
                            const workout = workouts.workoutsArray.find((w) => w.workoutName === workoutName);
                            return (
                                <tr key={workout.workoutName}>
                                    <td>
                                        <button onClick={() => handleWorkoutClick(workout.workoutName, workout.exercises)}>
                                            {workout.workoutName}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}
