import format from 'pg-format'

const taskTypeValues = 
[
    [1, 'Change request'],
    [2,'BUG'],
    [3,'Live BUG']
];

const AddBasicTaskTypes = async (dbPool) => {
    try{

        await dbPool.connect() 
        dbPool.query(format('select * from tasktype'),[], (error,result) => 
        {
            console.log(result['rows'][1])
            console.log(error)
        })
        await dbPool.end()
    } catch(error){
        console.log(error)
    }
} 

export { AddBasicTaskTypes }