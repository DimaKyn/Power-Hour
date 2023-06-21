import bcrypt from 'bcrypt';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {

    let client;
    const workoutName = req.body.workoutName;

    try {
        //STUCK HERE
        const session = await getSession({ req });

        if (!session) {
            // Handle unauthorized access
            return res.status(401).json({ message: "Unauthorized" });
        }

        const client = await clientPromise;
        const db = client.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");
        //This will find the user object with the matching email
        const userObject = await workoutsCollection.findOne({ email: session.user.email });
        const workoutIndex = userObject.workouts.findIndex((workout) => workout.workoutName === workoutName);
        //If the workout was not found in the database
        if (workoutIndex === -1) {
            // Disconnect from MongoDB
            disconnectFromServer(client);
            //Return 404 not found error
            return res.status(404).json({ message: "Workout not found" });
        }
        //If the workout was found in the database
        else {
            //Splice() removes an object from an array
            userObject.workouts.splice(workoutIndex, 1);

            // Update the document in the MongoDB collection
            await workoutsCollection.updateOne({ email: session.user.email }, { $set: { workout: userDocument.workout } });
        }
        res.status(200).json({ message: "Workout deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workout" });
    }
    finally {
        // Disconnect from MongoDB
        disconnectFromServer(client);
    }
}

//Remove the connection from the database
async function disconnectFromServer(client) {
    if (client) {
      await client.close();
    }
  }
