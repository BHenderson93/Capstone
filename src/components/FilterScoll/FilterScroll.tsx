import * as React from 'react'
import {YelpCat} from '../YelpCat/YelpCat'
import {YELPCATEGORIES} from './YelpCats'

export interface FilterScrollProps{
    handleAddCategory:(any)=>void
    picked:string[]
}

export interface FilterScrollState{
    search:string
}

export function FilterScroll({handleAddCategory, picked}:FilterScrollProps){
    const [state, setState]=React.useState<FilterScrollState>({
        search:''
    })

    function clearSearch(){
        setState({
            search:''
        })
    }
    return(
        <div className="filter-scroll" >
            <h1>Select categories</h1>
            <input type="text" name="search" placeholder="Start typing here..." value={state.search} onChange={e=>setState({...state, search:e.target.value})}/>
            <ul className="overflow-y-scroll overflow-x-hidden border border-black h-full p-5">
                {YELPCATEGORIES.filter(cat=>cat.match(new RegExp(state.search, "i")))
                .filter(cate=>!picked.includes(cate))
                    .map((remaining,idx)=><YelpCat cat={remaining} key={idx}clearSearch={clearSearch} handleAddCategory={handleAddCategory}/>)}
            </ul>
        </div>
    )
}

