import * as React from 'react'
import ReactLoading from 'react-loading'

export function Loading() {

    return (
        <div className="flex flex-col items-center min-w-full">
            <h1 className="text-3xl whitespace-nowrap text-center min-w-full mb-50" >Consulting Chef Marco for suggestions - hold tight!</h1>
            <br />
            <ReactLoading height={128} width={128} type={'spinningBubbles'} color="black" />
        </div>)
}