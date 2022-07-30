import * as React from 'react'
import MoodCard from '../MoodCard/MoodCard'
import {AppState , Mood} from '../../pages/App/App'

export interface MoodListProps{
    moods: Mood[]
    handleMoodEdit: ()=>void
    setApp: React.Dispatch<React.SetStateAction<any>>
    app: AppState
}

export interface MoodListState{

}

export default function MoodList({moods, handleMoodEdit, app , setApp}:MoodListProps){
    //console.log("Moods list moods " , moods)
    return (
        <ul className="overflow-scroll">
        {moods.map((mood,idx)=>
            <MoodCard key={idx}mood={mood} handleMoodEdit={handleMoodEdit} app={app} setApp={setApp}/>
        )}
        </ul>
    )
}