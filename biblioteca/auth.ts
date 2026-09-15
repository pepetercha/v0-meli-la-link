import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './db';

export async function registrarUsuario(name: string, email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed }
  });
  return user;
}

export async function loginUsuario(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');

  const valido = await bcrypt.compare(password, user.password);
  if (!valido) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'secreto_dev',
    { expiresIn: '1h' }
  );

  return { user, token };
}

export function verificarToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secreto_dev');
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }
}
