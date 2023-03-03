import { responseMessages } from '../routes/HttpRespMsgs.mjs';
import { GetTask } from '../services/TaskService.mjs';
import { GetUserByUserId } from '../services/UserService.mjs';
import {idSchema, taskSchemaPost, taskSchemaPatch, taskSchemaGet, taskSchemaGetAll} from '../validators/ModelValidations.mjs';


const getTaskByTaskID = async (req, resp) =>
    {
        const {taskId} = req.params;
        if (taskId != null && taskSchemaGet.validate( idSchema))
        {

            //Calling the task controller below, to get the requested task
            const user = await GetUserByUserId(req.body.userId);    
            //When the task is returned, we send it in a response, if not found, send the proper rest response that not found
            if (user.length > 0){
                const task = await GetTask({id: taskId});
                if (task.rows.length < 1)
                {
                    resp.status(403).send(responseMessages.notFound)
                }
                else
                {
                    resp.status(200).send(task.rows)
                }
            }else{
                resp.status(404).send(responseMessages.forbidden)
            }
        } 
        else
        {
            resp.status(400).send(responseMessages.badRequestId)
        }
    }

const getTaskByUserID = async (req, resp) =>
    {
        const {userId} = req.params;
        if (userId != null && taskSchemaGetAll.validate(idSchema))
        {

            //Calling the task controller below, to get the requested task
            const user = await GetUserByUserId(userId);    
            //When the task is returned, we send it in a response, if not found, send the proper rest response that not found
            if (user.length > 0){
                const tasks = await GetTask({createuserid: taskId});
                if (tasks.rows.length < 1)
                {
                    resp.status(403).send(responseMessages.notFound)
                }
                else
                {
                    resp.status(200).send(tasks.rows)
                }
            }else{
                resp.status(404).send(responseMessages.forbidden)
            }
        } 
        else
        {
            resp.status(400).send(responseMessages.badRequestId)
        }
    }


const getTaskByTeamID = async (req, resp) =>
    {
        const {teamId} = req.params;
        if (teamId != null && taskSchemaGetAll.validate(idSchema))
        {

            //Calling the task controller below, to get the requested task
            const user = await GetUserByUserId(req.body.userId);    
            //When the task is returned, we send it in a response, if not found, send the proper rest response that not found
            if (user.length > 0 && user[0].teamid == teamId){
                const tasks = await GetTask({teamid: teamId});
                if (tasks.rows.length < 1)
                {
                    resp.status(403).send(responseMessages.notFound)
                }
                else
                {
                    resp.status(200).send(tasks.rows)
                }
            }else{
                resp.status(404).send(responseMessages.forbidden)
            }
        } 
        else
        {
            resp.status(400).send(responseMessages.badRequestId)
        }
    }



export{getTaskByTaskID, getTaskByUserID}