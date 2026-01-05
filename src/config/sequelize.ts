import { QueryTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    schema: "public",
    timezone: process.env.DB_TIMEZONE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    typeValidation: true,
    query: { type: QueryTypes.SELECT },
  }
);
