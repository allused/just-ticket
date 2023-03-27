import { responseMessages } from '../routes/HttpRespMsgs.mjs';
import { AddTask, GetTask, UpdateTask } from '../services/TaskService.mjs';
import { GetUserByUserId, GetUserByUsername } from '../services/UserService.mjs';
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

const addTask = async (req, resp) =>
    {
        const {userId} = req.body;
        const taskParams = req.body;
        if (userId != null && taskSchemaPost.validate(req.body))
        {

            //Calling the task controller below, to get the requested task
            const user = await GetUserByUserId(userId);
            //When the task is returned, we send it in a response, if not found, send the proper rest response that not found
            if (user.length > 0 && user[0].permissionid == 2 && user[0].permissionid == 3)
            {
                let assigneUserid = user[0].userid; 
                if (req.body.assigneUsername != "" && req.body.assigneUsername != null)
                {
                    const assignedUser = await GetUserByUsername(req.body.assigneUsername);
                    if (assignedUser.length > 0)
                    {
                        assigneUserid = assignedUser[0].userid;
                    }
                }
                
                const addedTask = await AddTask(taskParams);
                if (tasks.rows.length < 1)
                {
                    resp.status(403).send(responseMessages.notFound);
                }
                else
                {
                    resp.status(200).send(addedTask[0]);
                }
            }else{
                resp.status(404).send(responseMessages.forbidden);
            }
        } 
        else
        {
            resp.status(400).send(responseMessages.badRequestId);
        }
    }

    const updateTask = async (req, resp) =>
    {
        const {userId} = req.body;
        const taskParams = req.body;
        if (userId != null && taskSchemaPatch.validate(req.body))
        {

            //Calling the task controller below, to get the requested task
            const user = await GetUserByUserId(userId);
            const task = await GetTask({id: taskParams.taskId});
            //Check if the user has permiss
            if (task.rows[0].createuserid == userId)
            {
                
                if (user.length > 0 && task.rows.length > 0)
                {
                    resp.status(403).send(responseMessages.notFound);
                }
                else
                {
                    try
                    {
                        const updatedTask = await UpdateTask([taskParams.userId,taskParams.modifiedDate,taskParams.assigneUserid,taskParams.displayName,taskParams.description,taskParams.taskTypeId,taskParams.taskPriorityId,taskParams.taskStateId,taskParams.uploadFilename]);
                        resp.status(200).send(updatedTask.rows[0]);
                    }
                    catch (error) {
                        console.log(`The following error occured while updating task: ${error}`);
                        resp.status
                    }
                }
            }else{
                resp.status(404).send(responseMessages.forbidden);
            }
        } 
        else
        {
            resp.status(400).send(responseMessages.badRequestId);
        }
    }



export{getTaskByTaskID, getTaskByUserID, getTaskByTeamID, addTask}