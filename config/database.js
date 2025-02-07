import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD, {
//         host: process.env.DB_HOST,
//         dialect: 'postgres',
//         port: process.env.DB_PORT,
//     }
// );

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true, //Neon requiere SSL
        rejectUnauthorized: false,
      },
    },
  });

export { sequelize };