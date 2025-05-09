import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { UserController } from './user.controller';
import { createUserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);

export const UserRoutes = router;
