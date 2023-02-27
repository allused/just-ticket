import express from 'express';
import Joi from 'joi';
import { userRouter } from './routes/UserRoutes.mjs';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));


export { app }

