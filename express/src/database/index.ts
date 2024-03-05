import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import database_config from "../config/database";

const connection = mysql.createConnection(database_config);
export const db = drizzle(connection, { logger: true });
