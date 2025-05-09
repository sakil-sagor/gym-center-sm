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
router.get(
  '/trainee-schedules',
  auth('trainee'),
  ScheduleController.getTraineeSchedules,
);

router.get(
  '/trainer-schedules',
  auth('trainer'),
  ScheduleController.trainerSchedules,
);

export const ScheduleRoutes = router;
