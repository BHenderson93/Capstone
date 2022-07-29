import * as React from 'react'
import MoodCard from '../MoodCard/MoodCard'

export default function MoodList({moods}){
    console.log("Moods list moods " , moods)
    return (
        <div className="container flex flex-row overflow-scroll">
        {moods.map((mood,idx)=>
            <MoodCard key={idx}mood={mood}/>
        )}
        </div>
    )
}