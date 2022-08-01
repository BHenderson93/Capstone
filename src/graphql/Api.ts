import { PrismaClientRustPanicError } from "@prisma/client/runtime";
import { objectType, interfaceType, extendType, nonNull, stringArg } from "nexus";
import { resolve } from "path";
require('dotenv').config()

export const API = objectType({
    name: "API",
    definition(t) {
        //t.nonNull.string("query")
        //I may need to break this out into individual api response pieces
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
            // @ts-ignore
            async resolve(parent, args, context) {
                
                const dataToReturn = new Promise <[]> ((resolve,reject)=>{
                    console.log('my query from client side is ', args)
                    const cats: string[] = args.categories.replaceAll(' ', '%20').split('*')
                    const limit = 1
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
                        console.log('Attempting fetch from server with ', URL, HEADERS)
                        urlList.push(URL)
                        //console.log('Got this response', response)
                    }

                    Promise.allSettled(urlList.map((url) => fetch(url, HEADERS))).then((resList: any) => {
                        console.log('resList is ', resList)
                        Promise.allSettled(resList.map((categoryRes: any) => categoryRes.value.json())).then((categValJSON) => {
                            console.log('Category response value json', categValJSON)
                            let categListUrls: string[] = []
                            categValJSON.map((categ: any) => categ.value.businesses.map((biz: any) => {
                                categListUrls.push(`https://api.yelp.com/v3/businesses/${biz.id}`)
                            }))
                            console.log('Categ response list is ', categListUrls)

                            Promise.allSettled(categListUrls.map((url) => fetch(url, HEADERS))).then((specificResponses) => {
                                console.log('Specific responses are ', specificResponses)
                                Promise.allSettled(specificResponses.map((bizRes: any) => bizRes.value.json())).then(async (bizJSON: any) => {
                                    console.log('All buisnessList is (resolve promise) ', bizJSON)
                                    resolve(bizJSON)
                                })
                            })
                        })
                    })
                })

                const returnVal = new Promise<any> ((resolve,rejuect)=>{
                    dataToReturn.then(async (data:any)=>{
                    console.log("data from promise is " , data)
                    const ret = JSON.stringify(data.map((promise:any)=>promise.value))
                    const returnVal = await context.prisma.api.create({
                        data: { data: ret }
                    })
                    console.log("FINAL RETURN VALUE IS " , returnVal)
                    resolve(returnVal)
                })
            })
            console.log('awaited return val is ' , await returnVal)
            return await returnVal
            }
        })
    },
})

/* 
                    let bizURLs: string[] = []
                    response.forEach(async (categRes:any)=>{
                        console.log('categRes is ' , categRes)
                        if(categRes.value.status === 200){
                            let response = categRes.value.json()
                            response.businesses.forEach((biz:any)=>{
                                console.log('biz is ' , biz)
                                bizURLs.push(`https://api.yelp.com/v3/businesses/${biz.id}`)
                            })
                        }
                    })
                    console.log('biz urls are ' , bizURLs) */
/*                     let specificUrls = []
                    for(let i = 0 ; i < json.length; i++){
                        specificUrls.push()
                    } */
/*  let resList = []
 Promise.allSettled(specificUrls.map((url)=>fetch(url, HEADERS))).then((response)=>response.map((res:any)=>res.json())).then((json2)=>{
     console.log('Promise biz spec resp are ' , json2)
     return context.prisma.api.create({
         data: { data: JSON.stringify(json2.join('*')) }
     })
 }) */

/*                 const resp = await fetch(URL, HEADERS)
                const response = await resp.json()
                responseList.push(response.businesses[0])
                console.log('My response list is ' , responseList)

                if(responseList){
                    console.log('starting  fetch for business specifics')
                    let restList = []
                    for (let i = 0; i < responseList.length; i++) {
                        if(responseList[i]){
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
                    }
                        const data = await context.prisma.api.create({
                            data: { data: restList.join('*') }
                        })
                        return data
                }else{
                    throw new Error("No yelp response!")
                }  */