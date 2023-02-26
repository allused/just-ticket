import { pgconfig } from '../config/Config.mjs';
import Pool from 'pg';

const devConfig = pgconfig.dev;
const spiraConfig = {
    user: devConfig.dbUser,
    host: devConfig.dbHost,
    database: devConfig.dbName,
    password: devConfig.dbPassword,
    port: devConfig.port,
    max:devConfig.max,
    connectionTimeoutMillis: devConfig.connectionTimeout,
    idleTimeoutMillis: devConfig.idleTimeout
}

console.log('Db config: '+ devConfig.dbHost)

let spiraPool = null;

const getSpiraPool = () => 
{
    if (spiraPool != null) 
    {
        return spiraPool;
    }
    else
    {
        try
        {
            spiraPool =  new Pool.Pool(spiraConfig);
            return spiraPool;
        } catch(err){
            console.log(`Error caught when creating spira pool: ${err}`)
        }
    }
} 


export { getSpiraPool }
