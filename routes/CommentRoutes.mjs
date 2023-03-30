import express from 'express';
import { addNewComment, AddNewComment, getCommentByTaskID, patchCommentByID } from '../controllers/CommentController.mjs';

const commentRouter = express.Router();

commentRouter.get('/api/tasks/:taskId/comments', getCommentByTaskID);

commentRouter.post('/api/tasks/:taskId/comments', addNewComment);

commentRouter.patch('/api/comments/:commentId', patchCommentByID);

export{commentRouter}