import * as jwt from 'jsonwebtoken'
import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";

export const Mood = objectType({
    name: "Mood",
    definition(t) {
        t.nonNull.field('createdBy', {
            type: 'User',
            args: {
                token: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                jwt.verify(args.token, String(process.env.APP_SECRET), (err, decoded) => {
                    const payload = JSON.parse(window.atob(decoded.split('.')[1]))
                    if (err || payload.exp < Date.now() / 1000) {
                        throw new Error("Invalid token.")
                    }
                    return context.prisma.link.findUnique({
                        where: { email: payload.email }
                    })
                })
            }
        })
    }
})