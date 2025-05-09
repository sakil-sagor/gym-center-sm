import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ScheduleService } from './schedule.service';

const createSchedule: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const schedule = await ScheduleService.createScheduleinDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Schedule created successfully',
      data: schedule,
    });
  },
);

export const ScheduleController = {
  createSchedule,
};
