import express from 'express';
import { auth } from '../../middlwares/auth.middleware';
import validateRequest from '../../middlwares/validateRequest';
import { UserController } from './user.controller';
import { createUserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);
router.get('/', auth('admin'), UserController.getAllTrainees);

export const UserRoutes = router;
