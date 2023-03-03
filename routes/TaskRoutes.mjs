import express from 'express';
import { responseMessages } from './HttpRespMsgs.mjs';
import {idSchema, taskSchemaPost, taskSchemaPatch, taskSchemaGet, taskSchemaGetAll} from '../validators/ModelValidations.mjs';
import { getTaskByTaskID, getTaskByTeamID, getTaskByUserID } from '../controllers/TaskController.mjs';

const taskRouter = express.Router();

taskRouter.get('/tasks/:taskId', getTaskByTaskID);

taskRouter.get('users/:userId/tasks', getTaskByUserID);

taskRouter.get('/teams/:teamId/tasks', getTaskByTeamID);

taskRouter.post('/tasks', (req, resp) => {

    if (Joi.validate(req.body, taskSchemaPost))
    {
        //First check for already existing task with the same id, if not found move on to create
        //if()
        //Calling the task controller below, to add the comment to DB     
        const task = null;
        //When the task is added succesfully, its returned, otherwise we get a null value
        if (task != null){
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(201).send(`The following task is succesfully created: \n${task}`)
            }
            
        }else{
            resp.status(500).send(responseMessages.internalServerError)
        }
    } 
    else
    {
        resp.status(400).send(responseMessages.badRequestObj)
    }
    });

taskRouter.patch('/tasks/:taskId', (req, resp) => {

    const {taskId} = req.params;
    if (taskId != null && Joi.validate(req.body, taskSchemaPatch))
    {
        //Try to find and patch the requested task, if found and succesfully updated, its returned
        const task = null;
        //Return the proper http response with the updated task if the update was succesful
        if (task != null){
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(201).send(`The following comment is succesfully updated: \n${task}`)
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

export{taskRouter}