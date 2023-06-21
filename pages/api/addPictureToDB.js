// Trying to upload picture, getting error for now
import clientPromise from "/lib/mongodb";
import { getServerSession } from "next-auth/next";
import multer from "multer";
import fs from 'fs';

const upload = multer({ dest: 'uploads/' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      const client = await clientPromise;

      const session = await getServerSession(req, res)
      if (!session) {
        // Handle unauthorized access
        return res.status(401).json({ message: 'Unauthorized' });
      }


      // Access the database and collection
      const db = client.db("powerhourdb");
      const collection = db.collection('Users');

      // Handle the file upload
      upload.single('image')(req, res, async function (err) {

        if (err) {
          console.log(err)
          // Handle upload error
          res.status(500).json({ error: 'Failed to upload image' });
        } else {
          // Get the uploaded file details
          const file = req.file;
          const data = fs.readFileSync(file.path);

          // Insert the image record into the collection
          const result = await collection.insertOne({
            email: session.user.email,
            data: data,
          });

          // Delete the temporary file
          fs.unlinkSync(file.path);

          res.status(200).json({ success: true, fileId: result.insertedId });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    } finally {
      // Disconnect from MongoDB
      disconnectFromServer(client);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

//Remove the connection from the database
async function disconnectFromServer(client) {
  if (client) {
    await client.close();
  }
}
