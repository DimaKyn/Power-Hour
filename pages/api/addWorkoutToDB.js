import clientPromise from '/lib/mongodb';
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    let client;
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    try {
        console.log(req.body);

        const session = await getServerSession(req, res)
        const workout = req.body;
        const client = await clientPromise;
        const db = client.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");
        const result = await workoutsCollection.findOneAndUpdate(
            { email: session.user.email },
            { $push: { workoutsArray: workout } },
            { returnOriginal: false, upsert: true }
        );
        //Disconnect from MongoDB
        disconnectFromServer(client);
        res.status(200).json({ message: "Workout added successfully", insertedId: result.insertedId })
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    }
    finally {
        //Disconnect from MongoDB
        disconnectFromServer(client);
    }
}

async function disconnectFromServer(client) {
    if (client) {
        await client.close();
        console.log("Disconnected from server");
    }
}
