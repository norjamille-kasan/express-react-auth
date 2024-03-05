import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth_config from "../config/auth";
import { findUserById, findUserByJwtVersion } from "../services/auth.service";

export let AUTH_USER: {
    id: number;
    email: string;
    jwtVersion: string;
} | null;

export async function authGlobalMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (!accessToken) {
            AUTH_USER = null;
            return next();
        }
        const payload: any = verify(accessToken, auth_config.access_token_key);
        const user = await findUserById(payload.id);
        if (!user || user.jwtVersion !== payload.jwtVersion) {
            AUTH_USER = null;
            return next();
        }
        AUTH_USER = {
            id: user.id,
            email: user.email ?? "",
            jwtVersion: user.jwtVersion ?? "",
        };
        next();
    } catch (error) {
        AUTH_USER = null;
        return next();
    }
}
