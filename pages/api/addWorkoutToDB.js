import clientPromise from '/lib/mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const workout = req.body;

    try {
        const client = await clientPromise;
        const db = client.db("powerhourdb");
        const workoutsCollection = db.collection("UserCustomWorkouts");

        const result = await workoutsCollection.findOneAndUpdate(
            { username: "c1"}, 
            { $push: {workoutsArray: workout}},
            { returnOriginal: false, upsert: true}
        );
        res.status(200).json({ message: "Workout added successfully", insertedId: result.insertedId })
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    }
}