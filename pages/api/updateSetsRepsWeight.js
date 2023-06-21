import clientPromise from '/lib/mongodb';
import { getServerSession } from "next-auth/next"

//This function handles updating a specific workout's exercise's sets, reps, or weight
export default async function handler(req, res) {
    let client;
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    try {
        const session = await getServerSession(req, res)
        if (!session) {
            // Handle unauthorized access
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const typeOfWorkout = req.typeOfWorkout;
        const workoutName = req.workoutName;
        const exerciseName = req.exerciseName;
        const statToUpdate = req.statToUpdate;

        const client = await clientPromise;
        const db = client.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");

        //Access database and update the exercise information

        const result = updateInDatabase(typeOfWorkout, workoutName, exerciseName, workoutsCollection);
            res.status(200).json({ message: "Workout added successfully", insertedId: result.insertedId })

    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    } finally {
        if(client)
            client.close();
    }
}

//This function handles the update of the stat of the provided workout name and exercise name
async function updateInDatabase(typeOfStat, workoutName, exerciseName, workoutsCollection) {
    //Create a query based on the type of stat to update
    const query = "workoutsArray.$[workout].exercisesArray.$[exercise]." + typeOfStat;
    const result = await workoutsCollection.findOneAndUpdate(
        {
            email: session.user.email,
            "workoutsArray.workoutName": workoutName,
            "workoutsArray.exercises.name": exerciseName
        },
        //Update the stat of the provided workout name and exercise name
        { $set: { [query]: statToUpdate } },
        {
            arrayFilters: [
                { 'workout.workoutName': workoutName },
                { 'exercise.name': exerciseName }
            ],
        },

        { returnOriginal: false, upsert: true }
    );
    return result;
}
