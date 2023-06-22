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
        //Get needed variables for the update query
        const typeOfStat = req.body.typeOfStat;
        const workoutName = req.body.workoutName;
        const exerciseName = req.body.exerciseName;
        const value = req.body.value;
        const email = session.user.email;

        const dbPromise = await clientPromise;
        const db = dbPromise.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");

        //Access database and update the exercise information
        const result = updateInDatabase(typeOfStat, value, workoutName, exerciseName, workoutsCollection, email);

        res.status(200).json({ message: "Updated Successfuly", insertedId: result.insertedId })

    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    } finally {
        //Disconnect from MongoDB
        disconnectFromServer(client);
    }
}

//This function handles the update of the stat of the provided workout name and exercise name
async function updateInDatabase(typeOfStat, value, workoutName, exerciseName, workoutsCollection, email) {

    try {
        const result = await workoutsCollection.findOneAndUpdate(
            {
                email: email,
                'workoutsArray.workoutName': workoutName,
                'workoutsArray.exercises.name': exerciseName
            },
            { $set: { [`workoutsArray.$[workout].exercises.$[exercise].${typeOfStat}`]: value } },
            {
                arrayFilters: [
                    { "workout.workoutName": workoutName },
                    { "exercise.name": exerciseName },
                ],
            }
        );
        return result;
    } catch (error) {
        console.error('Error updating the document:', error);
    }

    // const result = await workoutsCollection.updateOne(
    //     { email: email },
    //     { $set: { workoutsArray: {workoutName: workoutName }, workoutsArray: {exercises: {name: exerciseName, typeOfStat: value} }} } 
    // );
    return result;
}

//Remove the connection from the database
async function disconnectFromServer(client) {
    if (client) {
        await client.close();
    }
}