import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import BusinessCard from '../../components/BusinessCard/BusinessCard'
import { Mood } from '../App/App'
import { useNavigate } from 'react-router-dom'



const API_CALL = gql`
mutation API_Call($location:String! , $categories:String!) {
    API_Call(location:$location, categories:$categories ) {
        data
    }
}
`


export interface WelcomePageProps {
    moods: string[]
}

export interface business {
    id?: string
    alias?: string
    name?: string
    image_url?: string
    is_closed?: boolean
    url?: string
    review_count?: number
    categories?: []
    rating?: number
    coordinates?: object
    transactions?: []
    price?: string
    location?: object
    phone?: string
    display_phone?: string
    distance?: number
}

export interface WelcomePageState {
    search: string
    restaurants: any
    ratings: number[]
    index: number
    step: number
    apiQuery: {
        searchNotLatlong: boolean
        location: string
        mood: Mood
        query: boolean
    }
}

export default function WelcomePage({ moods }) {
    const [state, setState] = React.useState<WelcomePageState>({
        search: "",
        restaurants: [],
        ratings: [],
        index: 0,
        step: 1,
        apiQuery: {
            searchNotLatlong: true,
            location: 'seattle, wa',
            mood: {
                id: 0,
                name: 'Click edit moods to make your first mood!',
                categories: 'steakhouses',
                price: 2
            },
            query: false
        }
    })
    const nav = useNavigate()
    React.useEffect(()=>{

        if(moods.length === 0){
            nav('/moods')
        }

    }, [])


    const [api, { data, loading, error }] = useMutation(API_CALL, {
        variables: {
            location: state.apiQuery.location,
            categories: state.apiQuery.mood.categories
        }
    })

    async function handleSelectMood(MOOD) {
        setState({
            ...state,
            apiQuery: {
                ...state.apiQuery,
                mood: MOOD,
                query: true
            },
            step: state.step + 1
        })

    }

    React.useEffect(()=>{
        const getApiData = async () => {
            const results = await api()
            console.log(results)
            if (results.data.API_Call.data) {
                const businessList = results.data.API_Call.data.split('*')
                let restaurants = businessList.map(x => JSON.parse(x))
                console.log("API results are ", restaurants)
                //const initialRatings = Array(restaurants).fill(0)
                setState({
                    ...state,
                    restaurants,
                    //ratings,
                    apiQuery: {
                        ...state.apiQuery,
                        query: false
                    },
                    step: state.step + 1
                })
            } else {
                setState({
                    ...state,
                    step: 0
                })
                console.log('SO SORRY - No results for that search in that location. Try again!')
            }
        }
        if(state.apiQuery.query){
            getApiData() 
        }
    }, [state.apiQuery.query])

    function handleLocationSubmit() {
        setState({
            ...state,
            apiQuery: { ...state.apiQuery, searchNotLatlong: true, location: state.search },
            step: state.step + 1
        })
    }

    function setRating(num) {
        if (state.index === state.restaurants.length - 1) {
            setState({
                ...state,
                ratings: [...state.ratings, num],
                step: state.step + 1
            })
        } else {
            setState({
                ...state,
                ratings: [...state.ratings, num],
                index: state.index + 1,
            })
        }
    }

    function selectWinner() {
        let all: any = []

        for (let i = 0; i < state.ratings.length; i++) {
            all.push([state.ratings[i], state.restaurants[i]])
        }

        const top = all.filter(x => x[0] === 2)
        const mid = all.filter(x => x[0] === 1)
        const bot = all.filter(x => x[0] === 0)

        let winner
        if (top) {
            winner = top[Math.floor(Math.random() * top.length)][1]
        } else if (mid) {
            winner = mid[Math.floor(Math.random() * mid.length)][1]
        } else {
            winner = bot[Math.floor(Math.random() * bot.length)][1]
        }
        console.log('AAAAND THE WINNER IS ', winner)

        return (<div>
            <h1>Results! Tonight, try out...</h1>
            <h1>{winner.name}</h1>
        </div>)
    }

    return (
        <div className="container">
            {state.step === 1 ? (
                <>
                { moods.length === 0? 
                    <h1>Sorry, I don't think you've made any moods yet. Set one up in 'Edit Moods' then come on back!</h1>
                    :
                    <form action="" onSubmit={handleLocationSubmit} className="container-medium">
                        <h1 className="text-5xl whitespace-nowrap text-center min-w-min p-5">Welcome! Let's find you somewhere to eat...</h1>
                        <input type="search" className="text-center" value={state.search} onChange={(e) => setState({ ...state, search: e.target.value })} placeholder="Where are you? For example, 'seattle, wa' or 'new york'." />
                        <br />
                            {state.search.length < 3 ? <button type="submit" className="btn flex items-center justify-center py-5 w-full bg-slate-900 text-white font-medium uppercase rounded hover:bg-green-700 transition duration-150 ease-in-out">Please input location</button>: <button type="submit" className="btn flex items-center justify-center py-5 w-full bg-green-600 text-white font-medium uppercase rounded hover:bg-green-500 transition duration-150 ease-in-out">Click me when ready!</button>}
                    </form>
                    }
                </>
            ) : state.step === 2 ? (
                <>
                    {moods.length === 0 ?
                        <h1>Sorry, I don't think you've made any moods yet. Set one up in 'Edit Moods' then come on back!</h1>
                        :
                        <ul>
                            <h1>Which mood are you in today? Or click "Edit Moods" up top to make or change a mood.</h1>
                            {moods.map(mood => <li><button onClick={() => { handleSelectMood(mood) }}>{mood.name}</button> </li>)}
                        </ul>}

                </>
            ) : state.step === 3 ? (
                <>
                    <h1>Loading...</h1>
                </>
            ) : state.step === 4 ? (
                <>
                    <BusinessCard setRating={setRating} business={state.restaurants[state.index]} />
                </>

            ) : state.step === 5 ? (
                <>
                    {selectWinner()}
                </>

            ) : (
                <>
                    {/*@ts-ignore*/}
                    <h1>So Sorry... I couldn't find any results for {state.apiQuery.mood.categories.replaceAll('*', ', ')} in {state.search}</h1>
                </>
            )
            }
        </div>
    )
}