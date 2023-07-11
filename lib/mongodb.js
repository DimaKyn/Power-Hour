import { MongoClient } from 'mongodb';

// Get the MongoDB connection URI from the environment variables
const uri = process.env.MONGODB_URI;

// Set the options for the MongoClient
const options = {
  useUnifiedTopology: true, // Enable the new unified topology engine
  useNewUrlParser: true, // Use the new URL parser
};

// Check if the MongoDB connection URI is provided in the environment variables
if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local'); // Throw an error if the MongoDB connection URI is not found
}

let client; // Declare a variable to store the MongoClient instance

// Define an asynchronous function to get the MongoClient instance
const getClient = async () => {
  if (!client) { // Check if the MongoClient instance is not already created
    client = new MongoClient(uri, options); // Create a new MongoClient instance with the provided connection URI and options
    await client.connect(); // Connect to the MongoDB server
  }
  return client; // Return the MongoClient instance
};

const clientPromise = getClient(); // Call the getClient function to get the MongoClient instance

export default clientPromise; // Export the clientPromise variable for external use
