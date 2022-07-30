import * as React from 'react'
import { gql , useMutation } from '@apollo/client'

const DELETE_MOOD=gql`
mutation Delete($id: Int!, $token: String!){
    delete(id:$id , token:$token){
        id
    }
}
`

export default function MoodCard({mood, handleMoodEdit , app , setApp}){
    //console.log(mood)

    const [deleteMood , {data:deletedMoodData}] = useMutation(DELETE_MOOD, {
        variables:{
            id:mood.id,
            token:localStorage.getItem('token')
        }
    })

    async function handleDelete(){
        console.log('Someone clicked delete')
        const deleted = await deleteMood()
        
        setApp({
            ...app,
            moods: app.moods.filter(x=> x.id !== deleted.data.delete.id)
        })
        console.log(deleted)
    }

    return (
    <li className="flex flex-row nowrap justify-between align-center border">
        <h3>{mood.name}, {mood.categories}</h3>
        <div className="flex flex-row nowrap justify-between align-center">
            <button onClick={()=>{handleMoodEdit(mood)}}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </li>
    )
}