import * as React from 'react'

export interface YelpCatProps{
    cat:string
}

export interface YelpCatState{

}

export function YelpCat( {cat}: YelpCatProps){

    return(
        <li>
            {cat}
        </li>
    )
}