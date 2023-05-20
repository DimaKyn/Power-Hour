import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    //Replacement
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}
clientPromise
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

export default clientPromise


// Add this function in mongodb.js
async function findUser(username, password) {
  const client = await clientPromise;
  const db = client.db('powerhourdb'); // Replace with your database name
  const usersCollection = db.collection('Users'); // Replace with your users collection name

  const user = await usersCollection.findOne({ username: username, password: password });
  return user;
}

export { findUser }; // Add this to the exports
