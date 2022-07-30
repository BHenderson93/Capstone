import { objectType, extendType, nonNull, stringArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken"

require('dotenv').config()
const APP_SECRET = String(process.env.APP_SECRET)

export const AuthPayload = objectType({
    name: "AuthPayload",
    definition(t) {
        t.nonNull.string("token");
        t.nonNull.field("user", {
            type: "User",
        });
    },
});

export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("signup", {
            type: "AuthPayload",  
            args: {  
                email: nonNull(stringArg()), 
                password: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                const { email, name } = args

                const password = await bcrypt.hash(args.password, 10)
                const checkUser = await context.prisma.user.findUnique({
                    where:{email:args.email}
                })
                if (!checkUser){

                    const user = await context.prisma.user.create({
                        data: { email, name, password },
                    })
                    const token = jwt.sign({ userId: user.id }, APP_SECRET)

                    return {
                        token,
                        user,
                    }
                    
                }else{
                    console.log(`User with ${email} already exists`)
                    throw new Error("Email already in use.")
                }
            },
        })

        t.nonNull.field("login", { 
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                console.log('Finding user for ' , args.email)

                const user = await context.prisma.user.findFirst({
                    where: { email: args.email },
                })
                const checking = await context.prisma.user.findMany()
                console.log(checking)
                if (!user) {
                    throw new Error("No such user found");
                }

                const valid = await bcrypt.compare(
                    args.password,
                    user.password,
                )
                if (!valid) {
                    throw new Error("Invalid password");
                }

                const {password , ...noPass} = user
                const token = jwt.sign({ user: noPass}, APP_SECRET);
                return {
                    token,
                    user,
                }
            },
        })
    },
})