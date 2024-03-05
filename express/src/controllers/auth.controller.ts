import { Request, Response } from "express";
import {
    createUser,
    findUserByEmail,
    findUserById,
    findUserByJwtVersion,
} from "../services/auth.service";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
import {
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
} from "../utils/jwt.utils";
import auth_config from "../config/auth";
import { verify } from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function handleRegisterRequest(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body as {
            name: string;
            email: string;
            password: string;
        };
        const user = await findUserByEmail(email);

        if (user) {
            return res.status(401).json({
                success: 419,
                message: "Email is already taken",
                data: {
                    accessToken: null,
                },
            });
        }

        const hashedPassword = await hash(password, 10);
        const jwtVersion = uuidv4();
        const insertResult = await createUser({
            name: name,
            email: email,
            jwtVersion: jwtVersion,
            password: hashedPassword,
        });

        const jwtPayload = {
            id: insertResult[0].insertId,
            jwtVersion: jwtVersion,
        };
        sendRefreshToken(res, generateRefreshToken(jwtPayload));
        res.status(200).json({
            success: true,
            message: "New account has been saved",
            data: {
                accessToken: generateAccessToken(jwtPayload),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
}

export async function handleLoginRequest(req: Request, res: Response) {
    try {
        console.log(req);
        const { email, password } = req.body as {
            email: string;
            password: string;
        };
        console.log(req.body);
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
                data: {
                    accessToken: null,
                },
            });
        }

        const verified = bcrypt.compare(password, user.password!);

        if (!verified) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
                data: {
                    accessToken: null,
                },
            });
        }

        const jwtPayload = {
            id: user.id,
            jwtVersion: user.jwtVersion!,
        };

        sendRefreshToken(res, generateRefreshToken(jwtPayload));

        res.status(200).json({
            success: true,
            message: "New account has been saved",
            data: {
                accessToken: generateAccessToken(jwtPayload),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
}

export async function handleRefreshTokenRequest(req: Request, res: Response) {
    try {
        const refreshToken = req.cookies.jid;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
                data: null,
            });
        }
        const payload: any = verify(
            refreshToken,
            auth_config.refresh_token_key
        );

        const user = await findUserById(payload.id);

        if (!user || user.jwtVersion !== payload.jwtVersion) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
                data: null,
            });
        }

        const newPayload = {
            id: user.id,
            jwtVersion: user.jwtVersion!,
        };

        sendRefreshToken(res, generateRefreshToken(newPayload));

        res.status(200).json({
            success: true,
            message: "New access token has been generated",
            data: {
                accessToken: generateAccessToken(newPayload),
            },
        });
    } catch (error) {
        res.status(401).json({
            message: "Authentication failed",
        });
    }
}
