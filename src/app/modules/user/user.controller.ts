/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await UserService.createUserinDB(req.body);
    const { password, ...userWithoutPassword } = user.toObject();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trainee is created successfully',
      data: userWithoutPassword,
    });
  },
);
const getAllTrainees: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = await UserService.getAllTraineesinDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Trainee fetched successfully',
      data: user,
    });
  },
);
const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const verifyLoggeId = (req as any).user?.id;
    const user = await UserService.getSingleUserinDB(id, verifyLoggeId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched successfully',
      data: user,
    });
  },
);
const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const verifyLoggeId = (req as any).user?.id;
    const result = await UserService.updateUserintoDB(
      id,
      verifyLoggeId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Updated successfully',
      data: result,
    });
  },
);

export const UserController = {
  createUser,
  getAllTrainees,
  getSingleUser,
  updateUser,
};
