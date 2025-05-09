import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Authentication Middleware
export const auth = (...requiredRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req?.headers?.token as string;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: 'Token not provided',
      });
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
      console.log(requiredRoles.length);
      console.log(requiredRoles.includes(decoded['role']));
      // Role check
      if (requiredRoles.length && !requiredRoles.includes(decoded['role'])) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access.',
          errorDetails: 'You do not have permission for this action.',
        });
      }

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: error.message,
      });
    }
  };
};

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Unauthorized access.',
//       errorDetails: 'No token provided',
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     (req as any).user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({
//       success: false,
//       message: 'Unauthorized access.',
//       errorDetails: 'Invalid token',
//     });
//   }
// };
