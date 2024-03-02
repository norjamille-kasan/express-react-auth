import express, { Request, Response, json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "./routes/auth.routes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ ok: true });
});

app.use("/auth", auth);

export default app;
