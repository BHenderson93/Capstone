import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";
import * as jwt from "jsonwebtoken";
import { decode } from "punycode";
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

export interface Payload{
    user: UserInfo,
    iat: number
}

export interface UserInfo{
    id: number,
    name: string,
    email: string
}

export const MoodMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('create', {
            type: "Mood",
            args: {
                name: nonNull(stringArg()),
                categories: nonNull(stringArg()),
                price: nonNull(intArg()),
                token: nonNull(stringArg())
            },
            async resolve(parent, args, context, info) {
                const {user} = jwt.verify(args.token, String(process.env.APP_SECRET)) as Payload
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
        })
    }
})