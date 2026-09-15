import prisma from '../../biblioteca/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });
    res.json(user);
  }

  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    res.json(users);
  }
}
