import * as React from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'

export interface HomePageProps{

}

export interface HomePageState{
    
}

export default class HomePage extends React.Component<{}> {
    state: HomePageState={
    }
    render(){
        return (
        <main className="page">
            <h1>HOME!</h1>
        </main>
    )}
}
