import {getSpiraPool} from './DbConnection.mjs'

const pool = getSpiraPool();

const AddTask = async (task) =>
{
    let task = [];
    try 
    {
        task = await pool.query(`INSERT INTO task(displayname, teamid, createuserid, assigneuserid, description, createdate, tasktypeid, taskpriorityid, taskstateid,uploadfilename) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING displayname, teamid, createuserid, assigneuserid, description, tasktypeid, taskpriorityid, taskstateid,uploadfilename`, task);
        return task.rows;
    } 
    catch (error) 
    {
        console.log(`The following error occured while adding a task to DB: ${error}`);
    }
}

const GetTask = async (getParam) =>
{
    const condition = Object.keys(getParam)[0];
    try 
    {
        return await pool.query(`SELECT * FROM task WHERE ${condition}= $1`,getParam[condition]);
    } 
    catch (error) 
    {
        console.log(`The following error occured while getting task: ${error}`);
    }
}

const UpdateTask = async (task) =>
{
        return await pool.query(`UPDATE task SET assignuserid=$3,displayname=$4,description=$5,tasktypeid=$6,taskpriorityid=$7,taskstateid=$8,uploadfilename=$9,modifieddate=$2 WHERE id=$1 RETURNING displayname, teamid, createuserid, assigneuserid, description, tasktypeid, taskpriorityid, taskstateid,uploadfilename`, task);  

}

export{AddTask, GetTask, UpdateTask}