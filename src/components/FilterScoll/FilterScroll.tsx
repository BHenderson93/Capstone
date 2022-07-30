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
    return(
        <div className="container filter-scroll" >
            <input type="text" name="search" value={state.search} onChange={e=>setState({...state, search:e.target.value})}/>
            <ul className="overflow-y-scroll overflow-x-hidden"style={{height:'40vh' , width:'100%'}}>
                {YELPCATEGORIES.filter(cat=>cat.match(new RegExp(state.search, "i")))
                .filter(cate=>!picked.includes(cate))
                    .map(remaining=><YelpCat cat={remaining} handleAddCategory={handleAddCategory}/>)}
            </ul>
        </div>
    )
}

