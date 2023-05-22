import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

let client;

const getClient = async () => {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
  }
  return client;
};

async function findUser(username) {
  const clientInstance = await getClient();

  const db = clientInstance.db(process.env.MONGODB_DB);
  const usersCollection = db.collection('Users');
  const user = await usersCollection.findOne({ username });

  return user;
}

export { findUser };
