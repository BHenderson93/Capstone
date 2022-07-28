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

const qHEADERS = {
    method: "POST",
    headers: {
        "Content-Type": "application/graphql",
        "Authorization": `Bearer ${API_KEY}`,
        'Accept-Language': 'en-US',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    },
    body: query
}

fetch(qURL, qHEADERS).then(resp => resp.json()).then((res) => {
    console.log('Fetch successful, apparently')
    console.log(res)
}).catch((err) => {
    console.log("There was an error... ", err)
})