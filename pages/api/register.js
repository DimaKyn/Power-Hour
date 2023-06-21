import bcrypt from 'bcrypt';
import clientPromise from '../../lib/mongodb';

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}

export default async function handler(req, res) {
  let client;
  try {
    if (req.method === 'POST') {
      const { name, username, email, password, phoneNumber } = req.body;

      if (!name || !username || !email || !password || !phoneNumber) {
        //Disconnect from MongoDB
        disconnectFromServer(client);
        return res.status(400).json({ message: 'All fields are required' });
      }

      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME);
      const existingEmail = await db.collection('Users').findOne({ email });

      if (existingEmail) {
        res.setHeader('Content-Type', 'application/json');
        //Disconnect from MongoDB
        disconnectFromServer(client);
        return res.status(400).json({ message: 'Email already exists' });
      }

      const existingUsername = await db.collection('Users').findOne({ username });

      if (existingUsername) {
        res.setHeader('Content-Type', 'application/json');
        //Disconnect from MongoDB
        disconnectFromServer(client);
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await hashPassword(password);

      // Save the user with their hashed password in the database
      const newUser = await db.collection('Users').insertOne({
        name,
        username,
        email,
        password: hashedPassword, // Store the hashed password
        phoneNumber,
      });

      // Create JSON table for new user
      const jsonTable = await db.collection('UserCustomWorkouts').insertOne({
        email: email,
        workoutsArray: []
      });

      // Create JSON table for new user
      const jsonWeightTable = await db.collection('UserProgress').insertOne({
        email: email,
        weights: []
      });

      console.log('User created:', newUser);
      res.setHeader('Content-Type', 'application/json');

      //Disconnect from MongoDB
      disconnectFromServer(client);

      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in /api/register:', error);

    //Disconnect from MongoDB
    disconnectFromServer(client);

    return errorHandler(error, req, res);
  }
  finally {
    //Disconnect from MongoDB
    disconnectFromServer(client);
  }
}

//Remove the connection from the database
async function disconnectFromServer(client) {
  if (client) {
    await client.close();
    console.log("Disconnected from server");

  }
}
