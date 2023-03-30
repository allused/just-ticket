import { responseMessages } from './HttpRespMsgs.mjs';
import {idSchema, commentSchemaPost, commentSchemaPatch, commentSchemaGet} from '../validators/ModelValidations.mjs';
import { getTaskByTaskID } from './TaskController.mjs';
import { GetUserByUserId } from '../services/UserService.mjs';
import { GetTask } from '../services/TaskService.mjs';
import { AddComment, GetCommentByTaskId } from '../services/CommentService.mjs';

const addNewComment = async (req,resp) =>
{
        const {taskId} = req.params;
        if (commentSchemaPost.validate(req.body))
        {
    
            
            if (taskId != null){

                const task = await GetTask({id: taskId});
                const createUser = await GetUserByUserId(req.body.userId);
                if (createUser[0].userid != task.rows[0].createuserid)
                {
                    resp.status(403).send(responseMessages.forbidden)
                }
                else
                {
                    const newComment = await AddComment(req.body);

                    resp.status(200).send(newComment)
                }
            }else{
                resp.status(404).send(responseMessages.notFound)
            }
        } 
        else
        {
            resp.status(400).send(responseMessages.badRequestId)
        }
         
}

const getCommentByTaskID = async (req,resp) =>
{
        const {taskId} = req.params;
        const {userId} = req.params;
        let newComment;
        if (commentSchemaPost.validate(req.body))
        {
            
            
            try {
                newComment = await GetCommentByTaskId(taskId);
                newComment = newComment.rows[0];
                resp.status(201).send(`The following comment is succesfully created: \n${comment}`);
            } catch (error) {
                console.log(`The following error occured while getting GetCommentByTaskId: ${error}`);
                resp.status(404).send(responseMessages.notFound);
            }
            if (comment != null){
                //Checking if the user is authorized to make the requested action, and send the proper http response 
               /* 
               TODO - finish the permission check
               try {
                let parentTask = await GetTask({id: taskId});
                if (parentTask.rows.length > 0) parentTask = parentTask.rows[0];
            } catch (error) {
                console.log(`The following SQL error occured with GetTask: ${error}`)
            }
               if ()
                {
                    resp.status(403).send(responseMessages.forbidden)
                }
                else
                {
                } */
                
            }else{
                resp.status(500).send(responseMessages.internalServerError)
            }
        } 
        else
        {
            resp.status(400).send(responseMessages.badRequestObj)
        }
        
}

export { addNewComment, getCommentByTaskID }