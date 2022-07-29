import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import { AppState } from '../App/App'
import MoodList from '../../components/MoodList/MoodList'
import MoodForm from '../../components/MoodForm/MoodForm'
import './MoodsPage.css'
import {Mood} from '../App/App'

export interface MoodsPageState{
    isLoading: boolean
    initialState:InitialState
}

export interface InitialState{
    id:number | null
    name:string
    categories:string
    price:number
}

export interface MoodsPageProps{
    app: AppState,
    setApp: React.Dispatch<React.SetStateAction<any>>
    moods: Mood[]
}

export default function MoodsPage({ app , setApp , moods}:MoodsPageProps){
    
    const [state,setState]=React.useState<MoodsPageState>({
        isLoading: false,
        initialState:{
            id: null,
            name:'',
            categories:'',
            price:2
        }
    })

    function handleNewMood(newMood){
        console.log('handling new mood' , newMood)
        setApp({
            ...app,
            moods: [...app.moods , newMood]
        })

        setState({
            ...state,
            initialState:{
                name:'',
                categories:'',
                price:2,
                id: null
            }
        })
    }

    //console.log("Moods page moods " , app.moods)
    return(
    <main>
        <h1>Moods</h1>
        <div className="container">
        <MoodList moods={moods} moodsPage={state} setMoodsPage={setState} app={app} setApp={setApp}/>
        {/* Below should be modularized to a mood card. */}
        { state.isLoading? 
            <h1>Loading...</h1>
            :
            <MoodForm app={app} handleNewMood={handleNewMood} initialState={state.initialState}/>
        }   
        </div>
    </main>
    )
}