import { extendType, nonNull, objectType, stringArg, intArg,list } from "nexus"

export const Mood = objectType({
    name: "Mood",
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        //Looks like I may need another table to store my categories.
        t.nonNull.string('categories')
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

export const MoodQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field("usermoods", {
            type: "Mood",
            args: {
                token: nonNull(stringArg())
            },
            resolve(parent, args, context) {
                console.log('in usermoods')
                const moodList = context.prisma.mood.findMany({
                    where: { createdById: context.user?.id }
                })
                return moodList
            }
        })
    }
})

export const MoodMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createMood", {
            type: "Mood",
            args: {
                name: nonNull(stringArg()),
                categories: nonNull(stringArg()),
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
                            price,
                            categories,
                            createdBy: { connect: { id: user.id } }}
                    })
                    return newMood
                } else {
                    throw new Error('Please submit valid token with this request. Unable to verify user.')
                }
            }
        }),
        t.field("updateMood", {
                type: "Mood",
                args: {
                    id: nonNull(intArg()),
                    name: nonNull(stringArg()),
                    categories: nonNull(stringArg()),
                    price: nonNull(intArg()),
                    token: nonNull(stringArg())
                },
                async resolve(parent, args, context, info) {
                    const { user } = context
                    if (user) {
                        const {id, name, price, categories} = args
                        const moodRecord = await context.prisma.mood.findFirstOrThrow({
                            where: {
                                AND: [
                                    { id: args.id },
                                    { createdById: user.id }
                                ]
                            }
                        })
                        if (moodRecord) {
                            const oldRecord = context.prisma.mood.delete({
                                where:{id:args.id}
                            })

                            return context.prisma.mood.create({
                                data: {
                                    name,
                                    price,
                                    categories,
                                    createdBy: { connect: { id: user.id } }}
                            })
                        } else {
                            throw new Error("Cannot verify user as owner of that mood.")
                        }

                    } else {
                        throw new Error("Invalid JWT for update.")
                    }
                }
        }),
        t.field("deleteMood", {
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