import express, { Request, Response } from 'express';
// import compression from 'compression';
// import cookieParser from 'cookie-parser';
import { join } from 'path';
import dotenv from "dotenv";
dotenv.config();
// import router from './routes';
// import ErrorMiddleware from './middlewares/Error';

const app = express();
const { NODE_ENV , PORT } = process.env;

app.set('port', PORT || 8080);

app.use([
  // compression(),
  // cookieParser(),
  express.urlencoded({ extended: false }),
  express.json(),
]);
// app.use(router);
// app.use(ErrorMiddleware);

// if (NODE_ENV === 'production') {
//   app.use(express.static(join(__dirname, '..', 'client', 'build')));
//   app.get('*', (req: Request, res: Response) => {
//     res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
//   });
// }


export default app;