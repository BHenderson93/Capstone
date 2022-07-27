import { extendType, nonNull, objectType, stringArg , intArg } from "nexus";   

export const User = objectType({
    name:"User",
    definition(t){
        t.nonNull.int("id")
        t.nonNull.string("name")
        t.nonNull.string("email")
        t.nonNull.string("password")
    }
})

export const UserQuery = extendType({  
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("userslist", {   
            type: "User",
            resolve(parent, args, context, info) {    
                return context.prisma.user.findMany();
            },
        });
    },
});