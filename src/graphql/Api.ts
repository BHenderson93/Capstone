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

                const cats: string[] = args.categories.replaceAll(' ' , '%20').split('*')

                const limit = 1
                const HEADERS = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.API_KEY}`,
                        'Accept-Language': 'en-US',
                    }
                }
                let responseList = []
                for(let cat of cats){
                    const URL = `https://api.yelp.com/v3/businesses/search?term=${cat.toLowerCase()}&location=${args.location}&limit=${limit}`
                    console.log('Attempting fetch from server with ', URL, HEADERS)
                    const resp = await fetch(URL, HEADERS)
                    const response = await resp.json()
                    //console.log('Got this response', response)
                    responseList.push(response.businesses[0])
                }
                console.log('My response list is ' , responseList)

                if(responseList){
                    console.log('starting  fetch for business specifics')
                    let restList = []
                    for (let i = 0; i < responseList.length; i++) {
                        const BUSINESSURL = `https://api.yelp.com/v3/businesses/${responseList[i].id}`
                        console.log('biz url is ' , BUSINESSURL)
                        const businessSpecifics = await fetch(BUSINESSURL, HEADERS)
                        const res = await businessSpecifics.json()
                        const { name, photos, rating, price, display_phone, location } = res
                        console.log('biz spec res is' , res)
                        restList.push(JSON.stringify({
                            name,
                            photos,
                            rating,
                            price,
                            display_phone,
                            location
                        }))
                        console.log(name)
                    }
                        const data = await context.prisma.api.create({
                            data: { data: restList.join('*') }
                        })
                        return data
                }else{
                    throw new Error("No yelp response!")
                } 
            }
        })
    },
})