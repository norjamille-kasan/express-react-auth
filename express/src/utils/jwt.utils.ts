import { sign } from "jsonwebtoken";
import auth_config from "../config/auth";
import { Response } from "express";

export function generateAccessToken(u: { id: number; jwtVersion: string }) {
    return sign(u, auth_config.access_token_key, {
        expiresIn: auth_config.atk_exp,
    });
}

export function generateRefreshToken(u: { id: number; jwtVersion: string }) {
    return sign(u, auth_config.refresh_token_key, {
        expiresIn: auth_config.rtk_exp,
    });
}

export function sendRefreshToken(res: Response, token: string) {
    res.cookie(auth_config.cookie_name, token, {
        httpOnly: true,
        path: "/auth/refresh-token",
    });
}
