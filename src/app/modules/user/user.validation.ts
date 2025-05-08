import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'trainer', 'trainee']),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
