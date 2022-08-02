import * as React from 'react'
import { Mood } from '../../pages/App/App'
import { MoodCard } from '../MoodCard/MoodCard'

interface WelcomeMoodSelectProps {
    moods: Mood[]
    handleSelectMood: (Mood) => void
}

export function WelcomeMoodSelect({ moods, handleSelectMood }: WelcomeMoodSelectProps) {
    return (
        <>
            {moods.length === 0 ?
                <h1 className="text-3xl text-center">Sorry, I don't think you've made any moods yet. Set one up in 'Edit Moods' then come on back!</h1>
                :
                <div className='container-stiff border-sharp flex flex-col items-center'>
                    <h1 className="text-6xl min-w-fit mb-24 text-center whitespace-nowrap">What seems good?</h1>
                    <div className="w-3/4 overflow-y-scroll overflow-x-hidden">
                        {moods.map(mood => <button className="w-full" onClick={() => { handleSelectMood(mood) }}><MoodCard mood={mood} handleMoodEdit={null} app={null} setApp={null} /></button>)}
                    </div>
                </div>
            }
        </>
    )
}