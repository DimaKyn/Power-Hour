import bcrypt from 'bcrypt';
import { findUser } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const user = await findUser(username);

      // If the user exists, compare the entered password with the stored hashed password
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          res.status(200).json({ success: true, user });
        } else {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
