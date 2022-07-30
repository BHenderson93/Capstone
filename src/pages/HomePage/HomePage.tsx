import * as React from 'react'
import { useLazyQuery, useQuery, gql } from '@apollo/client'
import {HomePageProps} from '../../interfaces/pages/HomePage'

export default class HomePage extends React.Component<{}> {
    constructor(props: HomePageProps){
        super(props)
    }
    render(){return (
        <main className="page">
            <h1>HOME!</h1>
        </main>
    )}
}
