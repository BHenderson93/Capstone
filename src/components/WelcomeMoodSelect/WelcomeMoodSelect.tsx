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
                <h1>Sorry, I don't think you've made any moods yet. Set one up in 'Edit Moods' then come on back!</h1>
                :
                <>
                    <h1>Which mood are you in today? Or click "Edit Moods" up top to make or change a mood.</h1>
                    <div className="container-medium overflow-y-scroll overflow-x-hidden">
                        {moods.map(mood => <button className="w-full" onClick={() => { handleSelectMood(mood) }}><MoodCard mood={mood} handleMoodEdit={null} app={null} setApp={null} /></button>)}
                    </div>
                </>
            }
        </>

    )
}