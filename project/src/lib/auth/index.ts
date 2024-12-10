import { z } from 'zod';
import { query } from '../db/mysql';
import { hashPassword, verifyPassword } from '../security';

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string(),
  role: z.enum(['admin', 'client']),
});

export type User = z.infer<typeof userSchema>;

export async function signIn(email: string, password: string): Promise<User> {
  const [user] = await query<any[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (!user || !await verifyPassword(password, user.password_hash)) {
    throw new Error('Invalid credentials');
  }

  return userSchema.parse(user);
}

export async function createUser(data: {
  email: string;
  password: string;
  full_name: string;
  role: 'admin' | 'client';
}): Promise<User> {
  const passwordHash = await hashPassword(data.password);

  const [result] = await query<any[]>(
    `INSERT INTO users (id, email, password_hash, full_name, role)
     VALUES (UUID(), ?, ?, ?, ?)`,
    [data.email, passwordHash, data.full_name, data.role]
  );

  return {
    id: result.insertId,
    email: data.email,
    full_name: data.full_name,
    role: data.role,
  };
}