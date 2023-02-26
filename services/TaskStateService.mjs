import format from 'pg-format'

const taskStateValues = 
[
    [1,'Not started','notstarted'],
    [2,'In progress','inprogress'],
    [3,'Completed','completed']
];


const AddBasicTaskStates = (dbPool) => {
    try{

        dbPool.connect() 
        dbPool.query(format('insert into taskstate values %L', taskStateValues),[], (error,result) => 
        {
            console.log(result)
            console.log(error)
        })
        //await dbPool.end()
    } catch(error){
        console.log(error)
    }
} 

export { AddBasicTaskStates }