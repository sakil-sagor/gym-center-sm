import { z } from 'zod';

export const createTrainerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
