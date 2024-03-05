const database_config = {
    database: process.env.DB_NAME || "express",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
};
export default database_config;
