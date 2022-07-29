import { linkSync } from "fs";
import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";
import * as jwt from 'jsonwebtoken'

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("name")
        t.nonNull.string("email")
        t.nonNull.string("password")
        t.nonNull.list.nonNull.field("moods", {
            type: "Mood",
            resolve(parent, args, context) {
                return context.prisma.mood.findMany({
                    where: { createdById: parent.id }
                })
            }
        })
    }
})

interface Payload {
    user: UserInfo,
    iat: number
}

interface UserInfo {
    id: number,
    name: string,
    email: string
}

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("usermoods", {
            type:"Mood",
            args: {
                token: nonNull(stringArg())
            },
            async resolve(parent, args, context, info) {
                const { user } = jwt.verify(args.token, String(process.env.APP_SECRET)) as Payload
                const moods = await context.prisma.mood.findMany({
                    where: { createdById: user.id }
                })
                return moods
            }
        });
    },
});