import { extendType, nonNull, objectType, stringArg, intArg, idArg, arg } from "nexus"

export const Mood = objectType({
    name: "Mood",
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        t.nonNull.string('categories')
        t.nonNull.int('price')
        t.nonNull.field("createdBy" , {
            type: "User",
            resolve(parent , args, context){
                return context.prisma.mood.findUnique({
                    where: { id: parent.id }
                }).createdBy()
            }
        })
    }
})

interface Payload{
    user: UserInfo,
    iat: number
}

interface UserInfo{
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
                categories: nonNull(stringArg()),
                price: nonNull(intArg()),
                token: nonNull(stringArg())
            },
            async resolve(parent, args, context, info) {
                const { user } = context
                console.log('Attempting create for ' , user)
                const { name , categories, price } = args
                if(user){
                    const newMood = context.prisma.mood.create({
                        data: {
                            name,
                            categories,
                            price,
                            createdBy: { connect: { id: user.id}}
                        }
                    })
                    return newMood
                }else{
                    throw new Error ('Please submit valid token with this request. Unable to verify user.')
                }

            }
        }),
        t.nonNull.field("update" , {
            type:"Mood",
            args:{
                id:nonNull(intArg()),
                name: nonNull(stringArg()),
                categories: nonNull(stringArg()),
                price: nonNull(intArg()),
                token: nonNull(stringArg())
            },
            async resolve(parent, args, context , info){
                const { user } = context
                if(user){
                    const moodRecord = await context.prisma.mood.findFirstOrThrow({
                        where:{
                            AND:[
                                {id:args.id},
                                {createdById:user.id}
                            ]
                        }
                    })
                    if(moodRecord.createdById){
                        return await context.prisma.mood.update({
                            where: { id: args.id },
                            data:{
                                name:args.name,
                                categories:args.categories,
                                price:args.price
                            }
                        })
                    }else{
                        throw new Error("Cannot verify user as owner of that mood.")
                    }

                }else{
                    throw new Error("Invalid JWT for update.")
                }
            }
        })
        t.field("delete" , {
            type:"Mood",
            args:{
                id:nonNull(intArg()),
                token:nonNull(stringArg())
            },
            async resolve(parent, args, context, info){
                const {user} = context
                if(user){
                    const moodRecord = await context.prisma.mood.findFirst({
                        where:{
                            AND:[
                                {id:args.id},
                                {createdById:user.id}
                            ]
                        }
                    })
                    if(moodRecord){
                        return context.prisma.mood.delete({
                            where: {id:args.id}
                        })
                    }else{
                        throw new Error("Cannot verify user as owner of mood.")
                    }
                }else{
                    throw new Error("Cannot verify user status.")
                }
            }
        })
    }
})