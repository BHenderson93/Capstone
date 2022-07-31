import { objectType, interfaceType, extendType, nonNull, stringArg } from "nexus";
require('dotenv').config()

export const API = objectType({
    name: "API",
    definition(t) {
        //t.nonNull.string("query")
        //I may need to break this out into individual api response pieces
        t.nonNull.string('location')
        t.nonNull.string('categories')
        t.string('data')
    }
})

export const API_Call = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("API_Call", {
            type: API,
            args: {
                location: nonNull(stringArg()),
                categories: nonNull(stringArg())
            },
            // @ts-ignore
            async resolve(parent, args, context) {
                console.log('my query from client side is ', args)

                const cats = args.categories.split('*')
                const limit = 40
                const HEADERS = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.API_KEY}`,
                        'Accept-Language': 'en-US',
                    }
                }

                const URL = `https://api.yelp.com/v3/businesses/search?term=${cats[0].toLowerCase()}&location=${args.location}&limit=${limit}`
                console.log('Attempting fetch from server with ', URL, HEADERS)
                const resp = await fetch(URL, HEADERS)
                const response = await resp.json()
                console.log('Got this response', response)

/*                 let restList = []
                for (let i = 0; i < response.businesses.length; i++) {
                    const BUSINESSURL = `https://api.yelp.com/v3/businesses/${response.businesses[i].id}`
                    const businessSpecifics = await fetch(BUSINESSURL, HEADERS)
                    const { name, photos, rating, price, display_phone, location } = await businessSpecifics.json()
                    restList.push({
                        name,
                        photos,
                        rating,
                        price,
                        display_phone,
                        location
                    })
                } */
                if(response){
                    const data = await context.prisma.api.create({
                        data: { data: JSON.stringify(response.businesses) }
                    })
                    return data
                }else{
                    throw new Error("Bad Yelp Fetch")
                }
                
            }
        })
    },
})