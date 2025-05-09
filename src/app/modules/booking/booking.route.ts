import express from 'express';
import { auth } from '../../middlwares/auth.middleware';
import validateRequest from '../../middlwares/validateRequest';
import { BookingController } from './booking.controller';
import { bookingValidationSchema } from './booking.validation';

const router = express.Router();

router.post(
  '/book-class',
  auth('trainee'),
  validateRequest(bookingValidationSchema),
  BookingController.bookingClass,
);

router.post(
  '/cancel-class',
  auth('trainee'),
  validateRequest(bookingValidationSchema),
  BookingController.cancleBookedClass,
);

export const BookingRoutes = router;
