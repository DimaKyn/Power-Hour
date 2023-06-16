import clientPromise from '/lib/mongodb';
import { getServerSession } from "next-auth/next"


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    try {

        const session = await getServerSession(req, res)
        console.log(session);
        if (!session) {
            // Handle unauthorized access
            return res.status(401).json({ message: 'Unauthorized' });
        }


        const workout = req.body;
        console.log(session.user)
        const client = await clientPromise;
        const db = client.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");
        const result = await workoutsCollection.findOneAndUpdate(
            { email: session.user.email },
            { $push: { workoutsArray: workout } },
            { returnOriginal: false, upsert: true }
        );
        res.status(200).json({ message: "Workout added successfully", insertedId: result.insertedId })
        client.close();

    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
        client.close();
    }
}
