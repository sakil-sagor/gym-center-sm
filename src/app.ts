import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);
app.use(notFound);

export default app;
