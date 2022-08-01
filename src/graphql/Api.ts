import { objectType, interfaceType, extendType, nonNull, stringArg } from "nexus";
require('dotenv').config()

export const API = objectType({
    name: "API",
    definition(t) {
        t.string('location')
        t.string('categories')
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
            async resolve(parent, args, context) {
        
                const dataToReturn = new Promise <[]> ((resolve,reject)=>{
                    const cats: string[] = args.categories.replaceAll(' ', '%20').split('*')
                    const limit = Math.floor( 30 / cats.length)
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

                        const URL = `https://api.yelp.com/v3/businesses/search?term=${cat.toLowerCase()}&location=${args.location.trim().replace(' ', '%20')}&limit=${limit}`

                        urlList.push(URL)
                    }

                    Promise.allSettled(urlList.map((url) => fetch(url, HEADERS))).then((resList: any) => {

                        Promise.allSettled(resList.map((categoryRes: any) => categoryRes.value.json())).then((categValJSON) => {
                            let categListUrls: string[] = []
                            categValJSON.map((categ: any) => categ.value.businesses.map((biz: any) => {
                                categListUrls.push(`https://api.yelp.com/v3/businesses/${biz.id}`)
                            }))

                            Promise.allSettled(categListUrls.map((url) => fetch(url, HEADERS))).then((specificResponses) => {

                                Promise.allSettled(specificResponses.map((bizRes: any) => bizRes.value.json())).then(async (bizJSON: any) => {
                                    //Important to filter out all the error returns
                                    resolve(bizJSON.filter((item:any)=>!item.value.error))
                                })
                            })
                        })
                    })
                })

                const returnVal = new Promise<any> ((resolve,reject)=>{
                    dataToReturn.then(async (data:any)=>{
                    const ret = JSON.stringify(data.map((promise:any)=>promise.value))
                    const returnVal = await context.prisma.api.create({
                        data: { data: ret }
                    })
                    resolve(returnVal)
                })
            })

            return await returnVal
            }
        })
    },
})