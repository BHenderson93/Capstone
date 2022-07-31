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


export function MoodCard({ mood, handleMoodEdit, app, setApp }) {
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
        <li className="flex flex-row nowrap p-6 justify-between align-center border hover:bg-slate-900 hover:text-white group transition duration-150">

            {handleMoodEdit ? 
            <>
                <div className="overflow-hidden flex flex-col nowrap align-center justify-center w-6/12 ">
                    <h3 className="text-center bold text-xl">{mood.name}</h3>
                    <h3 className="hidden text-center group-hover:block">{mood.categories.split('*').join(', ')}</h3>
                </div>
                <div className="flex flex-row nowrap justify-center items-center w-6/12">
                    <button type="submit" className="btn h-12 flex items-center justify-center mr-10 py-5 bg-slate-900 text-white font-medium uppercase rounded group-hover:bg-green-700 hover:!bg-green-500 transition duration-150 ease-in-out" onClick={() => { handleMoodEdit(mood) }}>Edit</button>
                    <button type="submit" className="btn h-12 flex items-center justify-center py-5 w-3/12 bg-red-600 text-white font-medium uppercase rounded group-hover:bg-red-600 hover:!bg-red-500 transition duration-150 ease-in-out" onClick={handleDelete}>Delete</button>
                </div>
            </> :
                <div className="overflow-hidden flex flex-col nowrap align-center justify-center w-full ">
                    <h3 className="text-center bold text-xl">{mood.name}</h3>
                    <h3 className="hidden text-center group-hover:block">{mood.categories.split('*').join(', ')}</h3>
                </div>
            }
        </li>
    )
}