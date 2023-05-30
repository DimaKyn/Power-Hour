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

const clientPromise = getClient();

export default clientPromise;
