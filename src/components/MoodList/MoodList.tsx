import * as React from 'react'
import {MoodCard} from '../MoodCard/MoodCard'
import { AppState, Mood } from '../../pages/App/App'

export interface MoodListProps {
    moods: Mood[]
    handleMoodEdit: (any) => any
    setApp: React.Dispatch<React.SetStateAction<any>>
    app: AppState
}

export interface MoodListState {

}

export default function MoodList({ moods, handleMoodEdit, app, setApp }: MoodListProps) {
    //console.log("Moods list moods " , moods)
    return (
        <div className="container-medium border-sharp m-10 flex flex-col justify-start items-left">
            <h1 className="text-3xl underline">Moods you've made:</h1>
            <br />
            <div className="overflow-x-hidden overflow-y-scroll min-h-full min-w-full flex flex-col gap-6">
            {moods.map((mood, idx) =>
                    <MoodCard key={idx} mood={mood} handleMoodEdit={handleMoodEdit} app={app} setApp={setApp} />
                )}
            </div>

        </div>
    )
}