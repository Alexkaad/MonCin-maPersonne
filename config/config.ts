
import { Dialect } from 'sequelize';

interface IConfig {
    username: string;
    password?: string ;
    database: string;
    host: string;
    dialect: Dialect;
}

interface IConfigEnv {
    [key: string]: IConfig; // Index signature
    development: IConfig;
    test: IConfig;
    production: IConfig;
}

const config: IConfigEnv = {
    development: {
        username: 'root',
        password: undefined,
        database: 'database_development',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: 'root',
        password: undefined,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: 'root',
        password: undefined,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

export default config;
