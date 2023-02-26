import {getSpiraPool} from './DbConnection.mjs'

const pool = getSpiraPool();
const basicUserDataColumns = 'id,username,displayname,teamid,permissionid';

const GetUserByTeamId = async (teamId) => 
{
    let user = null;
    const client = await pool.connect();
    try
    {
        user = await client.query(`SELECT ${basicUserDataColumns} FROM ticketuser WHERE teamId = $1`, [teamId]);
        return user.rows;

    }
    catch(err)
    {
        console.log(`The following error occured while getting UserByTeamID: ${err}`);
        
    }
    finally
    {
        client.release(true);
    }

}

const GetUserByUserId = async (userId) => 
{
    let user = [];
    const client = await pool.connect();
    try
    {
        
        user =  await pool.query(`SELECT ${basicUserDataColumns} FROM ticketuser WHERE id = $1`, [userId])
        return user.rows;

    }catch(err)
    {
        console.log(`The following error occured while getting UserByUserId: ${err}`);
        return user;

    }
    finally
    {
        client.release(true);
    }
}

const GetUserByUsername = async (username) => 
{
    let user = [];
    const client = await pool.connect();
    try 
    {
        console.log('inside username: ' + username);
        user = await pool.query(`SELECT ${basicUserDataColumns} FROM ticketuser WHERE username = $1`, [username]);
        return user.rows;
    } 
    catch (error) 
    {
        console.log(`The following error occured while getting User By Username: ${error}`);
    }
    finally
    {
        client.release(true);
    }

}

const AddUser = async (userValList) =>
{
    
    const client = await pool.connect();
    try
    {
        return await pool.query(`INSERT INTO ticketuser(teamid,permissionid,createdate,username,password,displayname) VALUES($1,$2,$3,$4,$5,$6)`, userValList)
    }
    catch(err)
    {
        console.log(`The following error occured while addig a new User to DB: ${err}`);
        return err;
    }
    finally
    {
        client.release(true);
    }
}

const UpdateUser = async (userData) =>
{

    const client = await pool.connect();
    try 
    {
        return await pool.query(`UPDATE ticketuser SET teamid=$5,permissionid=$1,username=$2,password=$3,displayname=$4,modifiedat=$7 WHERE id=$6 `);
    } 
    catch (err) 
    {
        console.log(`The following error occured while updating a User: ${err}`);
        return err;
    }
    finally
    {
        client.release(true);
    }
}

export {GetUserByTeamId, GetUserByUsername, GetUserByUserId, AddUser, UpdateUser}