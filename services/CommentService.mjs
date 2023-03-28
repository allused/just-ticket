import {getSpiraPool} from './DbConnection.mjs'

const pool = getSpiraPool();

const AddComment = async (comment) => 
{
    return await pool.query('INSERT INTO comment(description,createdate,createUserId,taskId) VALUES($1,$2,$3,$4) RETURNING description,createdate,createUserId,taskId', comment);
}

const GetCommentByTaskId = async (taskId) =>
{
    return await pool.query('SELECT * FROM comment WHERE taskId = $1', taskId);
}

const UpdateComment = async (comment) =>
{
    return await pool.query('UPDATE commment SET description=$3, modifieddate=$2 WHERE id=$1 RETURNING description,createUserId,taskId');
}

const SetCommentDeleted = async (commentId) =>
{
    return await pool.query('UPDATE comment SET isAlive=false WHERE id=$1');
}