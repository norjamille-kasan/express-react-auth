import { Router, Request, Response } from "express";
import {
    ACCESS_TOKEN_KEY,
    SECRET_TOKEN_KEY,
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt.utils";
import { verify } from "jsonwebtoken";

const auth = Router();

const USERS = [
    {
        id: 1,
        email: "test1@gmail.com",
        password: "password",
    },
    {
        id: 2,
        email: "test2@gmail.com",
        password: "password",
    },
];

auth.get("/protected", (req: Request, res: Response) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        if (!jwt) {
            return res.status(401).json({
                message: "Authentication failed",
            });
        }
        const user = verify(jwt, ACCESS_TOKEN_KEY);
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
            });
        }
        res.status(200).json({
            ok: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error,
        });
    }
});

auth.post("/login", (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        const user = USERS.find((u) => u.email === email);
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed",
                accessToken: null,
            });
        }

        const payload = {
            email: user.email,
            id: user.id,
        };
        const refreshToken = generateRefreshToken(payload);

        res.cookie("_host_jid", refreshToken);

        res.status(200).json({
            message: "login successfully",
            accessToken: generateAccessToken(payload),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

auth.post("/refresh-token", (req: Request, res: Response) => {
    const cookie = req.cookies;

    if (!cookie._host_jid) {
        return res.status(401).json({
            message: "Authentication failed",
        });
    }
    verify(cookie._host_jid, SECRET_TOKEN_KEY, (err: any, token: any) => {
        if (err) {
            res.cookie("_host_jid", null);
            return res.status(401).json({
                message: "Authentication failed",
                error: err,
            });
        }
        const payload = {
            email: token.email,
            id: token.id,
        };
        res.cookie("_host_jid", generateRefreshToken(payload));
        res.status(200).json({
            accessToken: generateAccessToken(payload),
        });
    });
});

export default auth;
