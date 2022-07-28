const axios = require('axios')

const qURL = 'https://api.yelp.com/v3/graphql'

const API_KEY="DYEOtJwaWZrL76Z5F6k-SLsKBfac_5__UMt1wMBuNPZkkRTNLFxgK3BJi-9ZO6nr4-Pz6fBh_uqXULyBBPq-5JmERYqi9C4z2aRa1A5nA43CmU289V6qTFw_0zvfYnYx"

const query = `
{
    business(id: "garaje-san-francisco") {
        name
        id
        alias
        rating
        url
    }
}`

const resp = axios({
    url:qURL,
    method:"POST",
    data:query,
    headers: {
        "Content-Type": "application/graphql",
        "Authorization": `Bearer ${API_KEY}`,
        'Accept-Language': 'en-US'
    }
}).then((res)=>{
    console.log(res.data)
}).catch((err)=>{
    console.log('error with fetch ' , err)
})
