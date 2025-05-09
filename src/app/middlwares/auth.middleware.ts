import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// Auth middleware with role checking
export const auth = (...requiredRoles: string[]) => {
  return catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const token = req?.headers?.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized access.',
          errorDetails: 'Token not provided',
        });
      }

      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      req.user = decoded;

      const userId = decoded?.id || decoded?._id;

      // Check if user exists
      const existingUser = await User.findOne({ _id: userId }).select(
        '-password',
      );

      if (!existingUser) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized access.',
          errorDetails: 'User not found',
        });
      }

      // Check role permission
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access.',
          errorDetails: 'You do not have permission for this action.',
        });
      }

      next();
    },
  );
};
