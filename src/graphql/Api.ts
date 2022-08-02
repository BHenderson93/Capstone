import { objectType, interfaceType, extendType, nonNull, stringArg } from "nexus";
require('dotenv').config()
import axios from 'axios'

export const API = objectType({
    name: "API",
    definition(t) {
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
                categories: nonNull(stringArg()),
                price: nonNull(stringArg())
            },
            async resolve(parent, args, context) {

                const dataToReturn = new Promise<[]>((resolve, reject) => {
                    const cats: string[] = args.categories.replaceAll(' ', '%20').split('*')
                    const limit = Math.ceil(20 / cats.length)
                    const HEADERS = {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.API_KEY}`,
                            'Accept-Language': 'en-US',
                        }
                    }
                    let urlList = []
                    for (let cat of cats) {

                        const URL = `https://api.yelp.com/v3/businesses/search?term=${cat.toLowerCase()}&location=${args.location.trim().replace(' ', '%20')}&price=${args.price}&limit=${limit}`
                        urlList.push(URL)
                    }

                    Promise.allSettled(urlList.map((url) => axios(url, HEADERS))).then((resList: any) => {
                        let categListUrls: string[] = []
                        resList.map((categ: any) => categ.value.data.businesses.map((biz: any) => {
                            categListUrls.push(`https://api.yelp.com/v3/businesses/${biz.id}`)
                        }))

                        Promise.allSettled(categListUrls.map((url) => axios(url, HEADERS))).then((specificResponses: any) => {

                            if (specificResponses.length === 0) {
                                resolve([])
                            } else {
                                //Important to filter out all the error returns
                                //console.log(specificResponses)
                                resolve(specificResponses.filter((item1: any) => item1.value !== undefined).filter((item: any) => item.value.status === 200).map((item: any) => item.value.data))
                            }
                        })
                    })
                })

                const returnValue = new Promise<any>((resolve, reject) => {
                    dataToReturn.then(async (data: any) => {
                        if (data.length === 0) {
                            resolve('No responses.')
                        } else {
                            const ret = JSON.stringify(data)
                            const returnVal = await context.prisma.api.create({
                                data: { data: ret }

                            })
                            resolve(returnVal)
                        }
                    })
                })
                return await returnValue
            }
        })
    },
})