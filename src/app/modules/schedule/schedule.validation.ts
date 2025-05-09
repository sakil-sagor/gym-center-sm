import { z } from 'zod';

export const createScheduleValidationSchema = z.object({
  body: z.object({
    trainer: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    startTime: z.string(),
    endTime: z.string(),
  }),
});
