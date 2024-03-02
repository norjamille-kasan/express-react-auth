import { sign } from "jsonwebtoken";

export const ACCESS_TOKEN_KEY =
    process.env.ACCESS_TOKEN_KEY || "access-token-key";
export const SECRET_TOKEN_KEY =
    process.env.SECRET_TOKEN_KEY || "secret-token-key";

export function generateAccessToken(u: { id: number; email: string }) {
    return sign(u, ACCESS_TOKEN_KEY, { expiresIn: "15m" });
}

export function generateRefreshToken(u: { id: number; email: string }) {
    return sign(u, SECRET_TOKEN_KEY, { expiresIn: "7d" });
}
