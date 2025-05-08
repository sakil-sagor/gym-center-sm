/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import status from 'http-status';

import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!!',
    error: 'Not Found',
  });
};

export default notFound;
