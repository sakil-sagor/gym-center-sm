import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    age: z.number({ required_error: 'Age is required' }),
    phone: z.string({ required_error: 'Phone number is required' }),
    address: z.string({ required_error: 'Address is required' }),
    role: z.enum(['admin', 'trainer', 'trainee'], {
      required_error:
        'Role is required and must be one of admin, trainer, trainee',
    }),
  }),
});
export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});
