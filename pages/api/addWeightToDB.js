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
        if (!session) {
            // Handle unauthorized access
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const progress = req.body; // Get the progress data from the request body
        client = await clientPromise; // Get the MongoDB client from the clientPromise
        const db = client.db("powerhourdb"); // Get the 'powerhourdb' database from the client
        const progressCollection = db.collection("UserProgress");
        const result = await progressCollection.findOneAndUpdate(
            { email: session.user.email }, // Find the document with the matching email in the collection
            { $push: { weights: progress} }, // Push the progress data into the 'weights' array field
            { returnOriginal: false, upsert: true } // Set the options for the update operation
        );
        res.status(200).json({ message: "User progress added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding progress", error: error.message });
    } finally {
        //Disconnect from MongoDB
        //disconnectFromServer(client);
    }
}

//Remove the connection from the database
async function disconnectFromServer(client) {
    if (client) {
      await client.close(); // Close the MongoDB client connection
    }
  }

