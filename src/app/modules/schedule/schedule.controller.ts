/* eslint-disable @typescript-eslint/no-explicit-any */
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
// Get all schedules for a trainee
const getTraineeSchedules = catchAsync(async (req: Request, res: Response) => {
  const traineeId = (req as any).user?.id;

  const mySchedules =
    await ScheduleService.getTraineeSchedulesfromDb(traineeId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainee class schedules fetched successfully',
    data: mySchedules,
  });
});
// Get all schedules for a trainer
const trainerSchedules = catchAsync(async (req: Request, res: Response) => {
  const trainerId = (req as any).user?.id;

  const mySchedules = await ScheduleService.trainerSchedulesfromDB(trainerId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Trainer class schedules fetched successfully',
    data: mySchedules,
  });
});

export const ScheduleController = {
  createSchedule,
  getTraineeSchedules,
  trainerSchedules,
};
