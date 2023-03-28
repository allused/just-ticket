import express from 'express';
import Joi from 'joi';
import { commentRouter } from './routes/CommentRoutes.mjs';
import { taskRouter } from './routes/TaskRoutes.mjs';
import { userRouter } from './routes/UserRoutes.mjs';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', taskRouter);
app.use('/api', commentRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));


export { app }

