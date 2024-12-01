import express, { Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();
import router from './routes';
import ErrorMiddleware from './middlewares/Error';

const app = express();
const { NODE_ENV, PORT } = process.env;

app.set('port', PORT || 8080);

app.use([
  compression(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  express.json(),
]);
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}
app.use(router);
app.use(ErrorMiddleware);

export default app;