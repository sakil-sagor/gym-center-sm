import express from 'express';

import { auth } from '../../middlwares/auth.middleware';
import validateRequest from '../../middlwares/validateRequest';
import { TrainerController } from './trainer.controller';
import { createTrainerValidationSchema } from './trainer.validation';

const router = express.Router();

router.post(
  '/create-trainer',
  auth('admin'),
  validateRequest(createTrainerValidationSchema),
  TrainerController.createTrainer,
);

export const TrainerRoutes = router;
