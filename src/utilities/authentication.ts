import * as jwt from "jsonwebtoken";
require('dotenv').config()

interface AuthTokenPayload {
    name: string;
    id: number;
    email: string;
}

interface token{
    user:AuthTokenPayload,
    iat: number
}

export function decodeTokenPayload(token:string): AuthTokenPayload | null{
    const checkToken = jwt.verify(token, String(process.env.APP_SECRET)) as token
    if (checkToken){
        const {name , id , email } = checkToken.user
        return { name ,id ,email }
    }else{
        return null
    }
}