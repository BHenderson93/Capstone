import * as React from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
//require('dotenv').config()
import axios from 'axios'

export default function HomePage() {
    const [state,setState]=React.useState({
        search:''
    })

    async function handleSubmit(){
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
        
        const resp = await axios({
            url:qURL,
            method:"POST",
            data:query,
            headers: {
                "Content-Type": "application/graphql",
                "Authorization": `Bearer ${API_KEY}`,
                'Accept-Language': 'en-US'
            }
        })
        console.log(resp.data)
    }
    return (
        <main className="page">
            <h1>WELCOME!</h1>
            <input type="search" value={state.search} onChange={(e)=>setState({...state , search:e.target.value})} placeholder="Search for anything!"
            /> <button type="submit" onClick={handleSubmit} className="btn">Submit Search!</button>
        </main>
    )
}
