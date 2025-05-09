import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrainerService } from './trainer.service';

const createTrainer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await TrainerService.createTrainerinDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: user,
    });
  },
);

export const TrainerController = {
  createTrainer,
};
