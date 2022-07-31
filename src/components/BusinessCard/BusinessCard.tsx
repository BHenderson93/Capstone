import * as React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Carousel from '../Carousel/Carousel'
export interface BusinessCardProps {

}

export interface BusinessCardState {

}

export default function BusinessCard({ business, setRating }) {

    return (
        <div className=" rounded shadow-lg flex flex-col justify-between items-center drop-shadow-2xl bg-gray-200 p-8 border border-1 border-gray-300 ">
            <h1>{business.name}</h1>
            <Carousel imgList={business.photos} />
            <h2>How good does this place look?</h2>
            <div>
                <button onClick={()=>{setRating(0)}}>It doesn't.</button>
                <button onClick={()=>{setRating(1)}}>Not bad.</button>
                <button onClick={()=>{setRating(2)}}>I want it!</button>
            </div>

        </div>
    )
}

/* 
    function goNext(direction): void {
        if ((direction > 0 && welcomeState.index < welcomeState.restaurants.length - 1) || (direction < 0 && welcomeState.index > 0)) {
            setWelcomeState({
                ...welcomeState,
                index: (welcomeState.index + direction)
            })
        } else {
            console.log('End of list')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        let newRatings = welcomeState.ratings
        newRatings[welcomeState.index] = Number(state)
        setWelcomeState({
            ...welcomeState,
            ratings: newRatings
        })
    }
    
             <form action="" onSubmit={handleSubmit}>
                <input type="number" name="rating" id="" onChange={(e) => { setState({ ...state, rating: Number(e.target.value) }) }} />
                <button type="submit">Rate!</button>
            </form>
            <button onClick={() => { goNext(-1) }} >Prev!</button>
            <button onClick={() => { goNext(1) }} >Next!</button>
            */