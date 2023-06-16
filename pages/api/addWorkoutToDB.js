import clientPromise from '/lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    //Get session and to extract username from that
    try {
        const session = await getSession();
        if (!session) {
            // Handle unauthorized access
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error getting session", error: error.message });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const workout = req.body;

    try {
        const client = await clientPromise;
        const db = client.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");
        const result = await workoutsCollection.findOneAndUpdate(
            { username: session.user.username },
            { $push: { workoutsArray: workout } },
            { returnOriginal: false, upsert: true }
        );
        res.status(200).json({ message: "Workout added successfully", insertedId: result.insertedId })
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    }
}