import * as React from 'react'
import { useMutation, gql } from '@apollo/client'
import { AppState } from '../App/App'
import MoodList from '../../components/MoodList/MoodList'
import MoodForm from '../../components/MoodForm/MoodForm'
import './MoodsPage.css'
import {Mood} from '../App/App'

export interface MoodsPageState{
    initialState:InitialState
    refresh:boolean
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
        initialState:{
            id: null,
            name:'',
            categories:'',
            price:2
        },
        refresh:false
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

    function handleMoodEdit(moodToEdit){
        const {id, name, categories, price} = moodToEdit
        setState({
            ...state,
            initialState:{
                id,
                name,
                categories,
                price
            },
            refresh:!state.refresh
        })
    }

    function handleUpdateMood(updatedMood){

    }
    //console.log("Moods page moods " , app.moods)
    return(
    <main>
        <h1>Moods</h1>
        <div className="container">
        <MoodList moods={moods} handleMoodEdit={handleMoodEdit} app={app} setApp={setApp}/>
        <MoodForm handleNewMood={handleNewMood} initialState={state.initialState} refresh={state.refresh}/>  
        </div>
    </main>
    )
}