import express, { request, response } from 'express';
import { responseMessages } from './HttpRespMsgs.mjs';
import { loginUser, getAllUser, addNewUser } from '../controllers/UserController.mjs';
import {idSchema, teamSchemaGet, userSchemaGet, userSchemaPatch, userSchemaPost} from '../validators/ModelValidations.mjs';
import Joi from 'joi';

const userRouter = express.Router();

userRouter.get('/login', loginUser);
//(req,resp) =>{ loginUser(req,resp)}
//Gets a single user for the provided userId
userRouter.get('/users/:userId', (req, resp) => {
    const {userId} = req.params;
    if (userId != null )
    {
        
        //Calling the user controller below, to get the requested user    
        const user = null;
        //When the user is returned, we send it in a response, if not found, send the proper rest response that not found
        if (user != null){
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(200).send(user)
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


     //Gets all the user for the provided teamID
userRouter.get('/teams/:teamId/users', getAllUser);

    //Add a new user to an existing team
userRouter.post('/users/', addNewUser);

userRouter.patch('/api/users/:userId', (req, resp) => {

    const {userId} = req.params;
    if (userId != null && Joi.validate(req.body, userSchemaPatch))
    {
        //Try to find and update the requested user, if found and succesfully updated, its returned
        const user = null;
        //Return the proper http response with the updated user if the update was succesful
        if (user != null){
            if (dontHavePermission)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(201).send(`The following user is succesfully updated: \n${user}`)
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

export { userRouter}