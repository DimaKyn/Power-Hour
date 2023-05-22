import bcrypt from 'bcrypt';
import clientPromise from '../../lib/mongodb';

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { name, username, email, password, phoneNumber } = req.body;

      if (!name || !username || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const client = await clientPromise;
      const db = client.db('powerhourdb');

      const existingEmail = await db.collection('Users').findOne({ email });

      if (existingEmail) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ message: 'Email already exists' });
      }

      const existingUsername = await db.collection('Users').findOne({ username });

      if (existingUsername) {
        res.setHeader('Content-Type', 'application/json');
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
      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json({ message: 'User registered successfully', user: newUser.ops[0] });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in /api/register:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
