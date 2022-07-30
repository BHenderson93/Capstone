import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import BusinessCard from '../../components/BusinessCard/BusinessCard'
import { appendFile } from 'fs'
import { AppState } from '../App/App'
export interface WelcomePageProps{
    moods: string[]
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

export interface WelcomePageState{
    search: string
    restaurants:business[]
    ratings:number[]
    index:number
    step:number
    apiQuery:{}
}

//latitude=37.786882&longitude=-122.399972"
export default function WelcomePage({moods}) {
    const [state, setState] = React.useState<WelcomePageState>({
        search: "",
        restaurants: [],
        ratings:[],
        index:0,
        step:1,
        apiQuery:{
            searchNotLatlong:true,
            location:'seattle, wa',
            mood:{},
        }
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

    function handleSelectMood(e){
        e.preventDefault()

    }

    function handleLocationSubmit(e){
        setState({
            ...state,
            apiQuery:{...state.apiQuery, searchNotLatLong: true, location:state.search },
            step:state.step+1
        })
    }
    return (
        <main className="page">
            {state.step === 1?(
            <>
                <h1>Welcome! Let's find you somewhere to eat...</h1>
                <form action="" onSubmit={handleLocationSubmit}>
                <input type="search" value={state.search} onChange={(e)=>setState({...state , search:e.target.value})} placeholder="Where are you? (ex: seattle, wa)"/> <button type="submit" className="btn">Submit Search!</button>
                </form>
            </>
            ): state.step === 2? (
                <>
                    <h1>Which mood are you in today? Or click "Edit Moods" up top to make or change a mood.</h1>
                    <ul>
                        {moods.map(mood=><li>{mood.name}</li>)}
                    </ul>
                </>
            ):(
                <>
                </>
            )
            }
        </main>
    )
}


/*             {state.restaurants.length ? 
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
                    <input type="search" value={state.search} onChange={(e)=>setState({...state , search:e.target.value})} placeholder="What city are you in?"
                    /> <button type="submit" onClick={handleSubmit} className="btn">Submit Search!</button>
                </>
                )
            } */