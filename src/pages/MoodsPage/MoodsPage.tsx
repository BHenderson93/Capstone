import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import { AppState } from '../App/App'
import MoodList from '../../components/MoodList/MoodList'
import MoodForm from '../../components/MoodForm/MoodForm'
import './MoodsPage.css'
import {Mood} from '../App/App'

export interface MoodsPageState{
    isLoading: boolean
    initialState:{}
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

        }
    })

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
            <MoodForm app={app} setApp={setApp} initialState={state.initialState}/>
        }   
        </div>
    </main>
    )
}