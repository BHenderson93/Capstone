import * as React from 'react'

export default function MoodCard({mood , moodsPage , setMoodsPage}){
    //console.log(mood)
    function handleDelete(){

    }
    function handleEdit(){
        const { name, id, categories, price } = mood
        setMoodsPage({
            isLoading: false,
            name,
            id,
            categories,
            price
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