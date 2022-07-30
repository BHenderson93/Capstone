import * as React from 'react'

export interface YelpCatProps{
    cat:string
    handleAddCategory?:(any)=>void
    handleRemoveFromCategories?:(any)=>void
    clearSearch?:()=>void
}

export interface YelpCatState{

}

export function YelpCat( {cat , handleAddCategory, clearSearch, handleRemoveFromCategories}: YelpCatProps){
    
    function handleClick(){
        if(handleAddCategory && clearSearch){
            handleAddCategory(cat)
            clearSearch()
        }else if (handleRemoveFromCategories){
            handleRemoveFromCategories(cat)
        }
    }

    return(
        <li className="border shadow-lg p-3 w-full" onClick={handleClick}>
            {cat}
        </li>
    )
}