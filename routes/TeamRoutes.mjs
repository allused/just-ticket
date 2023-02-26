import {app} from '../index.js';
import { responseMessages } from './HttpRespMsgs.mjs';
import {idSchema, teamSchemaPatch, teamSchemaPost, teamSchemaGet} from '../validators/ModelValidations.mjs';
import Joi from 'joi';

app.get('/api/teams/:userId', (req, resp) => {
    
    const {userId} = req.params;
    if (userId != null && Joi.validate(req.body, teamSchemaGet))
    {
        
        //Calling the team controller below, to get the requested team    
        const team = null;
        //When the tean is returned, we send it in a response, if not found, send the proper rest response that not found
        if (team != null){
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(200).send(team)
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


app.post('/api/teams', (req, resp) => {

    //Validating the team obj from the request body
    if (Joi.validate(req.body, teamSchemaPost))
    {
        //First check for already existing task with the same id, if not found move on to create
        //if()
        //Calling the task controller below, to add the comment to DB
        const team = null;
        //When the task is added succesfully, its returned, otherwise we get a null value
        if (team != null){
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(201).send(`The following team is succesfully created: \n${team}`)
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

app.patch('/api/teams/:teamId', (req, resp) => {

    const {teamId} = req.params;
    if (teamId != null && Joi.validate(req.body, teamSchemaPatch))
    {
        //Try to find and update the requested team, if found and succesfully updated, its returned
        const team = null;
        //Return the proper http response with the updated team if the update was succesful
        if (team != null){
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(201).send(`The following team is succesfully updated: \n${team}`)
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

