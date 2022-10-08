import express from 'serverless-express/express';
import handler from 'serverless-express/handler';

import {init as adminInit} from './admin/controller';
import {init as authInit} from './auth/controller';
import { NextFunction, Request, Response } from 'express';

export const app = express();
app.set('view engine', 'ejs');
adminInit(app);
authInit(app);
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const api = handler(app);
