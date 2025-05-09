import express from 'express';

import { auth } from '../../middlwares/auth.middleware';
import { TrainerController } from './trainer.controller';

const router = express.Router();

router.post('/create-trainer', auth('admin'), TrainerController.createTrainer);

export const TrainerRoutes = router;
