import { NextFunction, Request, Response } from 'express';

export const authorize =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: `You must be ${roles.join(
          ' or ',
        )} to perform this action.`,
      });
    }
    next();
  };
