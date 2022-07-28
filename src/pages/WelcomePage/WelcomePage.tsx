import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import BusinessCard from '../../components/BusinessCard/BusinessCard'

export interface WelcomePageProps{
    search: string
    restaurants:business[]
    ratings:number[]
    index:number
}

export interface business{
    id?: string
    alias?: string
    name?: string
    image_url?: string
    is_closed?: boolean
    url?:string
    review_count?:number
    categories?:[]
    rating?:number
    coordinates?:object
    transactions?:[]
    price?:string
    location?:object
    phone?:string
    display_phone?:string
    distance?:number
}

export default function WelcomePage() {
    const [state, setState] = React.useState<WelcomePageProps>({
        search: "latitude=37.786882&longitude=-122.399972",
        restaurants: [],
        ratings:[],
        index:0
    })

    const API_CALL = gql`
        mutation API_Call($query: String!) {
            API_Call(query: $query) {
                data
            }
        }
    `

    const [api, { data, loading, error }] = useMutation(API_CALL, {
        variables: {
            query: state.search
        }
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api()
            const businesses = JSON.parse(response.data.API_Call.data)
            console.log(businesses)
            const newRatings = Array(businesses.businesses.length).fill(0)
            setState({ ...state, restaurants: businesses.businesses , ratings:newRatings})

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main className="page">
            {state.restaurants.length ? 
                (
                <>
                <h1>Populating</h1>
                <BusinessCard key={state.index} index={state.index} setWelcomeState={setState} welcomeState={state} business={state.restaurants[state.index]}/>
                </>
                    )
                :
                (
                <>
                    <h1>WELCOME!</h1>
                    <input type="search" value={state.search} onChange={(e)=>setState({...state , search:e.target.value})} placeholder="Search for anything!"
                    /> <button type="submit" onClick={handleSubmit} className="btn">Submit Search!</button>
                </>
                )
            }
        </main>
    )
}
