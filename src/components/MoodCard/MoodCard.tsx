import * as React from 'react'

export default function MoodCard({mood}){
    console.log(mood)
    return (<h1>{mood.name} , {mood.categories}</h1>)
}