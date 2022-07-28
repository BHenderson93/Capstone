import { GraphQLScalarType } from "graphql";
import { QueryDocumentKeys } from "graphql/language/ast";
import { objectType, interfaceType, extendType, nonNull, stringArg } from "nexus";
import { traceDeprecation } from "process";

export const API = objectType({
    name:"API",
    definition(t) {
        //t.nonNull.string("query")
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
                const URL = `https://api.yelp.com/v3/businesses/search?term=delis&${args.query}&limit=2`

                const HEADERS = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer DYEOtJwaWZrL76Z5F6k-SLsKBfac_5__UMt1wMBuNPZkkRTNLFxgK3BJi-9ZO6nr4-Pz6fBh_uqXULyBBPq-5JmERYqi9C4z2aRa1A5nA43CmU289V6qTFw_0zvfYnYx`,
                        'Accept-Language': 'en-US',
                    }
                }
                console.log('Attempting fetch from server')
                const resp = await fetch(URL, HEADERS)
                const response = await resp.json()
                const data = await context.prisma.api.create({
                    data:{data : JSON.stringify(response)}
                })
                return data
            }
        })
    },
})