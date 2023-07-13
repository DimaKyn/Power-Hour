import clientPromise from '/lib/mongodb';
import { getSession } from 'next-auth/react';

// Define the handler function as the default export
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  let client;

  try {
    const session = await getSession({ req });
    if (!session) {
      // Handle unauthorized access
      return res.status(401).json({ message: 'Unauthorized' });
    }

    client = await clientPromise; // Get the MongoDB client from the clientPromise
    const db = client.db("powerhourdb");
    const workoutsCollection = db.collection("UserProgress");
    const cursor = await workoutsCollection.find({ email: session.user.email });
    const result = await cursor.toArray();
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error getting progress", error: error.message });
  }
  finally {
    // Disconnect from MongoDB
    //disconnectFromServer(client);
  }
}

//Remove the connection from the database
async function disconnectFromServer(client) {
  if (client) {
    await client.close(); // Close the MongoDB client connection
  }
}