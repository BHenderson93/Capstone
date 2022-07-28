import * as jwt from "jsonwebtoken";
require('dotenv').config()

export interface AuthTokenPayload {
    name: string;
    id: number;
    email: string;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
        throw new Error("No token found");
    }
    return jwt.verify(token, String(process.env.APP_SECRET)) as AuthTokenPayload;
}