import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI; // Getting the MongoDB connection URI from the environment variables

// Define an asynchronous function to find a user in the database
async function findUser(identifier) {
  // Creating a new MongoClient instance with the provided connection URI and options
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect(); // Connecting to the MongoDB server
    const db = client.db(process.env.DB_NAME); // Accessing the specified database using the environment variable
    const usersCollection = db.collection('Users'); // Accessing the 'Users' collection in the database

    const user = await usersCollection.findOne({
      $or: [{ username: identifier }, { email: identifier }], // Finding a user with the provided username or email
    });
    
    //Remove the connection from the database
    if (client) {
      await client.close(); // Closing the MongoDB connection
    }
    return user; // Returning the found user

  } catch (error) {
    console.error('Error finding user:', error); // Logging any errors that occur during the process
    throw error;
  } finally {
    //Remove the connection from the database
    if (client) {
      await client.close(); // Closing the MongoDB connection
    }
  }
}

export { findUser }; // Exporting the 'findUser' function for external use
