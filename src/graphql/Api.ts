import { GraphQLScalarType } from "graphql";
import { QueryDocumentKeys } from "graphql/language/ast";
import { objectType, interfaceType, extendType, nonNull, stringArg } from "nexus";
import { traceDeprecation } from "process";
require('dotenv').config()

export const API = objectType({
    name:"API",
    definition(t) {
        //t.nonNull.string("query")
        //I may need to break this out into individual api response pieces
        t.nonNull.string('query')
        t.string('data')
    }
})

export const API_Call = extendType({
    type:"Mutation",
    definition(t) {
        t.nonNull.field("API_Call", {
            type: API,
            args: {
                query: nonNull(stringArg()),
            },
            // @ts-ignore
            async resolve(parent, args, context) {
                console.log('my query from client side is ' , args.query)
                const URL = `https://api.yelp.com/v3/businesses/search?term=restaurants${args.query.toLowerCase()}&limit=2`
                //console.log('Sending API request to ' , URL)
                const HEADERS = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.API_KEY}`,
                        'Accept-Language': 'en-US',
                    }
                }           
                   
                //console.log('args query' , args.query)
                const QLURL = `https://api.yelp.com/v3/graphql`
                const QLHEADERS = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/graphql",
                        "Authorization": `Bearer ${process.env.API_KEY}`,
                        'Accept-Language': 'en-US',
                    },
                    body:`${args.query}`
                }
                console.log('Attempting fetch from server with ' , URL ,HEADERS)
                const resp = await fetch(URL , HEADERS)
                const response = await resp.json()
                console.log('Got this resposne' , response)
                const BUSINESSURL = `https://api.yelp.com/v3/businesses/${response.businesses[0].id}`

                const businessSpecifics = await fetch(BUSINESSURL , HEADERS)
                const bsRes = await businessSpecifics.json()
                console.log('I got these business specifics ' , bsRes)
                const data = await context.prisma.api.create({
                    data:{data : JSON.stringify(response)}
                })
                return data
            }
        })
    },
})