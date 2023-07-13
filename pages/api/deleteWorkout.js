import { getServerSession } from "next-auth/next";
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    let client;

    try {
        const session = await getServerSession(req, res);
        if (!session) {
            // Handle unauthorized access
            return res.status(401).json({ message: "Unauthorized" });
        }

        client = await clientPromise;
        const db = client.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");

        const email = session.user.email;
        const workoutName = req.body.workoutName;

        const result = await workoutsCollection.updateOne(
            { email: email},
            { $pull: { workoutsArray: { workoutName: workoutName } } }
        );

        // Check if any documents were matched and modified
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Email not found" });
        } else if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json({ message: "Workout deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workout" });
    }
    finally {
        // Disconnect from MongoDB
        //disconnectFromServer(client);
    }
}

//Remove the connection from the database
async function disconnectFromServer(client) {
    if (client) {
        await client.close();
    }
}
