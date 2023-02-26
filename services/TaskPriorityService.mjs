import format from 'pg-format'

const taskPriorityValues = 
[
    [1,1, 'Low'],
    [2,2,'Medium'],
    [3,3,'High'],
    [4,4,'Critical'],

];


const AddBasicPriorityTypes = (dbPool) => {
    try{

        dbPool.connect() 
        dbPool.query(format('insert into taskpriority values %L', taskPriorityValues),[], (error,result) => 
        {
            console.log(result)
            console.log(error)
        })
        //await dbPool.end()
    } catch(error){
        console.log(error)
    }
} 

export { AddBasicPriorityTypes }