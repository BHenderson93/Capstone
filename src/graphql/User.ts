import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("name")
        t.nonNull.string("email")
        t.nonNull.string("password")
        t.list.field("moods", {
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