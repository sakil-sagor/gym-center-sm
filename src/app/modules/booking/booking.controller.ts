import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

export const bookingClass: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { scheduleId } = req.body;
    const traineeId = req.user?.id;
    const result = await BookingService.bookClassinDB(scheduleId, traineeId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Class booked successfully',
      data: result,
    });
  },
);

const cancleBookedClass = catchAsync(async (req: Request, res: Response) => {
  const { scheduleId } = req.body;
  const traineeId = req.user?.id;

  const result = await BookingService.cancelBookinginDB(scheduleId, traineeId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

export const BookingController = {
  bookingClass,
  cancleBookedClass,
};
