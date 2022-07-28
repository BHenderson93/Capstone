import * as jwt from 'jsonwebtoken'
import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";

export const Mood = objectType({
    name: "Mood",
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        t.nonNull.string('categories')
        t.nonNull.int('price')
        t.nonNull.field('createdBy', {
            type: 'User',
            resolve(parent, args, context) {
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
            resolve(parent, args, context, info) {

                return context.prisma.mood.create({
                    data: {
                        name: args.name,
                        categories: args.categories,
                        price: args.price,
                        createdBy: { connect: { id: user.id } }
                    }
                })
            }
        })
    }
})