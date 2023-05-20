import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try{
    if (req.method === "POST") {
        const { name, username, email, password, phoneNumber } = req.body;
    
        // Check if the required fields are provided
        if (!name || !username || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        const client = await clientPromise;
        const db = client.db("powerhourdb");
    
        // Check if the user already exists
        const existingEmail = await db.collection("Users").findOne({ email });
    
        if (existingEmail) {
          res.setHeader("Content-Type", "application/json");
          return res.status(400).json({ message: "Email already exists" });
        }

        const existingUsername = await db.collection("Users").findOne({ username });
    
        if (existingUsername) {
          res.setHeader("Content-Type", "application/json");
          return res.status(400).json({ message: "Username already exists" });
        }
    
        // Save the user in the database
        const newUser = await db.collection("Users").insertOne({
            name,
            username,
            email,
            password, // In a real-world scenario, you should hash the password before saving it
            phoneNumber,
          });
        res.setHeader("Content-Type", "application/json");
        return res.status(201).json({ message: "User registered successfully", user: newUser.ops[0] });
      } else {
        res.status(405).json({ message: "Method not allowed" });
      }
  }
  catch (error) {
    console.error("Error in /api/register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
