import clientPromise from '/lib/mongodb';
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res)
        console.log(session)
        if (!session) {
            // Handle unauthorized access
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const progress = req.body;
        console.log(progress)
        const client = await clientPromise;
        const db = client.db("powerhourdb");
        const progressCollection = db.collection("UserProgress");
        const result = await progressCollection.findOneAndUpdate(
            { email: session.user.email },
            { $push: { weights: progress} },
            { returnOriginal: false, upsert: true }
        );
        res.status(200).json({ message: "User progress added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding progress", error: error.message });
    }
}
