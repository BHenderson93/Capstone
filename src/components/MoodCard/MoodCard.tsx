import * as React from 'react'
import { gql , useMutation } from '@apollo/client'

export default function MoodCard({mood , moodsPage , setMoodsPage , app , setApp}){
    //console.log(mood)
    const DELETE_MOOD=gql`
    mutation Delete($id: Int!, $token: String!){
        delete(id:$id , token:$token){
            id
        }
    }
    `

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
    function handleEdit(){
        const { name, id, categories, price } = mood
        setMoodsPage({
            ...moodsPage,
            initialState:{
                name:name,
                id:id,
                categories:categories,
                price:price
            }
        })
    }
    return (
    <li className="flex flex-row nowrap justify-between align-center">
        <h3>{mood.name}, {mood.categories}</h3>
        <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>

    </li>
    )
}