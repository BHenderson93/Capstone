import * as React from 'react'

export interface BusinessCardProps{

}

export interface BusinessCardState{

}

export default function BusinessCard({business, index, setWelcomeState , welcomeState}){
    const [state,setState] = React.useState('1')

    function goNext(direction):void{
        if((direction > 0 && index < welcomeState.ratings.length - 1) || (direction < 0 && index > 0) ){
            setWelcomeState({
                ...welcomeState,
                index:(index+direction)
            })
        }else{
            console.log('End of list')
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        let newRatings = welcomeState.ratings
        newRatings[index] = Number(state)
        setWelcomeState({
            ...welcomeState,
            ratings:newRatings
        })
    }

    return(
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col justify-between items-center drop-shadow-2xl bg-gray-200 p-8 border border-1 border-gray-300 ">
                <h1>{business.name}</h1>
                <img src={business.photos[2]} alt="" className="card-img " />
                <form action="" onSubmit={handleSubmit}>
                    <input type="number" name="rating" id="" onChange={(e)=>{setState(e.target.value)}}/>
                    <button type="submit">Rate!</button>
                </form>
                <button onClick={()=>{goNext(1)}} >Next!</button>
                <button onClick={()=>{goNext(-1)}} >Prev!</button>
                
        </div>
    )
}