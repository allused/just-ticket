import { GetUserByTeamId, GetUserByUsername, GetUserByUserId, AddUser, UpdateUser } from "../services/UserService.mjs";
import { responseMessages } from '../routes/HttpRespMsgs.mjs';
import {idSchema, teamSchemaGet, userSchemaGet, userSchemaPatch, userSchemaPost} from '../validators/ModelValidations.mjs';

const hasPermissionToGet = (userObj) =>
{

}

const loginUser = async (req, resp) => 
{
    console.log(req.body);
    const {username} = req.body;
    const {password} = req.body;

    
    
    if (username != null && password != null)
    {
        //Calling the user controller below, to get the requested user
        let user = await GetUserByUsername(username);
        
        console.log(user);
        //When the user is returned, we send it in a response, if not found, send the proper rest response that not found
        if (user.length > 0){
            
            if (user.password != password)
            {
                resp.status(403).send(responseMessages.forbidden);
            }
            else
            {
                
                resp.status(200).send(user[0]);
            }
        }else{
            resp.status(404).send(responseMessages.notFound);
        }
    } 
    else
    {
        resp.status(400).send(responseMessages.badRequestId);
    }
};

const getAllUser = async (req, resp) =>
{
    const {teamId} = req.params;
    const {userId} = req.body;
    console.log(req.body);
    if (teamId != null && userSchemaGet.validate(req.body))
    {
        
        //Calling the team controller below, to get the requested team

        const userList = await GetUserByTeamId(teamId);
        
        //When the list of users is returned, we send it in a response, if not found, send the proper rest response that not found
        if (userList.length > 0)
        {
            const userObj = await GetUserByUserId(userId);
            console.log(userObj);
            if (userObj.length < 1 || userObj[0].teamid != teamId || userObj[0].permissionid == 1)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                resp.status(200).send(userList)
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

const addNewUser = async (req, resp) =>
{

    
    if (userSchemaPost.validate(req.body))
    {
        const userToAdd = req.body;
        const addUser = await GetUserByUserId(req.body.userId);
        const currDate = new Date();
        console.log(addUser);
        if ( addUser.length > 0 )
        {
            if (addUser[0].permissionid != 3)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {
                const createdUser = await AddUser([addUser.teamid, userToAdd.permissionId == 3 ? 2 : userToAdd.permissionId, currDate.toISOString(), userToAdd.userName, userToAdd.password, userToAdd.displayName]);
                console.log('user created: '+createdUser);
                resp.status(201).send('User succesfully created.')
            }
        }
        else
        {
            resp.status(500).send(responseMessages.internalServerError)
        }
    } 
    else
    {
        resp.status(400).send(responseMessages.badRequestObj)
    }
}

const updateUser = async (req, resp) =>
{
    const {userId} = req.params;
    if (userId != null && Joi.validate(req.body, userSchemaPatch))
    {
        //Try to find and update the requested user, if found and succesfully updated, its returned
        const user = await GetUserByUserId(userId);
        const userData = req.body;
        //Return the proper http response with the updated user if the update was succesful
        if (user.length > 0){
            if (req.body.permissionId == 3)
            {
                resp.status(403).send(responseMessages.forbidden)
            }
            else
            {

                const updatedUser = await UpdateUser(userData);
                resp.status(201).send(`The following user is succesfully updated: \n${updatedUser}`)
            }
            
        }else{
            resp.status(404).send(responseMessages.internalServerError)
        }
    } 
    else
    {
        resp.status(400).send(responseMessages.badRequestObj)
    }
    
}
    


export {loginUser, getAllUser, addNewUser, updateUser}