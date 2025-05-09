import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import { signupValidationSchema } from './user.validation';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const parsed = signupValidationSchema.parse(req.body);
    const user = await UserService.createUserinDB(parsed);

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
};
