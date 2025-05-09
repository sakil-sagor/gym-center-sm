import express from 'express';
import { auth } from '../../middlwares/auth.middleware';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-user', auth('admin'), UserController.createUser);

export const UserRoutes = router;
