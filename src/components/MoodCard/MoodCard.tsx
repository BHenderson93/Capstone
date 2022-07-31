import * as React from 'react'
import { gql, useMutation } from '@apollo/client'
import { AppState } from '../../pages/App/App'
const DELETE_MOOD = gql`
mutation DeleteMood($id: Int!, $token: String!){
    deleteMood(id:$id , token:$token){
        id
    }
}
`


export default function MoodCard({ mood, handleMoodEdit, app, setApp }) {
    //console.log(mood)

    const [deleteMood, { data: deletedMoodData }] = useMutation(DELETE_MOOD, {
        variables: {
            id: mood.id,
            token: localStorage.getItem('token')
        }
    })

    async function handleDelete() {
        console.log('Someone clicked delete')
        const deleted = await deleteMood()

        setApp({
            ...app,
            moods: app.moods.filter(x => x.id !== deleted.data.deleteMood.id)
        })
        console.log(deleted)
    }

    return (
        <li className="flex flex-row nowrap justify-between align-center border">
            <div className="overflow-hidden">
                <h3>{mood.name}</h3>
            </div>
            <div className="flex flex-row nowrap justify-between align-center">
                <button onClick={() => { handleMoodEdit(mood) }}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}