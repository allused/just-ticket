import format from 'pg-format'

const userPermissionValues = 
[
    [1,'Guest',false,true,false],
    [2,'Member',true,true,false],
    [3,'Admin',true,true,true]
];


const AddBasicUserPermissionTypes = (dbPool) => {
    try{

         dbPool.connect() 
        dbPool.query(format('insert into userpermission values %L', userPermissionValues),[], (error,result) => 
        {
            console.log(result)
            console.log(error)
        })
        dbPool.end()
    } catch(error){
        console.log(error)
    }
} 

export { AddBasicUserPermissionTypes }