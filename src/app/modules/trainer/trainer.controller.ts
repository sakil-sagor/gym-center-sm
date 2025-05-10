/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrainerService } from './trainer.service';

const createTrainer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await TrainerService.createTrainerinDB(req.body);
    const { password, ...userWithoutPassword } = user.toObject();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trainer is created successfully',
      data: userWithoutPassword,
    });
  },
);
const getAllTrainers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await TrainerService.getAllTrainersinDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trainers Fetched successfully',
      data: user,
    });
  },
);

export const TrainerController = {
  createTrainer,
  getAllTrainers,
};
