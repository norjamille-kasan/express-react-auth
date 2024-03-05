import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import cors from "cors";
import app from "./app";
import app_config from "./config/app";

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

const server = createServer(app);

server.listen(app_config.PORT, () => {
    console.log(`Server is running at ${app_config.URL}:${app_config.PORT}`);
    console.log(`Environtment : ${app_config.ENV}`);
});
