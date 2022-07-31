import * as React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Carousel from '../Carousel/Carousel'
export interface BusinessCardProps {

}

export interface BusinessCardState {

}

export default function BusinessCard({ business, setRating }) {

    return (
        <div className="container-medium flex flex-col jusitfy-around items-center select-none">
            <h1>{business.name}</h1>
            <div>
            <Carousel imgList={business.photos} />
            </div>
            
            <h2 className="italic bold text-2xl">Thoughts?</h2>
            <div className="flex flex-row nowrap w-full gap-6">
                <button className="btn flex items-center justify-center py-5 bg-red-800 text-white uppercase rounded hover:bg-red-500 transition duration-150 ease-in-out" onClick={()=>{setRating(0)}}>It doesn't.</button>
                <button className="btn flex items-center justify-center py-5 bg-slate-900 text-white uppercase rounded hover:bg-slate-700 transition duration-150 ease-in-out" onClick={()=>{setRating(1)}}>Not bad.</button>
                <button className="btn flex items-center justify-center py-5 bg-green-700 text-white uppercase rounded hover:bg-green-500 transition duration-150 ease-in-out" onClick={()=>{setRating(2)}}>I want it!</button>
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