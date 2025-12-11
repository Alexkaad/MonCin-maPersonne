
import {Sequelize} from "sequelize";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: "./.env.local"});

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: "postgres",
    logging: false,
});

export default sequelize;
export { sequelize };