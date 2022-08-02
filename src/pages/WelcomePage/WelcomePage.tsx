import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import BusinessCard from '../../components/BusinessCard/BusinessCard'
import { Mood } from '../App/App'
import { useNavigate } from 'react-router-dom'
import { WelcomeSearch } from '../../components/WelcomeSearch/WelcomeSearch'
import { WelcomeMoodSelect } from '../../components/WelcomeMoodSelect/WelcomeMoodSelect'
import { WinnerDisplay } from '../../components/WinnerDisplay/WinnerDisplay'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Loading } from '../../components/Loading/Loading'

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

export interface Business {
    id?: string
    alias?: string
    name?: string
    image_url?: string
    photos?: string[]
    is_closed?: boolean
    url?: string
    review_count?: number
    categories?: []
    rating?: number
    coordinates?: object
    transactions?: []
    price?: string | number
    location?: any
    phone?: string
    display_phone?: string
    distance?: number
}

export interface WelcomePageState {
    search: string
    restaurants: Business[]
    ratings: number[]
    index: number
    step: number
    confetti: number
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
        confetti: 0,
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

    React.useEffect(() => {
        if (moods.length === 0) {
            nav('/moods')
        }
    }, [])

    const [api, { data, loading, error }] = useMutation(API_CALL, {
        variables: {
            location: state.apiQuery.location,
            categories: state.apiQuery.mood.categories
        },
        context: {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    })

    async function handleSelectMood(MOOD: Mood) {
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

    React.useEffect(() => {
        const getApiData = async () => {
            console.log('beginning fetch from api..')
            const results = await api()
            console.log(results)
            if (results.data.API_Call.data) {
                const businessList = results.data.API_Call.data.split('*')
                let restaurants = businessList.map(x => JSON.parse(x))[0]
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
        if (state.apiQuery.query) {
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

    React.useEffect(() => {
        if (state.step === 5) {
            setState({
                ...state,
                confetti: 3500
            })

            setTimeout(() => {
                setState({
                    ...state,
                    confetti: 0
                })
            }, 2500)
        }
    }, [state.step])

    function moreConfetti(num) {
        if (num > 0) {
            setState({
                ...state,
                confetti: state.confetti + num
            })
        } else {
            if (state.confetti < 200) {
                setState({
                    ...state,
                    confetti: 0
                })
            } else {
                setState({
                    ...state,
                    confetti: state.confetti + num
                })
            }
        }

    }

    const { width, height } = useWindowSize()

    return (
        <>
            {state.step === 1 ? (
                <WelcomeSearch handleLocationSubmit={handleLocationSubmit} welcomePageState={state} setWelcomePageState={setState} moods={moods} />
            ) : state.step === 2 ? (
                <>
                    <WelcomeMoodSelect moods={moods} handleSelectMood={handleSelectMood} />
                </>
            ) : state.step === 3 ? (
                <Loading />
            ) : state.step === 4 ? (
                    <BusinessCard setRating={setRating} business={state.restaurants[state.index]} />
            ) : state.step === 5 ? (
                <div className="flex flex-col items-center">
                    <Confetti style={{ position: 'fixed', top: '0', left: '0' }} numberOfPieces={state.confetti} width={width} height={height} />
                    <WinnerDisplay welcomePage={state} moreConfetti={moreConfetti} />
                </div>
            ) : (
                <>
                    {/*@ts-ignore*/}
                    <h1>So Sorry... I couldn't find any results for {state.apiQuery.mood.categories.replaceAll('*', ', ')} in {state.search}</h1>
                </>
            )
            }
        </>
    )
}