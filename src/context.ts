import { PrismaClient } from "@prisma/client";
import { decodeTokenPayload } from "./utilities/authentication";
import { Request } from "express";

export const prisma = new PrismaClient();

interface Context {
    prisma: PrismaClient;
    user?: User
}

interface User{
    name: string
    id: number
    email: string
}

export const context = ({ req }: { req: Request }): Context => {
    console.log(req.body)
    const token = req.body.variables.token? decodeTokenPayload(req.body.variables.token) : null
    console.log("token is " , token)
    if(token){
        return{
            prisma,
            user:{name: token.name , email:token.email , id:token.id}
        }
    }
    return{prisma}
};