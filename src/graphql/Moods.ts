import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";

export const Mood = objectType({
    name: "Mood",
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        t.nonNull.string('categories')
        t.nonNull.int('price')
        t.field("createdBy" , {
            type: "User",
            resolve(parent , args, context){
                return context.prisma.mood.findUnique({
                    where: { id: parent.id }
                }).createdBy()
            }
        })
    }
})

export const MoodMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('create', {
            type: "Mood",
            args: {
                name: nonNull(stringArg()),
                categories: nonNull(stringArg()),
                price: nonNull(intArg()),
            },
            async resolve(parent, args, context, info) {

                const { name , categories, price } = args
                if(context.user){
                    const newMood = context.prisma.mood.create({
                        data: {
                            name,
                            categories,
                            price,
                            createdBy: { connect: { id: context.user.id}}
                        }
                    })
                    return newMood
                }else{
                    throw new Error ('Please submit valid token with this request. Unable to verify user.')
                }

            }
        })
    }
})