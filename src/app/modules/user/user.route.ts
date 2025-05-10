import express from 'express';
import { auth } from '../../middlwares/auth.middleware';
import validateRequest from '../../middlwares/validateRequest';
import { UserController } from './user.controller';
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from './user.validation';

const router = express.Router();

router.get('/', auth('admin'), UserController.getAllTrainees);
router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);
router.get(
  '/:id',
  auth('admin', 'trainer', 'trainee'),
  UserController.getSingleUser,
);
router.patch(
  '/:id',
  auth('admin', 'trainer', 'trainee'),
  validateRequest(updateUserValidationSchema),
  UserController.updateUser,
);

export const UserRoutes = router;
