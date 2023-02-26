import {app} from '../index.js';
import { responseMessages } from './HttpRespMsgs.mjs';
import {idSchema, commentSchemaPost, commentSchemaPatch, commentSchemaGet} from '../validators/ModelValidations.mjs';

app.get('/api/tasks/:taskId/comments', (req, resp) => {

    const {taskId} = req.params;
    if (taskId != null && Joi.validate(req.body, commentSchemaGet))
    {

        //Calling the comment controller below, to get the requested comment, 
        
        const comment = null;
        //When the comment is returned, we send it in a response, if not found, send the proper rest response that not found
        if (comment != null){
            //Check if the client has access to the required action, if yes send the querry result, if no send the proper rest response 
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(200).send(comment)
            }
        }else{
            resp.status(404).send(responseMessages.notFound)
        }
    } 
    else
    {
        resp.status(400).send(responseMessages.badRequestId)
    }
     });

app.post('/api/tasks/:taskId/comments', (req, resp) => {

    const {taskId} = req.params;
    if (taskId != null && Joi.validate(req.body, commentSchemaPost))
    {
        
        //When the comment is added succesfully to the DB, its returned, otherwise we get a null value
        const comment = null;
        if (comment != null){
            //Checking if the user is authorized to make the requested action, and send the proper http response 
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(201).send(`The following comment is succesfully created: \n${comment}`)
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

app.patch('/api/comments/:commentId', (req, resp) => {

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