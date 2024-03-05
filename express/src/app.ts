import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
// routes
import auth from "./routes/auth.routes";
//--------
// middlewares
import {
    AUTH_USER,
    authGlobalMiddleware,
} from "./middlewares/auth-global.middleware";
//---------

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use(authGlobalMiddleware);

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(AUTH_USER);
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true });
});

app.use("/auth", auth);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        data: null,
    });
});

export default app;
