import express from 'express';
import { auth } from '../../middlwares/auth.middleware';
import validateRequest from '../../middlwares/validateRequest';
import { ScheduleController } from './schedule.controller';
import { createScheduleValidationSchema } from './schedule.validation';

const router = express.Router();

router.post(
  '/create-schedule',
  auth('admin'),
  validateRequest(createScheduleValidationSchema),
  ScheduleController.createSchedule,
);

export const ScheduleRoutes = router;
