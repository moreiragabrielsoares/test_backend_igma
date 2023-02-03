import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { customerRouter } from './routes/customerRouter';

const app = express();

app.use(cors());
app.use(json());
app.use(customerRouter);
app.use(errorHandler);

export { app };
