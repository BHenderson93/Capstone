import * as React from 'react'
import MoodCard from '../MoodCard/MoodCard'

export default function MoodList({moods , moodsPage , setMoodsPage, app , setApp}){
    //console.log("Moods list moods " , moods)
    return (
        <ul className="overflow-scroll">
        {moods.map((mood,idx)=>
            <MoodCard key={idx}mood={mood} moodsPage={moodsPage} setMoodsPage={setMoodsPage} app={app} setApp={setApp}/>
        )}
        </ul>
    )
}