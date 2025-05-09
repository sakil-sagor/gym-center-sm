import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await UserService.createUserinDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: user,
    });
  },
);
const getAllTrainees: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await UserService.getAllTraineesinDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: user,
    });
  },
);

export const UserController = {
  createUser,
  getAllTrainees,
};
