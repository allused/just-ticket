import { SpiraDbCredentials } from '../enums/Enums.mjs';


const pgconfig = {
    dev: {
        dbUser: SpiraDbCredentials.DB_USER,
        dbHost: SpiraDbCredentials.DB_HOST,
        dbName: SpiraDbCredentials.DB_NAME,
        dbPassword: SpiraDbCredentials.DB_PASSWORD,
        port: 5432,
        max: 20,
        connectionTimeout: 10000,
        idleTimeout: 10000
    }
}

export {pgconfig}