import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { onError, ErrorMessage } from './refs';

// ======================= Services =======================
import uploadRouter from './services/upload';
import accessRouter from './services/access';

export const app = express();

app.use(cors());
app.use(json());
app.use(onError);

app.use('/', accessRouter)
app.get('/ping', (_: Request, res: Response) => res.send({ message: 'Media Service' }))
app.use('/upload', uploadRouter)

app.use((_: Request, res: Response) => res.status(404).send({ success: false, message: ErrorMessage.INVALID_ROUTE }));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack)
    res.status(500).send({ success: false, message: ErrorMessage.INTERNAL_SERVER_ERROR });
});