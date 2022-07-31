import * as React from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
export interface HomePageProps {

}

export interface HomePageState {

}

export default function HomePage(){
    const nav = useNavigate()
    function navTo(url){
        nav(url)
    }
        return (
            <div className="container">
                <h1 className="text-5xl whitespace-nowrap text-center min-w-min p-5">Looking to explore local restauarants, but not sure which?
                    <br /> You've come to the right place!</h1>
                <div className="flex flex-row nowrap justify-center items-center">
                    <button className="btn flex items-center justify-center px-10 py-10 bg-slate-900 text-white font-medium uppercase rounded hover:bg-green-700 transition duration-150 ease-in-out" onClick={()=>{navTo('/login')}}>Login</button>
                    <h1 className="text-2xl whitespace-nowrap text-center min-w-min p-5">Or...</h1>
                    <button className="btn flex items-center justify-center px-10 py-10 bg-slate-900 text-white font-medium uppercase rounded hover:bg-green-700 transition duration-150 ease-in-out" onClick={()=>{navTo('/signup')}}>Signup</button>
                </div>


            </div>
        )
    }
