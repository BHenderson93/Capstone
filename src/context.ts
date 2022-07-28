import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader } from "./utilities/authentication";
import { Request } from "express"; 
export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
    user?: User
}

export interface User{
    name: string
    id: number
    email: string
}

export const context = ({ req }: { req: Request }): Context => {
    const token = req && req.headers.authorization? decodeAuthHeader(req.headers.authorization)
    : null 

    if(token){
        return{
            prisma,
            user:{name: token.name , email:token.email , id:token.id}
        }
    }
    return{prisma}
    
};