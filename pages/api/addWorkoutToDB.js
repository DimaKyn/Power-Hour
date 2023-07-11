import clientPromise from '/lib/mongodb';
import { getServerSession } from "next-auth/next"

// Define the handler function as the default export
export default async function handler(req, res) {
    let client;
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    try {
        const session = await getServerSession(req, res) // Get the server session using the getServerSession function
        const workout = req.body; // Get the workout data from the request body
        client = await clientPromise; // Get the MongoDB client from the clientPromise
        const db = client.db("powerhourdb"); // Get the 'powerhourdb' database from the client
        const workoutsCollection = db.collection("UserCustomWorkouts"); // Get the 'UserCustomWorkouts' collection from the database
        const result = await workoutsCollection.findOneAndUpdate(
            { email: session.user.email }, // Find the document with the matching email in the collection
            { $push: { workoutsArray: workout } }, // Push the workout data into the 'workoutsArray' array field
            { returnOriginal: false, upsert: true } // Set the options for the update operation
        );
        //Disconnect from MongoDB
        //disconnectFromServer(client);
        res.status(200).json({ message: "Workout added successfully", insertedId: result.insertedId })
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    }
    finally {
        // //Disconnect from MongoDB
        //disconnectFromServer(client);
    }
}

async function disconnectFromServer(client) {
    if (client) {
        await client.close(); // Close the MongoDB client connection
    }
}
