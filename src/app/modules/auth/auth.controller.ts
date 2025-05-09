import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import { loginValidationSchema } from './auth.validation';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const parsed = loginValidationSchema.parse(req.body);
    const result = await AuthService.loginUserinDB(parsed);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful',
      data: result,
    });
  },
);

export const AuthController = {
  loginUser,
};
