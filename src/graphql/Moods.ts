import { extendType, nonNull, objectType, stringArg, intArg, idArg, arg, list } from "nexus"

export const Mood = objectType({
    name: "Mood",
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        t.nonNull.list.nonNull.string('categories')
        t.nonNull.int('price')
        t.field("createdBy", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.mood.findFirst({
                    where: { id: parent.id }
                }).createdBy()
            }
        })
    }
})

/* export const Categories = objectType({
    name:"Categories",
    definition(t){
        t.nonNull.list.nonNull.string
    }
}) */

export const MoodQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("usermoods", {
            type: "Mood",
            args: {
                token: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                const moodList = context.prisma.mood.findMany({
                    where: { createdById: context.user?.id }
                })
                return moodList
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

export const MoodMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("create", {
            type: "Mood",
            args: {
                name: nonNull(stringArg()),
                categories: nonNull(list(nonNull('String'))),
                price: nonNull(intArg()),
                token: nonNull(stringArg())
            },
            async resolve(parent, args, context, info) {
                const { user } = context
                console.log('Attempting create for ', user)
                const { name, categories, price } = args
                if (user) {
                    const newMood = context.prisma.mood.create({
                        data: {
                            name,
                            categories,
                            price,
                            createdBy: { connect: { id: user.id } }
                        }
                    })
                    return newMood
                } else {
                    throw new Error('Please submit valid token with this request. Unable to verify user.')
                }
            }
        }),
        t.nonNull.field("update", {
                type: "Mood",
                args: {
                    id: nonNull(intArg()),
                    name: nonNull(stringArg()),
                    categories: list(nonNull('String')),
                    price: nonNull(intArg()),
                    token: nonNull(stringArg())
                },
                async resolve(parent, args, context, info) {
                    const { user } = context
                    if (user) {
                        const moodRecord = await context.prisma.mood.findFirstOrThrow({
                            where: {
                                AND: [
                                    { id: args.id },
                                    { createdById: user.id }
                                ]
                            }
                        })
                        if (moodRecord) {
                            return await context.prisma.mood.update({
                                where: { id: args.id },
                                data: {
                                    name: args.name,
                                    categories: args.categories,
                                    price: args.price
                                }
                            })
                        } else {
                            throw new Error("Cannot verify user as owner of that mood.")
                        }

                    } else {
                        throw new Error("Invalid JWT for update.")
                    }
                }
        }),
        t.field("delete", {
            type: "Mood",
            args: {
                id: nonNull(intArg()),
                token: nonNull(stringArg())
            },
            async resolve(parent, args, context, info) {
                console.log('In delete resolver')
                const { user } = context
                if (user) {
                    const record = await context.prisma.mood.findMany({
                        where: {
                            AND: [
                                { id: args.id },
                                { createdById: user.id }
                            ]
                        }
                    })

                if(record){
                    return await context.prisma.mood.delete({
                        where:{id:args.id}
                    })
                }else{
                    throw new Error("Cannot verify user as owner.")
                }
                } else {
                    throw new Error("Cannot verify user as owner of mood.")
                }
        }
        })
    }
})