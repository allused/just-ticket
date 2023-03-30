import express from 'express';
import { addNewComment, AddNewComment, getCommentByTaskID } from '../controllers/CommentController.mjs';

const commentRouter = express.Router();

commentRouter.get('/api/tasks/:taskId/comments', getCommentByTaskID);

commentRouter.post('/api/tasks/:taskId/comments', addNewComment);

commentRouter.patch('/api/comments/:commentId', (req, resp) => {

    const {commentId} = req.params;
    if (commentId != null && Joi.validate(req.body, commentSchemaPatch))
    {
        const comment = null;
        //Return the proper http response with the updated comment if the update was succesful
        if (comment != null){

            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(201).send(`The following comment is succesfully updated: \n${comment}`)
            }
            
        }else{
            resp.status(404).send(responseMessages.internalServerError)
        }
    } 
    else
    {
        resp.status(400).send(responseMessages.badRequestObj)
    }
    });

export{commentRouter}