import "reflect-metadata";
import { DataSource } from "typeorm";
import { Employee } from "./entity/Employee";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "employees",
  synchronize: true,
  logging: false,
  entities: [Employee],
  migrations: [],
  subscribers: [],
});
