import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
//require('dotenv').config()
import axios from 'axios'
import e from 'cors'

export default function HomePage() {
    const [state,setState]=React.useState({
        search:"latitude=37.786882&longitude=-122.399972",
        response:''
    })

    const API_CALL=gql`
        mutation API_Call($query: String!) {
            API_Call(query: $query) {
                data
            }
        }
    `

    const [api, { data, loading, error }] = useMutation(API_CALL , {
        variables:{
            query:state.search
        }
    })

    async function handleSubmit(e){
       e.preventDefault()
       try{
        const response = await api()
        const businesses = JSON.parse(response.data.API_Call.data)
        console.log(businesses)
       }catch(error){
        console.log(error)
       }
    }
    return (
        <main className="page">
            <h1>WELCOME!</h1>
            <input type="search" value={state.search} onChange={(e)=>setState({...state , search:e.target.value})} placeholder="Search for anything!"
            /> <button type="submit" onClick={handleSubmit} className="btn">Submit Search!</button>
        </main>
    )
}
