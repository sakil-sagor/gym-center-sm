import { z } from 'zod';

export const bookingValidationSchema = z.object({
  body: z.object({
    scheduleId: z.string({ required_error: 'Schedule ID is required' }),
  }),
});
