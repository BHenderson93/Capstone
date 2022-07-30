import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import BusinessCard from '../../components/BusinessCard/BusinessCard'
import { appendFile } from 'fs'
import { AppState, Mood } from '../App/App'

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
    restaurants:any
    ratings:number[]
    index:number
    step:number
    apiQuery:{
        searchNotLatlong:boolean
        location:string
        mood:Mood
        query:string
    }
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
            mood:moods[0],
            query:''
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
            query: state.apiQuery.query
        }
    })

    async function handleSelectMood(MOOD){
        const cats = MOOD.categories.includes('*')? MOOD.categories.split('*')[0] : MOOD.categories
        console.log(cats)
         setState({
            ...state,
            apiQuery:{
                ...state.apiQuery,
                mood:MOOD,
                query:`&location=${state.apiQuery.location}&categories=${cats}`
            },
            step:state.step+1
        }) 
    }

    React.useEffect(()=>{

        const getApiData = async () =>{
            const results = await api()
            const restaurants = JSON.parse(results.data.API_Call.data).businesses
            console.log("API results are " , restaurants)
            //const initialRatings = Array(restaurants).fill(0)
            setState({
                ...state,
                restaurants,
                //ratings,
                apiQuery:{
                    ...state.apiQuery,
                    query:''
                },
                step:state.step+1
            })
        }
        if(state.apiQuery.query){
            getApiData()
        }

    }, [state.apiQuery.query])

    function handleLocationSubmit(){
        setState({
            ...state,
            apiQuery:{...state.apiQuery, searchNotLatlong: true, location:state.search },
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
                        {moods.map(mood=><li><button onClick={()=>{handleSelectMood(mood)}}>{mood.name}</button> </li>)}
                    </ul>
                </>
            ):state.step === 3 ? (
                <>
                <h1>Loading...</h1>
                </>
            ):(
                <div className="container">
                <h1>Results</h1>
                <BusinessCard setWelcomeState={setState} welcomeState={state} index={1} business={state.restaurants[0]} />
                </div>

            )
            }
        </main>
    )
}