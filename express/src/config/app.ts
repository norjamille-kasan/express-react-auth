const app_config = {
    PORT: process.env.APP_PORT || 3001,
    URL: process.env.APP_URL || "http://localhost",
    ENV: process.env.APP_ENV || "local",
};

export default app_config;
