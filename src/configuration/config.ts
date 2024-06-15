import { SequelizeModuleOptions } from "@nestjs/sequelize";
import * as dotenv from 'dotenv';

dotenv.config();

export const config: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    autoLoadModels: true,
    synchronize: true
}