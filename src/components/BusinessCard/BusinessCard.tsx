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
                <button className="btn flex items-center justify-center py-5 bg-red-800 text-white uppercase rounded hover:bg-red-500 transition duration-150 ease-in-out" onClick={()=>{setRating(0)}}>Nah...</button>
                <button className="btn flex items-center justify-center py-5 bg-slate-900 text-white uppercase rounded hover:bg-slate-700 transition duration-150 ease-in-out" onClick={()=>{setRating(1)}}>Not bad.</button>
                <button className="btn flex items-center justify-center py-5 bg-green-700 text-white uppercase rounded hover:bg-green-500 transition duration-150 ease-in-out" onClick={()=>{setRating(2)}}>I want it!</button>
            </div>
        </div>
    )
}