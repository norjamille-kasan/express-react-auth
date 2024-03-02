import { createServer } from "http";
import app from "./app";

const server = createServer(app);

const PORT = process.env.PORT || 3001;
const SERVER_URL = process.env.SERVER_URL || "http://localhost";

server.listen(PORT, () => {
    console.log(`Server is running at ${SERVER_URL}:${PORT}`);
});
