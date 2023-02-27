import {getSpiraPool} from './DbConnection.mjs'

const pool = getSpiraPool();

const AddTask = async (task) =>
{
    try 
    {
        return await pool.query(`INSERT INTO task(displayname, teamid, userid, description, createdate, tasktypeid,taskpriorityid) VALUES ($1,$2,$3,$4,$5,$6,$7)`, task)
    } 
    catch (error) 
    {
        console.log(`The following error occured while adding a task to DB: ${error}`);
    }
}

const GetTask = async (getParam) =>
{
    const condition = "userId" in getParam ? "userid" : "teamid";
    try 
    {
        return await pool.query(`SELECT * FROM task WHERE ${condition}= $1`,["userId" in getParam ? getParam["userId"] : getParam["teamId"]])
    } 
    catch (error) 
    {
        console.log(`The following error occured while getting task: ${error}`)
    }
}

export{AddTask, GetTask}