import { defineConfig } from "drizzle-kit";
import database_config from "./database";

export default defineConfig({
    schema: "./src/database/schemas/*",
    driver: "mysql2",
    out: "./src/database/migrations",
    dbCredentials: database_config,
    verbose: true,
    strict: true,
});
