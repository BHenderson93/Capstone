import * as React from 'react'

export function WelcomeSearch({moods , handleLocationSubmit , welcomePageState, setWelcomePageState}){
    return(
        <>
        { moods.length === 0? 
            <h1>Sorry, I don't think you've made any moods yet. Set one up in 'Edit Moods' then come on back!</h1>
            :
            <form action="" onSubmit={handleLocationSubmit} className="container-medium">
                <h1 className="text-5xl whitespace-nowrap text-center min-w-min p-5">Welcome! Let's find you somewhere to eat...</h1>
                <input type="search" className="text-center" value={welcomePageState.search} onChange={(e) => setWelcomePageState({ ...welcomePageState, search: e.target.value })} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Where are you? For example, 'seattle, wa' or 'new york'."} />
                <br />
                    {welcomePageState.search.length < 3 ? <div className="btn flex items-center justify-center py-5 w-full bg-slate-500 text-white font-medium uppercase rounded hover:bg-red-700 transition duration-1000 ease-in-out">Please input location</div>:<button type="submit" className="btn flex items-center justify-center py-5 w-full bg-green-600 text-white font-medium uppercase rounded hover:bg-green-500 transition duration-150 ease-in-out">Click me when ready!</button>}
            </form>
            }
        </>
    )
}