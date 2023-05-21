import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI

async function findUser(username, password) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection('Users');

    const user = await usersCollection.findOne({ username: username, password: password });

    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  } finally {
    await client.close();
  }
}

export { findUser };