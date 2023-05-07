import express from 'express';
import { addNewComment, deleteCommentByID, getCommentByTaskID, patchCommentByID } from '../controllers/CommentController.mjs';

const commentRouter = express.Router();

commentRouter.get('tasks/:taskId/comments', getCommentByTaskID);

commentRouter.post('tasks/:taskId/comments', addNewComment);

commentRouter.patch('comments/:commentId', patchCommentByID);

commentRouter.delete('comments/:commentId', deleteCommentByID);

export{commentRouter}