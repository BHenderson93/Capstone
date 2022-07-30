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
                const URL = `https://api.yelp.com/v3/businesses/search?term=delis&${args.query}&limit=2`
                console.log('Sending API request to ' , URL)
                const HEADERS = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.API_KEY}`,
                        'Accept-Language': 'en-US',
                    }
                }                
                console.log('args query' , args.query)
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

                const testURL = `https://www.yelp.com/biz/zylberschteins-delicatessen-and-bakery-seattle-2?adjust_creative=H3CpHLxnx7i5nqIdbxEPrA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=H3CpHLxnx7i5nqIdbxEPrA`

                const testHeaders = 123
                console.log('Attempting fetch from server')
                const resp = await fetch(URL , HEADERS)
                console.log('Got this response' , resp)
                const response = await resp.json()
                console.log('Got this resposne' , response)
                const data = await context.prisma.api.create({
                    data:{data : JSON.stringify(response)}
                })
                return data
            }
        })
    },
})