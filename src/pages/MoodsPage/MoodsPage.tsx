import * as React from 'react'

export default function MoodsPage(){
    const [state,setState]=React.useState({
        isLoading: true,
        location:'',
        styles:[],
        price:[]
    })

    function handleSubmit(){

    }

    return(
    <main>
        <h1>Moods</h1>
        { state.isLoading? 
            <h1>Loading...</h1>
            :
            <form action="" onSubmit={handleSubmit}>
                <input type="text" name="location" />
                <input type="text" name="" id="" />
            </form>
        }

    </main>
    )
}