import { Router } from "express";
import {
    handleLoginRequest,
    handleRefreshTokenRequest,
    handleRegisterRequest,
} from "../controllers/auth.controller";

const auth = Router();

auth.post("/register", handleRegisterRequest);

auth.post("/login", handleLoginRequest);

auth.post("/refresh-token", handleRefreshTokenRequest);

export default auth;
